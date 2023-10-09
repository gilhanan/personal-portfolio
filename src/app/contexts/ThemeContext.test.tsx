import { useContext } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeContext, ThemeProvider } from "@contexts/ThemeContext";

describe("ThemeProvider", () => {
  it("should render children with default theme", () => {
    const TestComponent = () => {
      const { theme } = useContext(ThemeContext);
      return <div data-testid="test-component" className={theme}></div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const testComponent = screen.getByTestId("test-component");

    expect(testComponent).toBeInTheDocument();
    expect(testComponent.className).toBe("light");
  });

  it("should apply theme when setTheme has been toggled", () => {
    localStorage.setItem("theme", "light");

    const TestComponent = () => {
      const { theme, setTheme } = useContext(ThemeContext);
      return (
        <div data-testid="test-component" className={theme}>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const testComponent = screen.getByTestId("test-component");

    expect(testComponent).toBeInTheDocument();
    expect(testComponent.className).toBe("light");

    fireEvent.click(screen.getByRole("button"));

    expect(testComponent.className).toBe("dark");

    fireEvent.click(screen.getByRole("button"));

    expect(testComponent.className).toBe("light");
  });
});
