import { verifyReCaptcha } from "@shared/reCaptcha";

describe("verifyReCaptcha", () => {
  const reCaptchaToken = "test-token";

  let body: FormData;

  beforeEach(() => {
    body = new FormData();
    body.append("secret", "mockSecretKey");
    body.append("response", reCaptchaToken);
  });

  it("should resolve the original response", async () => {
    const expectedResponse = {
      success: true,
      challenge_ts: "test-challenge-ts",
      hostname: "test-hostname",
      "error-codes": [],
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn(() => expectedResponse),
    });

    const response = await verifyReCaptcha({ reCaptchaToken });

    expect(response).toBe(expectedResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://www.recaptcha.net/recaptcha/api/siteverify",
      {
        method: "POST",
        body,
      },
    );
  });
});
