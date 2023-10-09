import { initTheme } from "@scripts/initTheme";

describe("initTheme", () => {
  let mockedQuery;

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn((query) => ({
        matches: query === mockedQuery,
      })),
    });
  });

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark", "light");
  });

  it.each([["dark"], ["light"]])(
    'should set theme to %s if localStorage has "theme" set to "%s"',
    (theme) => {
      localStorage.setItem("theme", theme);
      initTheme();
      expect(localStorage.getItem("theme")).toBe(theme);
      expect(document.documentElement.classList.contains(theme)).toBe(true);
    },
  );

  it.each([
    {
      query: "(prefers-color-scheme: light)",
      expectedTheme: "light",
    },
    {
      query: "(prefers-color-scheme: dark)",
      expectedTheme: "dark",
    },
  ])(
    "should set theme to $expectedTheme if localStorage is empty and prefers-color-scheme is $query",
    ({ query, expectedTheme }) => {
      mockedQuery = query;
      initTheme();
      expect(localStorage.getItem("theme")).toBe(expectedTheme);
      expect(document.documentElement.classList.contains(expectedTheme)).toBe(
        true,
      );
    },
  );
});
