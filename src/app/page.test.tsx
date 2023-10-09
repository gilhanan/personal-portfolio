import { render, screen } from "@testing-library/react";
import Home from "@app/page";

const Banner = "Banner";
const Projects = "Projects";

jest.mock("./components/Banner", () => ({
  Banner: () => <div data-testid={Banner}></div>,
}));

jest.mock("./components/Projects", () => ({
  Projects: () => <div data-testid={Projects}></div>,
}));

describe("Home", () => {
  it.each([Banner, Projects])("should render %s", (component) => {
    render(<Home />);

    expect(screen.getByTestId(component)).toBeInTheDocument();
    expect(screen.queryAllByTestId(component)).toHaveLength(1);
  });
});
