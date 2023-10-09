"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { FiX, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { motion } from "framer-motion";
import { ThemeContext } from "@contexts/ThemeContext";

type NavLinkProps = {
  href: string;
  label: string;
  ariaLabel?: string;
};

const mainLink: NavLinkProps = {
  href: "/",
  label: "Gil Hanan",
  ariaLabel: "Gil Hanan's Home page",
};

const navLinks: NavLinkProps[] = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About Me" },
  { href: "/contact", label: "Contact" },
];

export function NavBar(): ReturnType<React.FC> {
  const { theme, setTheme } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const NavLink: React.FC<NavLinkProps> = ({ href, label, ariaLabel }) => (
    <Link
      href={href}
      aria-label={ariaLabel || label + " page"}
      className="text-lg p-2 sm:rounded-md text-primary font-medium hover:bg-primary-bg"
      onClick={() => setShowMenu(false)}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky z-20 top-0 border-b bg-inherit shadow-md">
      {showMenu && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.25 }}
          className="absolute top-[100%] container mx-auto pb-2 flex sm:hidden flex-col divide-y border-b bg-inherit shadow-md"
          data-testid="Small-screen menu"
        >
          {navLinks.map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} />
          ))}
        </motion.div>
      )}
      <div className="relative container mx-auto py-6 flex justify-between items-center bg-inherit">
        <NavLink {...mainLink} />
        <div className="hidden sm:flex justify-center">
          {navLinks.map(({ href, label }) => (
            <div className="mx-4" key={href}>
              <NavLink href={href} label={label} />
            </div>
          ))}
        </div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-xl flex p-3 text-primary bg-primary-bg hover:bg-secondary-bg shadow-sm rounded-md"
          aria-label="Theme Toggler"
        >
          <FiSun className="hidden dark:block" />
          <FiMoon className="dark:hidden" />
        </button>
        <button
          onClick={() => setShowMenu((prevShowMenu) => !prevShowMenu)}
          className="sm:hidden text-3xl p-3 text-primary"
          aria-label="Toggle Menu"
          aria-pressed={showMenu}
        >
          {showMenu ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
}
