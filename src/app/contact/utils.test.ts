import { isValid } from "@forms/validator";
import { Contact } from "@contact/models";
import { fields, isContact } from "@contact/utils";

jest.mock("../forms/validator", () => ({
  isValid: jest.fn(),
}));

describe("isContact", () => {
  it("should call isValid", () => {
    const contact: Contact = {
      name: "name",
      email: "email",
      subject: "subject",
      text: "text",
    };

    isContact(contact);

    expect(isValid).toHaveBeenCalledWith({
      obj: contact,
      fields,
    });
  });
});
