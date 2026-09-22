"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function HeroScene({ children }: { children: ReactNode }) {
  const sceneRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const motion = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
    );
    let frame = 0;
    let visible = true;

    function resetPointer() {
      cancelAnimationFrame(frame);
      scene!.style.setProperty("--pointer-x", "0px");
      scene!.style.setProperty("--pointer-y", "0px");
    }

    function movePointer(event: PointerEvent) {
      if (paused || !motion.matches || !visible || event.pointerType === "touch") return;
      const bounds = scene!.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        scene!.style.setProperty("--pointer-x", `${x * 18}px`);
        scene!.style.setProperty("--pointer-y", `${y * 12}px`);
      });
    }

    function updateVisibility() {
      scene!.dataset.visible = String(visible && !document.hidden);
      if (!visible || document.hidden) resetPointer();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateVisibility();
    });

    observer.observe(scene);
    scene.addEventListener("pointermove", movePointer);
    scene.addEventListener("pointerleave", resetPointer);
    motion.addEventListener("change", resetPointer);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      resetPointer();
      observer.disconnect();
      scene.removeEventListener("pointermove", movePointer);
      scene.removeEventListener("pointerleave", resetPointer);
      motion.removeEventListener("change", resetPointer);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [paused]);

  return (
    <section
      ref={sceneRef}
      className="portrait-hero"
      aria-labelledby="hero-title"
      data-motion={paused ? "paused" : "playing"}
    >
      {children}
      <button
        type="button"
        className="hero-motion-toggle"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "Resume hero animation" : "Pause hero animation"}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
          {paused ? <path d="m5 3 8 5-8 5Z" /> : <path d="M4 3h3v10H4zm5 0h3v10H9z" />}
        </svg>
        {paused ? "Resume motion" : "Pause motion"}
      </button>
    </section>
  );
}
