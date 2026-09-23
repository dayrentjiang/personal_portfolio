"use client";

import styles from "./Introduction.module.css";

export default function PortfolioLink() {
  return (
    <a
      className={styles.portfolioLink}
      href="#portfolio"
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const portfolio = document.getElementById("portfolio");
        if (!portfolio) return;
        event.preventDefault();
        portfolio.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        });
      }}
    >
      Explore my portfolio
      <span className={styles.linkArrow} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 5 6 6 6-6M6 12l6 6 6-6" />
        </svg>
      </span>
    </a>
  );
}
