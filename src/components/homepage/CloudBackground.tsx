"use client";

import { useEffect, useRef } from "react";
import type { CloudsEffect } from "vanta/dist/vanta.clouds2.min";
import styles from "./Introduction.module.css";

export default function CloudBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let effect: CloudsEffect | undefined;
    let generation = 0;

    function destroy() {
      const renderer = effect?.renderer;
      effect?.uniforms?.iTex?.value.dispose();
      effect?.destroy();
      renderer?.dispose();
      effect = undefined;
    }

    async function initialize() {
      const current = ++generation;
      destroy();
      if (!container) return;
      container.dataset.clouds = "fallback";
      if (reducedMotion.matches) return;

      try {
        const [THREE, { default: CLOUDS2 }] = await Promise.all([
          import("three"),
          import("vanta/dist/vanta.clouds2.min"),
        ]);
        if (current !== generation) return;

        effect = CLOUDS2({
          el: container,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: Math.max(1, window.devicePixelRatio || 1),
          scaleMobile: 2,
          texturePath: "/vanta-noise.png",
          backgroundColor: 0xf6f1eb,
          skyColor: 0xe6d8ca,
          cloudColor: 0x9f8e80,
          lightColor: 0xfff9ef,
          speed: 0.35,
        });
        container.dataset.clouds = "ready";
      } catch {
        // The warm CSS background remains visible if WebGL is unavailable.
        destroy();
        container.dataset.clouds = "fallback";
      }
    }

    void initialize();
    reducedMotion.addEventListener("change", initialize);
    return () => {
      generation++;
      reducedMotion.removeEventListener("change", initialize);
      destroy();
    };
  }, []);

  return <div ref={containerRef} className={styles.clouds} aria-hidden="true" />;
}
