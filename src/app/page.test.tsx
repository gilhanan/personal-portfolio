import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "./page";

// https://github.com/vercel/next.js/issues/53272
jest.mock("next/image");

describe("Home", () => {
  it("renders a paragraph", () => {
    render(<Home />);

    const paragraph = screen.getByText("Get started by editing");
    expect(paragraph).toBeInTheDocument();
  });
});
