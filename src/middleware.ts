import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyReCaptcha } from "@shared/reCaptcha";
import { reCaptchaHeaderKey } from "@shared/constants";

export const config = {
  matcher: "/api/contact",
};

export async function middleware(request: NextRequest) {
  const reCaptchaToken = request.headers.get(reCaptchaHeaderKey) as string;

  const { success } = await verifyReCaptcha({ reCaptchaToken });

  if (!success) {
    return NextResponse.json(
      { message: "Failed to verify reCAPTCHA" },
      { status: 400 },
    );
  }
}
