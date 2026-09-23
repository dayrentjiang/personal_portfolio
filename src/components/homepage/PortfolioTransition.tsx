"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./PortfolioTransition.module.css";

export default function PortfolioTransition({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const introduction = container?.querySelector<HTMLElement>("#introduction");
    if (!container || !introduction) return;

    function measure() {
      if (!container || !introduction) return;
      // Taller screens of content scroll fully into view before their bottom pins.
      const top = Math.min(0, window.innerHeight - introduction.offsetHeight);
      container.style.setProperty("--introduction-top", `${top}px`);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(introduction);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return <div ref={containerRef} className={styles.stack}>{children}</div>;
}
