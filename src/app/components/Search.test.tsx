import { render, fireEvent, screen } from "@testing-library/react";
import { Search } from "@components/Search";

describe("Search", () => {
  let onSearchChange: jest.Mock;

  beforeEach(() => {
    onSearchChange = jest.fn();
  });

  it("should render with placeholder", () => {
    render(<Search onSearchChange={onSearchChange} />);

    const input = screen.getByRole("searchbox");

    expect(input).toHaveAttribute("placeholder", "Search Projects");
  });

  it("should call onSearchChange with the input value", () => {
    render(<Search onSearchChange={onSearchChange} />);

    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "test" } });

    expect(onSearchChange).toHaveBeenCalledWith("test");
  });
});
