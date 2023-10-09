/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-bg": "var(--color-primary-bg)",
        secondary: "var(--color-secondary)",
        "secondary-bg": "var(--color-secondary-bg)",
        "input-bg": "var(--color-input-bg)",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "8rem",
          xl: "10rem",
          "2xl": "16rem",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
