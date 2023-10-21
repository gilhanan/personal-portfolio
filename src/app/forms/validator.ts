import { Field, Fields, InputType } from "@forms/models";

const inputTypeToType: Record<InputType, "string"> = {
  text: "string",
  email: "string",
  textarea: "string",
};

export function isValid<T>({
  obj,
  fields,
}: {
  obj: unknown;
  fields: Fields<T>;
}): boolean {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  return (Object.entries(fields) as [keyof Fields<T>, Field<keyof T>][]).every(
    ([key, { type, validators }]) => {
      const { required, minLength, maxLength } = validators || {};
      const value = (obj as T)[key];

      if (required && (value === undefined || value === null)) {
        return false;
      }

      if (value !== undefined && typeof value !== inputTypeToType[type]) {
        return false;
      }

      if (
        type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)
      ) {
        return false;
      }

      if (
        typeof minLength === "number" &&
        (value as string).length < minLength
      ) {
        return false;
      }

      if (
        typeof maxLength === "number" &&
        (value as string).length > maxLength
      ) {
        return false;
      }

      return true;
    },
  );
}
