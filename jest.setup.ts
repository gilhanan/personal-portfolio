import "@testing-library/jest-dom";
import { createElement } from "react";
import type { ImageProps } from "next/image";

process.env.SMTP_USER = "mockUser";
process.env.SMTP_PASSWORD = "mockPassword";
process.env.SMTP_RECEIVER = "mockUser@example.com";
process.env.RECAPTCHA_SECRET_KEY = "mockSecretKey";

function MockImage({ priority, ...props }: ImageProps) {
  return createElement("img", {
    ...props,
    priority: priority ? "true" : undefined,
  });
}

jest.mock("next/image", () => MockImage); // https://github.com/vercel/next.js/issues/53272
