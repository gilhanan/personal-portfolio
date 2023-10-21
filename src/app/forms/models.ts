import type { TextareaHTMLAttributes, InputHTMLAttributes } from "react";

export type InputType = "text" | "email" | "textarea";

export interface Validators {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export interface Field<K> {
  key: K;
  type: InputType;
  label: string;
  attributes?: TextareaHTMLAttributes<HTMLTextAreaElement> &
    InputHTMLAttributes<HTMLInputElement>;
  validators?: Validators;
}

export type Fields<T> = {
  [K in keyof T]: Field<K>;
};
