declare global {
  interface Window {
    reCaptchaCallback?: () => void;
  }
}

export {};
