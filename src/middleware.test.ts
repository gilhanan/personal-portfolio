/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { reCaptchaHeaderKey } from "@shared/constants";
import { config, middleware } from "@src/middleware";

const validReCaptchaToken = "valid-token";

jest.mock("./app/shared/reCaptcha", () => ({
  verifyReCaptcha: jest.fn(({ reCaptchaToken }) =>
    Promise.resolve({ success: reCaptchaToken === validReCaptchaToken }),
  ),
}));

const getRequest = ({ reCaptchaToken }: { reCaptchaToken: string }) =>
  new NextRequest("https://example.com", {
    headers: {
      [reCaptchaHeaderKey]: reCaptchaToken,
    },
  });

describe("config", () => {
  it("should match correctely", () => {
    expect(config.matcher).toBe("/api/contact");
  });
});

describe("middleware", () => {
  it("should return 400 if reCAPTCHA verification fails", async () => {
    const request = getRequest({ reCaptchaToken: "invalid-token" });

    const response = await middleware(request);

    expect(response?.status).toBe(400);
    expect(await response?.json()).toEqual({
      message: "Failed to verify reCAPTCHA",
    });
  });

  it("should be successful if reCAPTCHA verification succeeds", async () => {
    const request = getRequest({ reCaptchaToken: validReCaptchaToken });

    const response = await middleware(request);

    expect(response).toBeUndefined();
  });
});
