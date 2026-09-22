"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "PROJECTS", href: "/projects" },
  { name: "CONTACT", href: "/contact" },
];

function BrandMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m12 1 9.5 5.5v11L12 23l-9.5-5.5v-11L12 1Z" fill="currentColor" />
      <path d="m12 4 6.8 4-6.8 4-6.8-4 6.8-4Zm0 8v8M5.2 8v8l6.8-4 6.8 4V8" stroke="var(--brand-line, #dedfdd)" strokeWidth="1" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = menuDialog.current;
    const trigger = menuButton.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <header className={`site-header ${pathname === "/" ? "site-header-light" : "site-header-dark"}`}>
        <Link href="/" className="site-brand" aria-label="Dayrent Tjiang home">
          <BrandMark /><span>Dayrent Tjiang</span>
        </Link>
        <div className="site-header-actions">
          <Link href="/contact" className="site-contact">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="8" />
              <ellipse cx="10" cy="10" rx="3.5" ry="8" />
              <path d="M2 10h16M4 5.5h12M4 14.5h12" />
            </svg>
            <span>Let&apos;s Talk</span>
          </Link>
          <button ref={menuButton} onClick={() => setIsOpen(true)} className="site-menu-button" aria-label="Open menu" aria-expanded={isOpen} aria-controls="site-menu">
            <span /><span />
          </button>
        </div>
      </header>
      <dialog ref={menuDialog} id="site-menu" className="site-menu-dialog" aria-label="Main navigation" onCancel={() => setIsOpen(false)}>
        <div className="site-menu-top">
          <Link href="/" onClick={() => setIsOpen(false)} className="site-brand">
            <BrandMark /><span>Dayrent Tjiang</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="site-menu-close" aria-label="Close menu">✕</button>
        </div>
        <div className="site-menu-content">
          <nav aria-label="Main">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} aria-current={pathname === link.href ? "page" : undefined}>
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="site-menu-socials">
            <a href="https://linkedin.com/in/dayrent-tjiang">LINKEDIN</a>
            <a href="https://github.com/dayrentjiang">GITHUB</a>
          </div>
        </div>
      </dialog>
    </>
  );
}
