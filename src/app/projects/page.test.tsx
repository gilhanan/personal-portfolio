import { render, screen } from "@testing-library/react";
import ProjectsPage, { metadata } from "@projects/page";

const Projects = "Projects";

jest.mock("../components/Projects", () => ({
  Projects: () => <div data-testid={Projects}></div>,
}));

describe("Projects", () => {
  it("should contain metadata", () => {
    expect(metadata.title).toBeTruthy();
  });

  it.each([Projects])("should render %s", (component) => {
    render(<ProjectsPage />);

    expect(screen.getByTestId(component)).toBeInTheDocument();
    expect(screen.queryAllByTestId(component)).toHaveLength(1);
  });
});
