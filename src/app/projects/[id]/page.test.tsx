import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import { projects } from "@data/projects";
import ProjectPage, {
  generateMetadata,
  generateStaticParams,
} from "@projects/[id]/page";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("About", () => {
  it("should contain metadata", async () => {
    expect(
      generateMetadata({ params: { id: "chat-gpt-rtl" } }),
    ).resolves.toEqual({
      title: "ChatGPT RTL",
    });
  });

  it("returns the correct params for static paths", () => {
    const result = generateStaticParams();
    const expectedParams = projects.map(({ id }) => ({
      id,
    }));
    expect(result).toEqual(expectedParams);
  });

  it("renders the project details when project is found", () => {
    render(<ProjectPage params={{ id: "chat-gpt-rtl" }} />);
    expect(
      screen.getByRole("heading", { name: "ChatGPT RTL" }),
    ).toBeInTheDocument();
  });

  it("returns not found when project is not found", () => {
    render(<ProjectPage params={{ id: "non-existent-project" }} />);
    expect(notFound).toHaveBeenCalled();
  });
});
