import { render, screen } from "@testing-library/react";
import { Project } from "@shared/models";
import { ProjectTile } from "@components/ProjectTile";

const project: Project = {
  id: "1",
  title: "Test Project",
  url: "https://testproject.com",
  category: "Chrome Extension",
  repo: "https://github.com/test/testproject",
  images: {
    light: "/test/light.jpg",
    dark: "/test/dark.jpg",
  },
  description: <>Test project description</>,
};

describe("ProjectTile", () => {
  it("should render project title and category", () => {
    render(<ProjectTile {...project} />);
    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.category)).toBeInTheDocument();
  });

  it("should render project images", () => {
    render(<ProjectTile {...project} />);
    const tileImages = screen.getAllByRole("img", {
      name: /Project tile image/,
    });

    expect(
      tileImages.find(
        (img) => img.getAttribute("src") === project.images.light,
      ),
    ).toBeInTheDocument();
    expect(
      tileImages.find((img) => img.getAttribute("src") === project.images.dark),
    ).toBeInTheDocument();
  });

  it("should render source code link", () => {
    render(<ProjectTile {...project} />);

    expect(
      screen.getByRole("link", { name: `View ${project.title} code` }),
    ).toHaveAttribute("href", project.repo);
  });

  it("should render external project link", () => {
    render(<ProjectTile {...project} />);

    expect(
      screen.getByRole("link", { name: `View ${project.title} project` }),
    ).toHaveAttribute("href", project.url);
  });

  it("should render project details link", () => {
    render(<ProjectTile {...project} />);

    expect(
      screen.getByRole("link", {
        name: `View ${project.title} project details`,
      }),
    ).toHaveAttribute("href", `/projects/${project.id}`);
  });
});
