import { render, screen } from "@testing-library/react";
import ContactLayout, { metadata } from "@contact/layout";

describe("ContactLayout", () => {
  it("should contain metadata", () => {
    expect(metadata.title).toBeTruthy();
  });

  it("should render title", () => {
    render(<ContactLayout> </ContactLayout>);

    expect(
      screen.getByRole("heading", { name: "Contact" }),
    ).toBeInTheDocument();
  });

  it("should render children", () => {
    const testId = "test-children";
    render(
      <ContactLayout>
        <div data-testid={testId}></div>
      </ContactLayout>,
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.queryAllByTestId(testId)).toHaveLength(1);
  });
});
