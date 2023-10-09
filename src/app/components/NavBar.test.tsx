import { render, fireEvent, screen, within } from "@testing-library/react";
import { Theme, ThemeContext } from "@contexts/ThemeContext";
import { NavBar } from "@components/NavBar";

const navLinks: string[] = ["Projects page", "About Me page", "Contact page"];

const getSmallScreenMenu = () =>
  screen.queryByTestId("Small-screen menu") as HTMLElement;
const getHomeLink = () => screen.getByRole("link", { name: /Home page/ });
const getMenuToggleButton = () =>
  screen.getByRole("button", { name: "Toggle Menu" });
const getThemeSwitcherButton = () =>
  screen.getByRole("button", { name: "Theme Toggler" });

describe("NavBar", () => {
  it("should render the main link and navigation links", () => {
    render(<NavBar />);
    expect(getHomeLink()).toBeInTheDocument();
    navLinks.forEach((name) => {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    });
  });

  it("should toggle the menu when the menu button is clicked", () => {
    render(<NavBar />);

    expect(getSmallScreenMenu()).not.toBeInTheDocument();

    const menuButton = getMenuToggleButton();

    expect(menuButton).toHaveAttribute("aria-pressed", "false");
    expect(getSmallScreenMenu()).not.toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-pressed", "true");
    navLinks.forEach((name) => {
      expect(
        within(getSmallScreenMenu()).getByRole("link", {
          name,
        }),
      ).toBeInTheDocument();
    });

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-pressed", "false");
    expect(getSmallScreenMenu()).not.toBeInTheDocument();
  });

  it("should close the menu when home navigation link is clicked", () => {
    render(<NavBar />);
    expect(getSmallScreenMenu()).not.toBeInTheDocument();

    fireEvent.click(getMenuToggleButton());
    expect(getSmallScreenMenu()).toBeInTheDocument();

    fireEvent.click(getHomeLink());
    expect(getSmallScreenMenu()).not.toBeInTheDocument();
  });

  it("should keep the menu open when theme switcher button is clicked", () => {
    render(
      <ThemeContext.Provider value={{ theme: "light", setTheme: jest.fn() }}>
        <NavBar />
      </ThemeContext.Provider>,
    );

    expect(getSmallScreenMenu()).not.toBeInTheDocument();

    fireEvent.click(getMenuToggleButton());
    expect(getSmallScreenMenu()).toBeInTheDocument();

    fireEvent.click(getThemeSwitcherButton());
    expect(getSmallScreenMenu()).toBeInTheDocument();
  });

  it.each([
    { current: "light", expected: "dark" },
    { current: "dark", expected: "light" },
  ] satisfies { current: Theme; expected: Theme }[])(
    "should toggle the theme from $current to $expected when the theme switcher button is clicked",
    ({ current, expected }) => {
      const setTheme = jest.fn();
      render(
        <ThemeContext.Provider value={{ theme: current, setTheme }}>
          <NavBar />
        </ThemeContext.Provider>,
      );
      fireEvent.click(getThemeSwitcherButton());
      expect(setTheme).toHaveBeenCalledWith(expected);
    },
  );
});
