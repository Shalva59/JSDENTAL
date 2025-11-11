import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import {
  getAppointmentById,
  updateAppointmentStatus,
  createNotification
} from "../../../lib/appointments";
import { getUserByEmail, getUserById, getDoctorByDoctorId } from "../../../lib/user";
import { sendEmail } from "../../../lib/email";
import {
  getAppointmentApprovedEmail,
  getAppointmentDeclinedEmail,
  getAppointmentCounterOfferEmail
} from "../../../lib/appointmentEmailTemplates";

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const appointmentId = params.id;
    const body = await request.json();
    const { action, reason, counterOfferDate, counterOfferTime } = body;

    const appointment = await getAppointmentById(appointmentId);
    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    let updateData = {};
    let notificationData = {};

    switch (action) {
      case "approve":
        if (!user.isDoctor) {
          return NextResponse.json(
            { error: "Only doctors can approve appointments" },
            { status: 403 }
          );
        }
        updateData = { status: "approved" };
        notificationData = {
          userId: appointment.userId,
          type: "appointment_approved",
          title: "Appointment Approved",
          message: `Your appointment with Dr. ${appointment.doctorName} has been approved for ${appointment.requestedDate} at ${appointment.requestedTime}.`,
          appointmentId: appointment._id
        };
        break;

      case "decline":
        if (!user.isDoctor) {
          return NextResponse.json(
            { error: "Only doctors can decline appointments" },
            { status: 403 }
          );
        }
        updateData = { 
          status: "declined",
          doctorResponse: reason || "No reason provided"
        };
        notificationData = {
          userId: appointment.userId,
          type: "appointment_declined",
          title: "Appointment Declined",
          message: `Your appointment with Dr. ${appointment.doctorName} has been declined. Reason: ${reason || "No reason provided"}`,
          appointmentId: appointment._id
        };
        break;

      case "counter_offer":
        if (!user.isDoctor) {
          return NextResponse.json(
            { error: "Only doctors can make counter offers" },
            { status: 403 }
          );
        }
        if (!counterOfferDate || !counterOfferTime) {
          return NextResponse.json(
            { error: "Counter offer date and time are required" },
            { status: 400 }
          );
        }
        updateData = {
          status: "counter_offer",
          counterOfferDate,
          counterOfferTime,
          doctorResponse: reason || "Doctor suggested a different time"
        };
        notificationData = {
          userId: appointment.userId,
          type: "appointment_counter_offer",
          title: "Counter Offer Received",
          message: `Dr. ${appointment.doctorName} suggested a different time: ${counterOfferDate} at ${counterOfferTime}. Please accept or decline.`,
          appointmentId: appointment._id
        };
        break;

        case "accept_counter":
            // Patient accepting doctor's counter offer
            if (appointment.userId.toString() !== user._id.toString()) {
              return NextResponse.json(
                { error: "Unauthorized" },
                { status: 403 }
              );
            }
            updateData = {
              status: "approved",
              requestedDate: appointment.counterOfferDate,
              requestedTime: appointment.counterOfferTime
            };
            
            // Find the doctor user
            try {
              const doctorUser = await getDoctorByDoctorId(appointment.doctorId);
              if (doctorUser) {
                notificationData = {
                  userId: doctorUser._id, // Add the missing userId
                  type: "counter_offer_accepted",
                  title: "Counter Offer Accepted",
                  message: `Patient ${appointment.patientInfo.firstName} ${appointment.patientInfo.lastName} accepted your counter offer.`,
                  appointmentId: appointment._id
                };
              }
            } catch (error) {
              console.error("Error finding doctor for notification:", error);
            }
            break;
          
          case "decline_counter":
            // Patient declining doctor's counter offer
            if (appointment.userId.toString() !== user._id.toString()) {
              return NextResponse.json(
                { error: "Unauthorized" },
                { status: 403 }
              );
            }
            updateData = { status: "declined" };
            
            // Find the doctor user
            try {
              const doctorUser = await getDoctorByDoctorId(appointment.doctorId);
              if (doctorUser) {
                notificationData = {
                  userId: doctorUser._id, // Add the missing userId
                  type: "counter_offer_declined",
                  title: "Counter Offer Declined",
                  message: `Patient ${appointment.patientInfo.firstName} ${appointment.patientInfo.lastName} declined your counter offer.`,
                  appointmentId: appointment._id
                };
              }
            } catch (error) {
              console.error("Error finding doctor for notification:", error);
            }
            break;

      case "cancel":
        // Either party can cancel
        const canCancel = appointment.userId.toString() === user._id.toString() || user.isDoctor;
        if (!canCancel) {
          return NextResponse.json(
            { error: "Unauthorized to cancel this appointment" },
            { status: 403 }
          );
        }
        updateData = {
          status: "cancelled",
          cancelReason: reason || "No reason provided",
          cancelledBy: user.isDoctor ? "doctor" : "patient",
          cancelledAt: new Date()
        };
        
        // Notify the other party
        const recipientUserId = user.isDoctor ? appointment.userId : null;
        if (recipientUserId) {
          notificationData = {
            userId: recipientUserId,
            type: "appointment_cancelled",
            title: "Appointment Cancelled",
            message: `Your appointment has been cancelled by ${user.isDoctor ? 'the doctor' : 'you'}. Reason: ${reason || "No reason provided"}`,
            appointmentId: appointment._id
          };
        }
        break;

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    await updateAppointmentStatus(appointmentId, updateData);

    // Create notification if needed
    if (notificationData.userId || notificationData.type) {
      await createNotification(notificationData);
    }

    // Send email notifications
    try {
      const patientUser = await getUserById(appointment.userId.toString());
      const patientFullName = `${appointment.patientInfo.firstName} ${appointment.patientInfo.lastName}`;

      // Get the patient's preferred language from the appointment
      const patientLanguage = appointment.language || 'en';

      switch (action) {
        case "approve":
          if (patientUser && patientUser.email) {
            const approvedEmailTemplate = getAppointmentApprovedEmail({
              patientName: patientFullName,
              doctorName: appointment.doctorName,
              service: appointment.serviceName,
              appointmentDate: appointment.requestedDate,
              appointmentTime: appointment.requestedTime,
              language: patientLanguage
            });

            await sendEmail({
              to: patientUser.email,
              subject: approvedEmailTemplate.subject,
              html: approvedEmailTemplate.html,
              text: approvedEmailTemplate.text
            });
          }
          break;

        case "decline":
          if (patientUser && patientUser.email) {
            const declinedEmailTemplate = getAppointmentDeclinedEmail({
              patientName: patientFullName,
              doctorName: appointment.doctorName,
              service: appointment.serviceName,
              requestedDate: appointment.requestedDate,
              requestedTime: appointment.requestedTime,
              reason: reason || "No reason provided",
              language: patientLanguage
            });

            await sendEmail({
              to: patientUser.email,
              subject: declinedEmailTemplate.subject,
              html: declinedEmailTemplate.html,
              text: declinedEmailTemplate.text
            });
          }
          break;

        case "counter_offer":
          if (patientUser && patientUser.email) {
            const counterOfferEmailTemplate = getAppointmentCounterOfferEmail({
              patientName: patientFullName,
              doctorName: appointment.doctorName,
              service: appointment.serviceName,
              originalDate: appointment.requestedDate,
              originalTime: appointment.requestedTime,
              counterOfferDate: counterOfferDate,
              counterOfferTime: counterOfferTime,
              reason: reason || "Doctor suggested a different time",
              language: patientLanguage
            });

            await sendEmail({
              to: patientUser.email,
              subject: counterOfferEmailTemplate.subject,
              html: counterOfferEmailTemplate.html,
              text: counterOfferEmailTemplate.text
            });
          }
          break;

        default:
          // No email for other actions (cancel, accept_counter, decline_counter)
          break;
      }

      console.log(`Email sent successfully for action: ${action}`);
    } catch (emailError) {
      console.error('Error sending appointment status email:', emailError);
      // Don't fail the status update if email fails
    }

    return NextResponse.json({
      success: true,
      message: `Appointment ${action.replace('_', ' ')} successfully`
    });

  } catch (error) {
    console.error("Update appointment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}