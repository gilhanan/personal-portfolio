import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "@app/layout";

const NavBar = "NavBar";
const Footer = "Footer";

jest.mock("./components/NavBar", () => ({
  NavBar: () => <div data-testid={NavBar}>NavBar</div>,
}));

jest.mock("./components/Footer", () => ({
  Footer: () => <div data-testid={Footer}>Footer</div>,
}));

describe("Layout", () => {
  it("should contain metadata", () => {
    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
  });

  it("should render children", () => {
    const testId = "test-children";
    render(
      <RootLayout>
        <div data-testid={testId}></div>
      </RootLayout>,
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.queryAllByTestId(testId)).toHaveLength(1);
  });

  it.each([NavBar, Footer])("should render %s", (component) => {
    render(<RootLayout> </RootLayout>);

    expect(screen.getByTestId(component)).toBeInTheDocument();
    expect(screen.queryAllByTestId(component)).toHaveLength(1);
  });
});
