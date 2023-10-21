import { SentMessageInfo, createTransport } from "nodemailer";

const { SMTP_USER: user, SMTP_PASSWORD: pass, SMTP_RECEIVER: to } = process.env;

const transporter = createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

interface Mail {
  subject: string;
  html: string;
}

export function sendMail(mail: Mail): Promise<SentMessageInfo> {
  return transporter.sendMail({
    ...mail,
    from: `Personal Portfolio <${user}>`,
    to,
  });
}
