import { socialLinks } from "@data/socialLinks";

describe("socialLinks", () => {
  it("should have at least one social link", () => {
    expect(socialLinks.length).toBeGreaterThan(0);
  });
});
