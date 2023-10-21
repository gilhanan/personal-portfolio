import { render, screen } from "@testing-library/react";
import { Field, InputType } from "@forms/models";
import { Input } from "@forms/components/Input";

describe("Input", () => {
  const baseField: Field<string> = {
    key: "testKey",
    label: "Test Label",
    type: "text",
  };

  it("should be rendered correctly", () => {
    render(<Input field={baseField} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "testKey");
    expect(input).toHaveAttribute("name", "testKey");

    const label = screen.getByText("Test Label");
    expect(label).toHaveAttribute("for", "testKey");
  });

  it.each([["text"], ["email"]] satisfies [InputType][])(
    "should render when type is '%s'",
    (type) => {
      const field: Field<string> = {
        ...baseField,
        type,
      };
      render(<Input field={field} />);

      const input = screen.getByRole("textbox");

      expect(input.tagName).toBe("INPUT");
      expect(input).toHaveAttribute("type", type);
    },
  );

  it("should render a texarea when type is 'textarea'", () => {
    const field: Field<string> = {
      ...baseField,
      type: "textarea",
    };
    render(<Input field={field} />);

    const input = screen.getByRole("textbox");

    expect(input.tagName).toBe("TEXTAREA");
  });

  it("should apply attributes", () => {
    const field: Field<string> = {
      ...baseField,
      attributes: {
        placeholder: "Enter something",
      },
    };
    render(<Input field={field} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Enter something");
  });

  it("should not have unexpected attributes", () => {
    render(<Input field={baseField} />);

    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute("placeholder");
  });

  it("should apply validators", () => {
    const field: Field<string> = {
      ...baseField,
      validators: {
        required: true,
        minLength: 5,
        maxLength: 10,
      },
    };
    render(<Input field={field} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("minLength", "5");
    expect(input).toHaveAttribute("maxLength", "10");
  });

  it("should not have unexpected validators", () => {
    render(<Input field={baseField} />);

    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute("required");
    expect(input).not.toHaveAttribute("minLength");
    expect(input).not.toHaveAttribute("maxLength");
  });
});
