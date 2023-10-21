/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { sendMail } from "@shared/mailer";
import { isContact } from "@contact/utils";
import { Contact } from "@contact/models";
import { POST } from "@api/contact/route";

jest.mock("../../contact/utils");
jest.mock("../../shared/mailer");

const contact: Contact = {
  name: "John Doe",
  email: "johndoe@example.com",
  subject: "Test Subject",
  text: "Test Message",
};

const { name, email, subject, text } = contact;

describe("POST", () => {
  let body: FormData;
  let request: NextRequest;

  beforeEach(() => {
    jest.clearAllMocks();

    body = new FormData();
    Object.entries(contact).forEach(([key, value]) => body.append(key, value));

    request = new NextRequest("https://example.com", {
      method: "POST",
      body,
    });
  });

  it("should send email and return 200 if form data is valid", async () => {
    (isContact as unknown as jest.Mock).mockReturnValue(true);

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      message: `Successfully sent email to ${email}`,
    });
    expect(sendMail).toHaveBeenCalledWith({
      subject,
      html: `${name} &lt;${email}&gt;<br><br>${text}`,
    });
  });

  it("should return 400 if form data is invalid", async () => {
    (isContact as unknown as jest.Mock).mockReturnValue(false);

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ message: "Invalid form data" });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("should return 500 if sending email fails", async () => {
    (isContact as unknown as jest.Mock).mockReturnValue(true);
    (sendMail as jest.Mock).mockRejectedValue(new Error());

    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ message: "Failed to send email" });
    expect(sendMail).toHaveBeenCalledWith({
      subject,
      html: `${name} &lt;${email}&gt;<br><br>${text}`,
    });
  });
});
