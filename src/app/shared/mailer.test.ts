import { createTransport } from "nodemailer";
import { sendMail } from "@shared/mailer";

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

describe("sendMail", () => {
  it("should create transporter correctly", async () => {
    expect(createTransport).toHaveBeenCalledWith({
      service: "gmail",
      auth: {
        user: "mockUser",
        pass: "mockPassword",
      },
    });
  });

  it("should send email correctly", async () => {
    const mail = {
      subject: "Test Subject",
      html: "<h1>Hello World</h1>",
    };

    await sendMail(mail);

    const sendMailMocked = (createTransport as jest.Mock).mock.results[0].value
      .sendMail;

    expect(sendMailMocked).toHaveBeenCalledWith({
      ...mail,
      from: "Personal Portfolio <mockUser>",
      to: "mockUser@example.com",
    });
  });
});
