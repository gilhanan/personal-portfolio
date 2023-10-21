import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ThemeContext } from "@contexts/ThemeContext";

export interface ReCaptchaProps {
  className: string;
  sitekey: string;
  onReady: () => void;
}

export interface ReCaptchaRef {
  execute: () => Promise<string>;
}

interface ExecutionCallback {
  resolve: (token: string) => void;
  reject: () => void;
}

const scriptId = "recaptcha-script";
const reCaptchaCallback = "reCaptchaCallback";
const reCaptchaScript = `https://www.recaptcha.net/recaptcha/api.js?onload=${reCaptchaCallback}&render=explicit`;

const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(function ReCaptcha(
  { className, sitekey, onReady }: ReCaptchaProps,
  ref,
) {
  const { theme } = useContext(ThemeContext);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const executionCallback = useRef<ExecutionCallback>();

  function loadScript() {
    window[reCaptchaCallback] = () => {
      setIsScriptLoaded(true);
      onReady();
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = reCaptchaScript;
      script.id = scriptId;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  function unloadScript() {
    document.getElementById(scriptId)?.remove();
  }

  async function execute(): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      executionCallback.current = { resolve, reject };
    });

    window.grecaptcha.execute();

    return promise;
  }

  function handleChange(token: string) {
    executionCallback.current?.resolve(token);
    grecaptcha.reset();
  }

  function handleErrored() {
    executionCallback.current?.reject();
    grecaptcha.reset();
  }

  useEffect(() => {
    loadScript();

    return () => {
      unloadScript();
    };
  });

  useEffect(() => {
    if (isScriptLoaded && container.current) {
      const recaptchaContainer = document.createElement("div");
      container.current.replaceChildren(recaptchaContainer);
      window.grecaptcha.render(recaptchaContainer, {
        sitekey,
        theme,
        size: "invisible",
        callback: handleChange,
        "error-callback": handleErrored,
      });
    }
  }, [isScriptLoaded, sitekey, theme]);

  useImperativeHandle(ref, () => ({
    execute,
  }));

  return <div ref={container} className={className} />;
});

export default ReCaptcha;
