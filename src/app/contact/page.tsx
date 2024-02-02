import { ContactForm } from "@contact/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-secondary">
        If you have any questions, comments or just want to get in touch, please
        feel free to drop me a message below. I look forward to connecting with
        you!
      </p>
      <ContactForm
        reCaptchaSiteKey={process.env.RECAPTCHA_SITE_KEY as string}
      />
    </div>
  );
}
