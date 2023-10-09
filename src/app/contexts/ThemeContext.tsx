"use client";
import { createContext, useState } from "react";

const themes = ["light", "dark"] as const;

export type Theme = (typeof themes)[number];

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

function applyTheme(theme: Theme): void {
  const prevTheme = theme === "dark" ? "light" : "dark";
  const {
    documentElement: { classList },
  } = document;
  classList.remove(prevTheme);
  classList.add(theme);
  localStorage.theme = theme;
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as unknown as ThemeContextProps,
);

function getInitialTheme(): Theme {
  if (typeof window !== "undefined") {
    const { theme } = window.localStorage;
    if (themes.includes(theme)) {
      return theme;
    }
  }
  return "light";
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({
  children,
}: ThemeProviderProps): ReturnType<React.FC> {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (theme) => {
          applyTheme(theme);
          setTheme(theme);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
