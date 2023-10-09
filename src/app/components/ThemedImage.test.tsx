import { render, screen } from "@testing-library/react";
import { ThemedImage } from "@components/ThemedImage";

describe("ThemedImage", () => {
  let props: Parameters<typeof ThemedImage>[0];

  beforeEach(() => {
    props = {
      lightSrc: "light.jpg",
      darkSrc: "dark.jpg",
      alt: "test image",
    };
  });

  it("should render light and dark images", () => {
    const { lightSrc, darkSrc, alt } = props;

    render(<ThemedImage {...props} />);

    const lightImage = screen.getByAltText(`${alt} (light)`);
    const darkImage = screen.getByAltText(`${alt} (dark)`);

    expect(lightImage).toHaveAttribute("src", lightSrc);
    expect(darkImage).toHaveAttribute("src", darkSrc);
  });

  it("should render with additional class names", () => {
    props.className = "test-class";
    const { alt, className } = props;

    render(<ThemedImage {...props} />);

    const lightImage = screen.getByAltText(`${alt} (light)`);
    const darkImage = screen.getByAltText(`${alt} (dark)`);

    expect(lightImage).toHaveClass(className);
    expect(darkImage).toHaveClass(className);
  });

  it("should render with additional props", () => {
    props.id = "test-id";
    const { alt, id } = props;

    render(<ThemedImage {...props} />);

    const lightImage = screen.getByAltText(`${alt} (light)`);
    const darkImage = screen.getByAltText(`${alt} (dark)`);

    expect(lightImage).toHaveAttribute("id", id);
    expect(darkImage).toHaveAttribute("id", id);
  });
});
