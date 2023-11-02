import { render, screen } from "@testing-library/react";
import { ButtonLink, ButtonLinkProps } from "@components/ButtonLink";

describe("ButtonLink", () => {
  const props: ButtonLinkProps = {
    url: "https://example.com",
    text: "Example Text",
    lightSrc: "light-image.png",
    darkSrc: "dark-image.png",
  };

  it("should render the link", () => {
    render(<ButtonLink {...props} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", props.url);
    expect(linkElement).toHaveAttribute("target", "_blank");
  });

  it("should render the provided text", () => {
    render(<ButtonLink {...props} />);
    expect(screen.getByText(props.text)).toBeInTheDocument();
  });

  it("should render a ThemedImage component with the provided props", () => {
    render(<ButtonLink {...props} />);
    expect(
      screen.getByRole("img", {
        name: `${props.text} (dark)`,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: `${props.text} (light)`,
      }),
    ).toBeInTheDocument();
  });
});
