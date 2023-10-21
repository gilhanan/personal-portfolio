import { render, screen } from "@testing-library/react";
import ContactPage from "@contact/page";

const ContactForm = "ContactForm";

jest.mock("./components/ContactForm", () => ({
  ContactForm: () => <div data-testid={ContactForm}></div>,
}));

describe("Contact", () => {
  it("should render ContactForm", () => {
    render(<ContactPage />);

    expect(screen.getByText(/If you have any questions/i)).toBeInTheDocument();
    expect(screen.getByTestId(ContactForm)).toBeInTheDocument();
    expect(screen.queryAllByTestId(ContactForm)).toHaveLength(1);
  });
});
