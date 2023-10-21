import { Fields, Validators } from "@forms/models";
import { isValid } from "@forms/validator";

describe("isValid", () => {
  const fields: Fields<{
    name: string;
  }> = {
    name: { key: "name", type: "text", label: "Name" },
  };

  function getValidatedFields(validators: Validators) {
    return {
      name: { ...fields.name, validators },
    };
  }

  it("should return false for non-object input", () => {
    expect(isValid({ obj: null, fields })).toBeFalsy();
    expect(isValid({ obj: undefined, fields })).toBeFalsy();
    expect(isValid({ obj: "string", fields })).toBeFalsy();
    expect(isValid({ obj: 123, fields })).toBeFalsy();
  });

  it("should validate required fields", () => {
    const fields = getValidatedFields({ required: true });

    expect(isValid({ obj: {}, fields })).toBeFalsy();
    expect(isValid({ obj: { name: "John" }, fields })).toBeTruthy();
  });

  it("should validate optional fields", () => {
    expect(isValid({ obj: {}, fields })).toBeTruthy();
    expect(isValid({ obj: { name: undefined }, fields })).toBeTruthy();
  });

  it("should validate email format", () => {
    const fields: Fields<{
      email: string;
    }> = {
      email: { key: "email", type: "email", label: "Email" },
    };

    expect(isValid({ obj: { email: "invalid" }, fields })).toBeFalsy();
    expect(
      isValid({ obj: { email: "john@example.com" }, fields }),
    ).toBeTruthy();
  });

  it("should validate string length constraints", () => {
    const fields = getValidatedFields({ minLength: 10, maxLength: 20 });

    expect(isValid({ obj: { name: "Too short" }, fields })).toBeFalsy();
    expect(
      isValid({
        obj: {
          name: "Too long name that exceeds the maximum length",
        },
        fields,
      }),
    ).toBeFalsy();
    expect(
      isValid({ obj: { name: "Sufficient length" }, fields }),
    ).toBeTruthy();
  });

  it("should validate input types", () => {
    expect(isValid({ obj: { name: "John" }, fields })).toBeTruthy();
    expect(isValid({ obj: { name: true }, fields })).toBeFalsy();
    expect(isValid({ obj: { name: false }, fields })).toBeFalsy();
    expect(isValid({ obj: { name: 0 }, fields })).toBeFalsy();
    expect(isValid({ obj: { name: 1 }, fields })).toBeFalsy();
    expect(isValid({ obj: { name: null }, fields })).toBeFalsy();
    expect(isValid({ obj: { name: {} }, fields })).toBeFalsy();
    expect(isValid({ obj: { name: [] }, fields })).toBeFalsy();
  });
});
