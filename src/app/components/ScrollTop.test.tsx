import { render, fireEvent, screen } from "@testing-library/react";
import { ScrollTop } from "@components/ScrollTop";

window.scrollTo = jest.fn((options: ScrollToOptions | undefined) => {
  const { top = 0 } = options || {};
  window.scrollY = top;
});

const getScrollTopButton = () =>
  screen.queryByRole("button", { name: "Scroll to top" });

describe("ScrollTop", () => {
  beforeEach(() => {
    render(<ScrollTop />);
  });

  it("should be hidden when there is no scroll", () => {
    expect(getScrollTopButton()).not.toBeInTheDocument();
  });

  it("should be shown when there is enought scroll", () => {
    expect(getScrollTopButton()).not.toBeInTheDocument();

    fireEvent.scroll(window, { target: { scrollY: 500 } });

    expect(getScrollTopButton()).toBeInTheDocument();
  });

  it("should be hidden after manually scrolling top", () => {
    expect(getScrollTopButton()).not.toBeInTheDocument();

    fireEvent.scroll(window, { target: { scrollY: 500 } });

    expect(getScrollTopButton()).toBeInTheDocument();

    fireEvent.scroll(window, { target: { scrollY: 300 } });

    expect(getScrollTopButton()).not.toBeInTheDocument();
  });

  it("should be scroll to top when clicked", async () => {
    expect(getScrollTopButton()).not.toBeInTheDocument();

    fireEvent.scroll(window, { target: { scrollY: 500 } });

    expect(getScrollTopButton()).toBeInTheDocument();

    fireEvent.click(getScrollTopButton() as HTMLElement);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });

    fireEvent.scroll(window);

    expect(getScrollTopButton()).not.toBeInTheDocument();
  });
});
