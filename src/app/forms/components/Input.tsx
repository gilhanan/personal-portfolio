import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Field } from "@forms/models";

export interface InputProps {
  field: Field<string>;
}

const inputClassName = "px-3 py-2 border bg-input-bg rounded-md shadow-sm";
const requiredClassName = "after:content-['*'] after:ml-0.5 after:text-red-500";

function getLabelClassNames(validators: Field<string>["validators"]) {
  return `text-lg ${validators?.required ? requiredClassName : ""}`;
}

export function Input({
  field: { key, label, type, validators, attributes },
}: InputProps) {
  const commonProps: InputHTMLAttributes<HTMLInputElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement> = {
    ...attributes,
    ...validators,
    id: key,
    name: key,
    className: inputClassName,
  };

  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    ...commonProps,
    type,
  };

  const textareaProps: TextareaHTMLAttributes<HTMLTextAreaElement> = {
    ...commonProps,
    rows: 4,
  };

  return (
    <div className="flex flex-col gap-2 text-secondary">
      <label className={getLabelClassNames(validators)} htmlFor={key}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea {...textareaProps} />
      ) : (
        <input {...inputProps} />
      )}
    </div>
  );
}
