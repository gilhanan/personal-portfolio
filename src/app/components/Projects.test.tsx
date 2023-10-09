import { fireEvent, render, screen } from "@testing-library/react";
import { Category, Project } from "@shared/models";
import { projects } from "@data/projects";
import { Projects } from "@components/Projects";

jest.mock("../data/projects", () => ({
  projects: [
    {
      title: "First project",
      category: "Chrome Extension",
      url: "https://www.example.com",
      repo: "https://www.example.com",
      images: {
        light: "/images/first-project-light.png",
        dark: "/images/first-project-dark.png",
      },
    },
    {
      title: "Second project",
      category: "Chrome Extension",
      url: "https://www.example.com",
      repo: "https://www.example.com",
      images: {
        light: "/images/second-project-light.png",
        dark: "/images/second-project-dark.png",
      },
    },
    {
      title: "Third project",
      category: "Web Development" as Category,
      url: "https://www.example.com",
      repo: "https://www.example.com",
      images: {
        light: "/images/third-project-light.png",
        dark: "/images/third-project-dark.png",
      },
    },
  ] satisfies Project[],
}));

function projectTilesShouldMatchProjects(projects: Project[]): void {
  const projectTiles = screen.getAllByTestId("project-tile");

  expect(projectTiles).toHaveLength(projects.length);

  projects.forEach(({ title }) => {
    const project = screen.getByText(title);
    expect(project).toBeInTheDocument();
  });
}

describe("Projects", () => {
  let searchInput: HTMLInputElement;
  let categoryDropdown: HTMLSelectElement;

  beforeEach(() => {
    render(<Projects />);
    searchInput = screen.getByRole("searchbox", {
      name: "Search projects",
    }) as HTMLInputElement;
    categoryDropdown = screen.getByRole("combobox", {
      name: "Select a category",
    }) as HTMLSelectElement;
  });

  it("should render title", () => {
    const title = screen.getByRole("heading", { name: "Projects portfolio" });
    expect(title).toBeInTheDocument();
  });

  it("should render projects", () => {
    projects.forEach(({ title }) => {
      const project = screen.getByText(title);
      expect(project).toBeInTheDocument();
    });
  });

  it("should filter projects by title", () => {
    fireEvent.change(searchInput, { target: { value: "Second" } });

    const filteredProjects = projects.filter(({ title }) =>
      title.includes("Second"),
    );

    projectTilesShouldMatchProjects(filteredProjects);
  });

  it("should filter projects by category", () => {
    fireEvent.change(categoryDropdown, {
      target: { value: "Chrome Extension" },
    });

    const filteredProjects = projects.filter(
      ({ category }) => category === "Chrome Extension",
    );

    projectTilesShouldMatchProjects(filteredProjects);
  });

  it("should filter projects by category and title", () => {
    fireEvent.change(searchInput, { target: { value: "Second" } });
    fireEvent.change(categoryDropdown, {
      target: { value: "Chrome Extension" },
    });

    const filteredProjects = projects.filter(
      ({ category, title }) =>
        category === "Chrome Extension" && title.includes("Second"),
    );

    projectTilesShouldMatchProjects(filteredProjects);
  });

  it("should display a message when no projects are found", () => {
    fireEvent.change(searchInput, { target: { value: "Fourth" } });

    const message = screen.getByText("No projects found");
    expect(message).toBeInTheDocument();
  });
});
