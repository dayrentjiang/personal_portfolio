"use client";

import { useEffect, useRef } from "react";
import type { GlobeEffect } from "vanta/dist/vanta.globe.min";
import styles from "./Projects.module.css";

export default function GlobeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let effect: GlobeEffect | undefined;
    let generation = 0;
    let visible = false;

    function destroy() {
      const renderer = effect?.renderer;
      effect?.destroy();
      renderer?.dispose();
      effect = undefined;
    }

    async function initialize() {
      const current = ++generation;
      destroy();
      if (!container) return;
      container.dataset.globe = "fallback";
      if (reducedMotion.matches || !visible || document.hidden) return;

      try {
        const [THREE, { default: GLOBE }] = await Promise.all([
          import("three"),
          import("vanta/dist/vanta.globe.min"),
        ]);
        if (current !== generation) return;

        effect = GLOBE({
          el: container,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: Math.max(1, window.devicePixelRatio || 1),
          scaleMobile: 2,
          backgroundColor: 0xf3f2ef,
          color: 0x9cbbc9,
          color2: 0x7998ad,
          size: 0.95,
          points: 7,
          maxDistance: 20,
          spacing: 16,
          showDots: false,
        });
        container.dataset.globe = "ready";
      } catch {
        destroy();
        // Keep the shared neutral surface when WebGL is unavailable.
        container.dataset.globe = "fallback";
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      void initialize();
    }, { rootMargin: "200px" });
    observer.observe(container);
    reducedMotion.addEventListener("change", initialize);
    document.addEventListener("visibilitychange", initialize);

    return () => {
      generation++;
      observer.disconnect();
      reducedMotion.removeEventListener("change", initialize);
      document.removeEventListener("visibilitychange", initialize);
      destroy();
    };
  }, []);

  return <div className={styles.backdrop} aria-hidden="true"><div ref={containerRef} className={styles.globe} /></div>;
}
