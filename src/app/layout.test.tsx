import { render } from "@testing-library/react";
import RootLayout, { metadata } from "./layout";

describe("Layout", () => {
  it("should contain metadata", () => {
    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
  });

  it("should render children", () => {
    const testId = "test-children";
    const { getByTestId, queryAllByTestId } = render(
      <RootLayout>
        <div data-testid={testId}></div>
      </RootLayout>,
    );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(queryAllByTestId(testId)).toHaveLength(1);
  });
});
