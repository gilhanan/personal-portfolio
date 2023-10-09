import { render, screen } from "@testing-library/react";
import { Footer } from "@components/Footer";

jest.mock("../data/socialLinks", () => ({
  socialLinks: [
    {
      url: "https://www.example.com",
      icon: () => <i />,
      ariaLabel: "example",
    },
  ],
}));

describe("Footer", () => {
  it("should render title", () => {
    render(<Footer />);
    expect(
      screen.getByRole("heading", { name: "Follow me" }),
    ).toBeInTheDocument();
  });

  it("should render social link", () => {
    const { getByRole } = render(<Footer />);
    const link = getByRole("link", {
      name: "example",
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://www.example.com");
    expect(link).toHaveAttribute("target", "__blank");
  });
});
