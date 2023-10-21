"use client";
import { useRef, useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { reCaptchaHeaderKey } from "@shared/constants";
import ReCaptcha, { ReCaptchaRef } from "@components/ReCaptcha";
import { Input } from "@forms/components/Input";
import { Submit } from "@forms/components/Submit";
import { Field } from "@forms/models";
import { Contact } from "@contact/models";
import { fields } from "@contact/utils";

interface ContactFormProps {
  reCaptchaSiteKey: string;
}

export function ContactForm({ reCaptchaSiteKey }: ContactFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState(false);
  const reCaptchaRef = useRef<ReCaptchaRef>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsSending(true);

      const body = new FormData(e.currentTarget);
      const token = await reCaptchaRef.current?.execute();

      const { status } = await fetch("/api/contact", {
        method: "POST",
        body,
        headers: { [reCaptchaHeaderKey]: token as string },
      });

      if (status !== 200) {
        throw new Error();
      }

      router.push("/contact/success");
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSending(false);
    }
  }

  function getField(field: Field<keyof Contact>): Field<keyof Contact> {
    return {
      ...field,
      attributes: {
        ...field.attributes,
        disabled: isSending,
      },
    };
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => setIsError(false)}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        <Input field={getField(fields.name)} />
        <Input field={getField(fields.email)} />
        <Input field={getField(fields.subject)} />
        <Input field={getField(fields.text)} />
      </div>
      <div className="flex justify-center">
        <ReCaptcha
          ref={reCaptchaRef}
          sitekey={reCaptchaSiteKey}
          className="flex justify-center"
          onReady={() => setIsLoading(false)}
        />
        <Submit
          isSubmitting={isSending}
          disabled={isLoading}
          icon={<BiMailSend className="text-2xl" />}
        />
      </div>
      {isError && (
        <p className="text-red-500 text-center">
          There was an error sending your message. Please try again later.
        </p>
      )}
    </form>
  );
}
