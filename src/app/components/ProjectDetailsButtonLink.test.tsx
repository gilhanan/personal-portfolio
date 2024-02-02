import { render, screen } from "@testing-library/react";
import { ProjectDetailsButtonLink } from "./ProjectDetailsButtonLink";
import { Category } from "../shared/models";

describe("ProjectDetailsButtonLink", () => {
  it.each([
    ["Chrome Extension", "Get extension"],
    ["Web development", "Open website"],
  ] satisfies [Category, string][])(
    `renders the correct link title for %s category`,
    (category, title) => {
      render(
        <ProjectDetailsButtonLink
          category={category}
          url={"https://example.com"}
        />,
      );
      const linkTitle = screen.getByText(title);
      expect(linkTitle).toBeInTheDocument();
    },
  );
});
