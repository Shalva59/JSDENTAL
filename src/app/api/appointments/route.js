import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import {
  createAppointment,
  getAppointmentsByUser,
  getAppointmentsByDoctor,
  getUserAppointmentsToday,
  createNotification
} from "../../lib/appointments";
import { getUserByEmail, getDoctorByDoctorId } from "../../lib/user";
import { sendEmail } from "../../lib/email";
import {
  getAppointmentCreatedEmailForPatient,
  getAppointmentCreatedEmailForDoctor,
  getAppointmentCreatedEmailForClinic
} from "../../lib/appointmentEmailTemplates";

export async function GET(request) {
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

    let appointments;
    
    if (user.isDoctor) {
      // If user is a doctor, get appointments assigned to them
      const url = new URL(request.url);
      const doctorId = url.searchParams.get('doctorId');
      appointments = await getAppointmentsByDoctor(doctorId || user.doctorId);
    } else {
      // If regular user, get their appointments
      appointments = await getAppointmentsByUser(user._id);
    }

    return NextResponse.json({
      success: true,
      appointments,
      isDoctor: user.isDoctor
    });

  } catch (error) {
    console.error("Get appointments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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

    // Check daily limit
    const todayCount = await getUserAppointmentsToday(user._id);
    if (todayCount >= 5) {
      return NextResponse.json(
        { error: "Daily appointment limit (5) exceeded" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      doctorId,
      doctorName,
      service,
      serviceName,
      requestedDate,
      requestedTime,
      patientInfo,
      notes,
      isUrgent,
      language
    } = body;

    // Validate required fields
    if (!doctorId || !service || !requestedDate || !requestedTime || !patientInfo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const appointmentData = {
      userId: user._id,
      doctorId: parseInt(doctorId),
      doctorName,
      service,
      serviceName,
      requestedDate,
      requestedTime,
      patientInfo,
      notes: notes || "",
      isUrgent: isUrgent || false,
      status: "pending"
    };

    const appointment = await createAppointment(appointmentData);

    // Create notification for the patient
    await createNotification({
      userId: user._id,
      type: "appointment_created",
      title: "Appointment Request Sent",
      message: `Your appointment request with Dr. ${doctorName} has been sent and is pending approval.`,
      appointmentId: appointment._id
    });

    try {
        const doctorUser = await getDoctorByDoctorId(doctorId);
        if (doctorUser) {
          await createNotification({
            userId: doctorUser._id,
            type: "new_appointment_request",
            title: "New Appointment Request",
            message: `You have a new appointment request from ${patientInfo.firstName} ${patientInfo.lastName} for ${serviceName}.`,
            appointmentId: appointment._id
          });
        }
      } catch (error) {
        console.error("Error notifying doctor:", error);
        // Don't fail the appointment creation if notification fails
      }

    // Send email notifications
    try {
      const patientFullName = `${patientInfo.firstName} ${patientInfo.lastName}`;

      // 1. Send confirmation email to patient
      const patientEmailTemplate = getAppointmentCreatedEmailForPatient({
        patientName: patientFullName,
        doctorName: doctorName,
        service: serviceName,
        requestedDate: requestedDate,
        requestedTime: requestedTime,
        language: language || 'en'
      });

      await sendEmail({
        to: user.email,
        subject: patientEmailTemplate.subject,
        html: patientEmailTemplate.html,
        text: patientEmailTemplate.text
      });

      // 2. Send notification to doctor
      const doctorUser = await getDoctorByDoctorId(doctorId);
      if (doctorUser && doctorUser.email) {
        const doctorEmailTemplate = getAppointmentCreatedEmailForDoctor({
          doctorName: doctorName,
          patientName: patientFullName,
          patientPhone: patientInfo.phone || 'Not provided',
          patientEmail: user.email,
          service: serviceName,
          requestedDate: requestedDate,
          requestedTime: requestedTime,
          notes: notes || '',
          isUrgent: isUrgent || false,
          language: language || 'en'
        });

        await sendEmail({
          to: doctorUser.email,
          subject: doctorEmailTemplate.subject,
          html: doctorEmailTemplate.html,
          text: doctorEmailTemplate.text
        });
      }

      // 3. Send notification to main clinic email
      const clinicEmail = process.env.EMAIL_TO;
      if (clinicEmail) {
        const clinicEmailTemplate = getAppointmentCreatedEmailForClinic({
          patientName: patientFullName,
          doctorName: doctorName,
          service: serviceName,
          requestedDate: requestedDate,
          requestedTime: requestedTime,
          patientPhone: patientInfo.phone || 'Not provided',
          patientEmail: user.email,
          language: language || 'en'
        });

        await sendEmail({
          to: clinicEmail,
          subject: clinicEmailTemplate.subject,
          html: clinicEmailTemplate.html,
          text: clinicEmailTemplate.text
        });
      }

      console.log('Appointment emails sent successfully');
    } catch (emailError) {
      console.error('Error sending appointment emails:', emailError);
      // Don't fail the appointment creation if email fails
    }

    return NextResponse.json({
      success: true,
      appointment,
      message: "Appointment request created successfully"
    });

  } catch (error) {
    console.error("Create appointment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}