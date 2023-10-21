interface ReCaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  "error-codes": string[];
}

export async function verifyReCaptcha({
  reCaptchaToken,
}: {
  reCaptchaToken: string;
}): Promise<ReCaptchaResponse> {
  const body = new FormData();
  body.append("secret", process.env.RECAPTCHA_SECRET_KEY as string);
  body.append("response", reCaptchaToken);

  const response = await (
    await fetch("https://www.recaptcha.net/recaptcha/api/siteverify", {
      method: "POST",
      body,
    })
  ).json();

  return response;
}
