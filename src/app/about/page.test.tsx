import { render, screen } from "@testing-library/react";
import AboutPage, { metadata } from "@app/about/page";

describe("About", () => {
  it("should contain metadata", () => {
    expect(metadata.title).toBeTruthy();
  });

  it("should render title", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", { name: "About Me" }),
    ).toBeInTheDocument();
  });

  it("should render content", () => {
    const { container } = render(<AboutPage />);

    expect(container.querySelectorAll("p").length).toBeGreaterThan(0);
  });
});
