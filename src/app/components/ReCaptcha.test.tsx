import React from "react";
import { render, cleanup, act, RenderResult } from "@testing-library/react";
import { Theme, ThemeContext } from "@contexts/ThemeContext";
import ReCaptcha, { ReCaptchaProps, ReCaptchaRef } from "@components/ReCaptcha";

const scriptId = "recaptcha-script";
const testToken = "test-token";
const sitekey = "test-sitekey";

let shouldRenderFail = false;
let renderCallback: ReCaptchaV2.Parameters["callback"];
let renderErrorCallback: ReCaptchaV2.Parameters["error-callback"];

window.reCaptchaCallback = jest.fn();
window.grecaptcha = {
  execute: jest.fn(() => {
    if (shouldRenderFail) {
      renderErrorCallback?.();
    } else {
      renderCallback?.(testToken);
    }

    return Promise.resolve() as unknown as PromiseLike<void> &
      PromiseLike<string>;
  }),
  render: jest.fn<
    ReturnType<ReCaptchaV2.ReCaptcha["render"]>,
    Parameters<ReCaptchaV2.ReCaptcha["render"]>
  >((container, { callback, ["error-callback"]: errorCallback } = {}) => {
    renderCallback = callback;
    renderErrorCallback = errorCallback;
    return 0;
  }),
  reset: jest.fn(),
} satisfies Partial<ReCaptchaV2.ReCaptcha> as unknown as typeof window.grecaptcha;

const defaultProps: ReCaptchaProps = {
  className: "test-class",
  sitekey,
  onReady: jest.fn(),
};

interface RenderProps {
  props: ReCaptchaProps;
  theme: Theme;
  ref?: React.RefObject<ReCaptchaRef>;
}

function getRecaptcha({ props, theme }: RenderProps): React.ReactElement {
  return (
    <ThemeContext.Provider value={{ theme, setTheme: jest.fn() }}>
      <ReCaptcha {...props} />
    </ThemeContext.Provider>
  );
}

function renderReCaptcha(args: RenderProps): RenderResult {
  return render(getRecaptcha(args));
}

describe("ReCaptcha", () => {
  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
    shouldRenderFail = false;
  });

  it("renders the ReCaptcha container", () => {
    const { container } = renderReCaptcha({
      props: defaultProps,
      theme: "light",
    });

    expect(container.firstChild).toHaveClass(defaultProps.className);
  });

  it("appends the ReCaptcha script to the document and removes on unmount", () => {
    const { unmount } = renderReCaptcha({
      props: defaultProps,
      theme: "light",
    });

    expect(document.getElementById(scriptId)).not.toBeNull();

    unmount();

    expect(document.getElementById(scriptId)).toBeNull();
  });

  it("calls the onReady prop once ReCaptcha script is loaded", () => {
    renderReCaptcha({
      props: defaultProps,
      theme: "light",
    });

    window.reCaptchaCallback?.();

    expect(defaultProps.onReady).toHaveBeenCalledTimes(1);
  });

  it("renders grecaptcha with correct properties when the script is loaded", () => {
    const { container } = renderReCaptcha({
      props: defaultProps,
      theme: "light",
    });

    act(() => {
      window.reCaptchaCallback?.();
    });

    expect(window.grecaptcha.render).toHaveBeenCalledWith(
      container.firstChild?.firstChild,
      expect.objectContaining({
        sitekey,
        theme: "light",
        size: "invisible",
      }),
    );
  });

  it("update grepcaptcha when theme changes", () => {
    const { rerender, container } = renderReCaptcha({
      props: defaultProps,
      theme: "light",
    });

    act(() => {
      window.reCaptchaCallback?.();
    });

    expect(window.grecaptcha.render).toHaveBeenCalledWith(
      container?.firstChild?.firstChild,
      expect.objectContaining({
        theme: "light",
      }),
    );

    rerender(
      getRecaptcha({
        props: defaultProps,
        theme: "dark",
      }),
    );

    expect(window.grecaptcha.render).toHaveBeenCalledWith(
      container?.firstChild?.firstChild,
      expect.objectContaining({
        theme: "dark",
      }),
    );
  });

  it("executes the reCAPTCHA and returns the token", async () => {
    const ref = React.createRef<ReCaptchaRef>();

    render(<ReCaptcha {...defaultProps} ref={ref} />);

    act(() => {
      window.reCaptchaCallback?.();
    });

    const token = await ref.current?.execute();

    expect(token).toBe(testToken);
    expect(window.grecaptcha.execute).toHaveBeenCalled();
    expect(window.grecaptcha.reset).toHaveBeenCalled();
  });

  it("executes the reCAPTCHA and throws an error", async () => {
    const ref = React.createRef<ReCaptchaRef>();

    render(<ReCaptcha {...defaultProps} ref={ref} />);

    act(() => {
      window.reCaptchaCallback?.();
    });

    shouldRenderFail = true;

    try {
      await ref.current?.execute();
      expect(true).toBe(false);
    } catch {
      expect(window.grecaptcha.execute).toHaveBeenCalled();
      expect(window.grecaptcha.reset).toHaveBeenCalled();
    }
  });
});
