import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@shared/mailer";
import { isContact } from "@contact/utils";

export async function POST(request: NextRequest): Promise<
  NextResponse<{
    message: string;
  }>
> {
  const form = Object.fromEntries(await request.formData());

  if (!isContact(form)) {
    return NextResponse.json({ message: "Invalid form data" }, { status: 400 });
  }

  const { name, email, subject, text } = form;

  try {
    await sendMail({
      subject,
      html: `${name} &lt;${email}&gt;<br><br>${text}`,
    });

    return NextResponse.json({
      message: `Successfully sent email to ${form.email}`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 },
    );
  }
}
