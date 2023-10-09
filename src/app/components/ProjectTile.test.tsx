import { render, screen } from "@testing-library/react";
import { Project } from "@shared/models";
import { ProjectTile } from "@components/ProjectTile";

const project: Project = {
  title: "Test Project",
  url: "https://testproject.com",
  category: "Chrome Extension",
  repo: "https://github.com/test/testproject",
  images: {
    light: "/test/light.jpg",
    dark: "/test/dark.jpg",
  },
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

  it("should render project link", () => {
    render(<ProjectTile {...project} />);

    expect(
      screen.getByRole("link", {
        name: `View ${project.title} ${project.category}`,
      }),
    ).toHaveAttribute("href", project.url);
  });
});
