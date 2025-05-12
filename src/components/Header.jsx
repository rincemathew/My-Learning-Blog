"use client";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";

export default function Header() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b-2">
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm sm:text-xl font-semibold"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            My Learning Blog
          </span>
          <span className="dark:text-white">Blog</span>
        </Link>

        {/* Search */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <AiOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Icons & Buttons */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Icon */}
          <button className="lg:hidden w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-gray-700">
            <AiOutlineSearch />
          </button>

          {/* Dark Mode Toggle */}
          <button
            className="hidden sm:flex w-10 h-10 items-center justify-center border border-gray-300 rounded-full text-gray-700"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </button>

          {/* Sign In */}
          <SignedIn>
            <UserButton
            appearance={
              {
                baseTheme:theme === 'light' ? light : dark,
              }
            }
            />
          </SignedIn>
          <SignedOut>
            <button className="px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all">
              <SignInButton/>
            </button>
            </SignedOut>

          {/* Toggle Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block lg:hidden p-2 border border-gray-300 rounded-md"
          >
            <div className="w-5 h-0.5 bg-gray-600 mb-1" />
            <div className="w-5 h-0.5 bg-gray-600 mb-1" />
            <div className="w-5 h-0.5 bg-gray-600" />
          </button>
        </div>
      </nav>

      {/* Desktop links (visible on lg+) */}
      <ul className="hidden lg:flex gap-4 px-4">
        <li>
          <Link
            href="/"
            className={`px-3 py-2 rounded ${
              path === "/"
                ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600"
                : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`px-3 py-2 rounded ${
              path === "/about"
                ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600"
                : ""
            }`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className={`px-3 py-2 rounded ${
              path === "/projects"
                ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600"
                : ""
            }`}
          >
            Projects
          </Link>
        </li>
      </ul>

      {/* Collapsible Menu (mobile) */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 px-4 py-2">
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/"
                className={`block px-4 py-2 rounded ${
                  path === "/"
                    ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600"
                    : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block px-4 py-2 rounded ${
                  path === "/about"
                    ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600"
                    : ""
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={`block px-4 py-2 rounded ${
                  path === "/projects"
                    ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600"
                    : ""
                }`}
              >
                Projects
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
