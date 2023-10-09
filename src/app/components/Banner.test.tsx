import { render, screen } from "@testing-library/react";
import { Banner } from "@components/Banner";

describe("Banner", () => {
  it("should render name", () => {
    render(<Banner />);
    expect(
      screen.getByRole("heading", { name: "HI, I'M GIL" }),
    ).toBeInTheDocument();
  });

  it("should render job title", () => {
    render(<Banner />);
    expect(screen.getByText("I build things for the web")).toBeInTheDocument();
  });

  it("should render dark and light Developer images", () => {
    render(<Banner />);
    const darkDeveloperImage = screen.getByRole("img", {
      name: "Developer (dark)",
    });
    const lightDeveloperImage = screen.getByRole("img", {
      name: "Developer (light)",
    });
    expect(darkDeveloperImage).toBeInTheDocument();
    expect(lightDeveloperImage).toBeInTheDocument();
  });
});
