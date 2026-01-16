"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "PROJECTS", href: "/projects" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <Link href="/" className="text-sm font-bold tracking-wider">
          DAYRENT TJIANG
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 border border-white/20 rounded-full px-5 py-2.5 hover:bg-white/5 transition-colors"
        >
          <span className="text-sm">Menu</span>
          <span className="text-lg">&lt;&gt;</span>
        </button>
      </header>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0a0a0a]">
          {/* Close Button */}
          <div className="flex items-center justify-between px-8 py-6">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold tracking-wider"
            >
              DAYRENT TJIANG
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 border border-white/20 rounded-full px-5 py-2.5 hover:bg-white/5 transition-colors"
            >
              <span className="text-sm">Close</span>
              <span className="text-lg">✕</span>
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-5xl md:text-7xl font-bold hover:text-[#4ade80] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex gap-8 mt-16 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">
                TWITTER
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LINKEDIN
              </a>
              <a href="#" className="hover:text-white transition-colors">
                GITHUB
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
