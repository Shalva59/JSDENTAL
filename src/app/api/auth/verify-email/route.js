import { verifyUserEmail } from "../../../lib/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/pages/authorization/verification-failed", request.url)
    );
  }

  try {
    await verifyUserEmail(token);
    
    // Redirect to a successful verification page
    return NextResponse.redirect(
      new URL("/pages/authorization/verification-success", request.url)
    );
  } catch (error) {
    console.error("Email verification error:", error);
    
    // Redirect to a failed verification page
    return NextResponse.redirect(
      new URL("/pages/authorization/verification-failed", request.url)
    );
  }
}