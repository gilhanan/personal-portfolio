import { fireEvent, render, screen } from "@testing-library/react";
import { Submit } from "@forms/components/Submit";

function getSubmitButton() {
  return screen.getByRole("button", { name: /submit/i });
}

describe("Submit", () => {
  it("should render the submit button", () => {
    render(<Submit disabled={false} isSubmitting={false} icon={null} />);
    expect(getSubmitButton()).toBeInTheDocument();
  });

  it("should disable the submit button when isSubmitting is true", () => {
    render(<Submit disabled={false} isSubmitting={true} icon={null} />);
    expect(getSubmitButton()).toBeDisabled();
  });

  it("should show the icon when isSubmitting is true", () => {
    render(
      <Submit
        disabled={false}
        isSubmitting={true}
        icon={<div data-testid="icon" />}
      />,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("should not show the icon when isSubmitting is false", () => {
    render(
      <Submit
        disabled={false}
        isSubmitting={false}
        icon={<div data-testid="icon" />}
      />,
    );
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
  });

  it("should call the onSubmit function when the button is clicked", () => {
    const onSubmit = jest.fn();
    render(
      <form onSubmit={onSubmit}>
        <Submit disabled={false} isSubmitting={false} icon={null} />
      </form>,
    );
    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.click(getSubmitButton());
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
