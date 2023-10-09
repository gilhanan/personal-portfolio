import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { initTheme } from "@scripts/initTheme";
import { ThemeProvider } from "@contexts/ThemeContext";
import { NavBar } from "@components/NavBar";
import { Footer } from "@components/Footer";
import { ScrollTop } from "@components/ScrollTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Gil Hanan | %s",
    default: "Gil Hanan",
  },
  description: "Gil Hanan personal portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${initTheme.toString()})()`,
          }}
        />
      </head>
      <body
        className={
          inter.className +
          " min-h-screen pb-20 bg-white dark:bg-slate-900 flex flex-col"
        }
      >
        <ThemeProvider>
          <NavBar />
          <main className="container mx-auto">
            {children}
            <hr className="my-16" />
          </main>
          <ScrollTop />
          <div className="mt-auto">
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
