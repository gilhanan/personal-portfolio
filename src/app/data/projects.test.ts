import { projects } from "@data/projects";

describe("projects", () => {
  it("should have at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });
});
