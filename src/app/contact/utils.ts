import { Fields } from "@forms/models";
import { isValid } from "@forms/validator";
import { Contact } from "@contact/models";

export const fields: Fields<Contact> = {
  name: {
    key: "name",
    label: "Name",
    type: "text",
    attributes: {
      autoComplete: "name",
    },
    validators: { required: true, minLength: 2, maxLength: 30 },
  },
  email: {
    key: "email",
    label: "Email",
    type: "email",
    attributes: {
      autoComplete: "email",
    },
    validators: { required: true, minLength: 5, maxLength: 50 },
  },
  subject: {
    key: "subject",
    label: "Subject",
    type: "text",
    validators: { required: true, minLength: 2, maxLength: 60 },
  },
  text: {
    key: "text",
    label: "Text",
    type: "textarea",
    validators: { maxLength: 500 },
  },
};

export function isContact(obj: unknown): obj is Contact {
  return isValid({ obj, fields });
}
