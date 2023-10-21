import { forwardRef, useEffect, useImperativeHandle } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { reCaptchaHeaderKey } from "@shared/constants";
import { Contact } from "@contact/models";
import { ReCaptchaProps, ReCaptchaRef } from "@components/ReCaptcha";
import { ContactForm } from "@contact/components/ContactForm";

const reCaptchaToken = "test-token";
const reCaptchaSiteKey = "test-site-key";

global.fetch = jest.fn(() => Promise.resolve({})) as unknown as typeof fetch;

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

let shouldReCaptchaReady = false;
let shouldReCaptchaThrows = false;

jest.mock("../../components/ReCaptcha", () =>
  forwardRef<ReCaptchaRef, ReCaptchaProps>(function ReCaptcha(
    { onReady },
    ref,
  ) {
    useImperativeHandle(ref, () => ({
      execute: jest.fn(() =>
        shouldReCaptchaThrows
          ? Promise.reject()
          : Promise.resolve(reCaptchaToken),
      ),
    }));

    useEffect(() => {
      if (shouldReCaptchaReady) {
        onReady();
      }
    }, [onReady]);

    return null;
  }),
);

const getSubmitButton = () => screen.getByRole("button", { name: /submit/i });

type ContactToFill = Record<
  keyof Contact,
  {
    name: string;
    value: string;
  }
>;

const contact: ContactToFill = {
  name: { name: "Name", value: "John Doe" },
  email: { name: "Email", value: "johndoe@example.com" },
  subject: { name: "Subject", value: "Test Subject" },
  text: { name: "Text", value: "Test Message" },
};

const getFormFields = () =>
  Object.values(contact).map(({ name }) =>
    screen.getByRole("textbox", { name }),
  );

const getFormComponents = () => {
  return [...getFormFields(), getSubmitButton()];
};

const expectFormFieldsToBeEnabled = () => {
  getFormFields().forEach((field) => {
    expect(field).toBeEnabled();
  });
};

const expectFormToBeEnabled = () => {
  getFormComponents().forEach((field) => {
    expect(field).toBeEnabled();
  });
};

const expectFormToBeDisabled = () => {
  getFormComponents().forEach((field) => {
    expect(field).toBeDisabled();
  });
};

const renderAndSubmitForm = async ({
  reCaptchaSiteKey = "",
  contact,
}: {
  reCaptchaSiteKey?: string;
  contact?: ContactToFill;
} = {}) => {
  render(<ContactForm reCaptchaSiteKey={reCaptchaSiteKey} />);

  contact &&
    Object.values(contact).forEach(({ name, value }) =>
      fireEvent.change(screen.getByRole("textbox", { name }), {
        target: { value },
      }),
    );

  fireEvent.submit(getSubmitButton());
};

describe("ContactForm", () => {
  beforeEach(() => {
    shouldReCaptchaReady = false;
    shouldReCaptchaThrows = false;
    jest.clearAllMocks();
  });

  it("should renders form fields and submit button correctly", () => {
    render(<ContactForm reCaptchaSiteKey={""} />);
    getFormComponents().forEach((field) => {
      expect(field).toBeInTheDocument();
    });
    expectFormFieldsToBeEnabled();
    expect(getSubmitButton()).toBeDisabled();
  });

  it("should enable submit button when reCaptcha is ready", async () => {
    shouldReCaptchaReady = true;
    render(<ContactForm reCaptchaSiteKey={reCaptchaSiteKey} />);
    expectFormToBeEnabled();
  });

  it("should execute reCaptcha with site key and use token in request header", async () => {
    render(<ContactForm reCaptchaSiteKey={reCaptchaSiteKey} />);
    fireEvent.submit(getSubmitButton());

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/contact", {
        method: "POST",
        headers: {
          [reCaptchaHeaderKey]: reCaptchaToken,
        },
        body: expect.any(FormData),
      });
    });
  });

  it("should submit form data", async () => {
    renderAndSubmitForm({ contact });

    const body = new FormData();
    Object.entries(contact).forEach(([key, { value }]) =>
      body.append(key, value),
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/contact", {
        method: "POST",
        headers: {
          [reCaptchaHeaderKey]: reCaptchaToken,
        },
        body,
      });
    });
  });

  it("should redirect to success page if submission succeeds", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
      }),
    );

    renderAndSubmitForm();

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/contact/success");
    });
  });

  it("should disable form fields while submitting", async () => {
    shouldReCaptchaReady = true;

    renderAndSubmitForm();

    await waitFor(() => {
      expectFormToBeDisabled();
    });

    await waitFor(() => {
      expectFormToBeEnabled();
    });
  });

  it("should show error message if ReCaptcha execute fails", async () => {
    shouldReCaptchaThrows = true;

    renderAndSubmitForm();

    await waitFor(() => {
      expect(fetch).not.toHaveBeenCalled();
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("should show error message if fetch submission fails", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        status: 500,
      }),
    );

    renderAndSubmitForm();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("should show error message if fetch submission throws", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error());

    renderAndSubmitForm();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("should hide error message when form is changed", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        status: 500,
      }),
    );

    renderAndSubmitForm();

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Name" }), {
      target: { value: "John Doe" },
    });

    await waitFor(() => {
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });
  });
});
