import { render, screen } from "@testing-library/react";
import ContactSuccessPage from "@contact/success/page";

describe("ContactSuccess", () => {
  it("should render ContactForm", () => {
    render(<ContactSuccessPage />);

    expect(screen.getByText(/Thank you/i)).toBeInTheDocument();
  });
});
