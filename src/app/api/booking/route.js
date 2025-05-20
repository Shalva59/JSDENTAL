import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    // Get session to check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { 
          error: "Authentication required", 
          message: "Please log in to book an appointment.",
          redirect: "/pages/authorization/log_in"
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      doctorName, 
      serviceName, 
      date, 
      time, 
      patientInfo 
    } = body;

    // Log the attempt for debugging
    console.log("Old booking system accessed:", {
      user: session.user.email,
      doctorName,
      serviceName,
      date,
      time,
      timestamp: new Date().toISOString()
    });

    // Validate required fields for better error messages
    if (!doctorName || !serviceName || !date || !time || !patientInfo?.firstName || !patientInfo?.lastName || !patientInfo?.phone) {
      return NextResponse.json(
        { 
          error: "Missing required booking information",
          message: "Please fill in all required fields and try again.",
          redirect: "/pages/booking"
        },
        { status: 400 }
      );
    }

    // Return redirect response to new appointment system
    return NextResponse.json(
      { 
        success: false,
        error: "Booking system has been updated", 
        message: "We've upgraded our booking system! Please use the new appointment management system for better service and real-time updates.",
        redirect: "/pages/booking",
        data: {
          // Pass the form data so it can be pre-filled in the new system
          doctorName,
          serviceName,
          date,
          time,
          patientInfo
        }
      },
      { status: 400 }
    );

  } catch (error) {
    console.error("Booking system redirect error:", error);
    
    return NextResponse.json(
      { 
        error: "System error",
        message: "Please use the updated appointment system for booking.", 
        redirect: "/pages/booking"
      },
      { status: 500 }
    );
  }
}

// Handle GET requests with information about the new system
export async function GET(request) {
  return NextResponse.json(
    {
      message: "Booking system has been updated",
      description: "We now use a new appointment management system with real-time notifications and doctor approval workflow.",
      newBookingUrl: "/pages/booking",
      appointmentsUrl: "/appointments",
      features: [
        "Real-time appointment status updates",
        "Doctor approval system", 
        "Counter-offer functionality",
        "Daily appointment limits",
        "Instant notifications",
        "Better appointment management"
      ]
    },
    { status: 200 }
  );
}