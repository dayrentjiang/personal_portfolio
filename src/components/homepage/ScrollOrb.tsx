"use client";

import { useEffect, useRef } from "react";
import { MODE_FRAMES, resolvePreset, type OrbFrame } from "thinking-orbs/engine";
import styles from "./Introduction.module.css";

const moveCount = 14;
const stages = ["working", "connecting", "weaving", "solving"] as const;
const presets = stages.map((state) => resolvePreset(state, 64));
const gatheringEnd = 0.35;

function scatteredFrame(progress: number, size: number): OrbFrame {
  const frame = stageFrame(0, 0, size);
  const gather = progress ** 2 * (3 - 2 * progress);
  return {
    lines: [],
    dots: frame.dots.map((dot) => {
      // Fixed seeds keep each particle on the same path when scroll reverses.
      const seed = dot.x / size * 127.1 + dot.y / size * 311.7 + dot.z * 74.7;
      const random = (offset: number) => {
        const value = Math.sin(seed + offset) * 43758.5453;
        return value - Math.floor(value);
      };
      const x = size * (0.1 + random(0) * 0.8);
      const y = size * (0.12 + random(19.3) * 0.76);
      return {
        ...dot,
        x: x + (dot.x - x) * gather,
        y: y + (dot.y - y) * gather,
        r: Math.max(dot.r, 1 + random(4.1)) * (1 - gather) + dot.r * gather,
        white: Math.min(dot.white, 0.38) * (1 - gather) + dot.white * gather,
        a: Math.max(dot.a ?? 1, 0.55) * (1 - gather) + (dot.a ?? 1) * gather,
      };
    }),
  };
}

function stageFrame(index: number, progress: number, size: number) {
  const preset = presets[index];
  const solving = stages[index] === "solving";
  // The solver's second half-cycle returns every band to its completed position.
  const time = solving ? moveCount * 0.42 * (1 + progress) : (1 + progress * 3) * preset.speed;
  const options = solving
    ? { ...preset.opts, moveCount, latRings: 23, lonDensity: 52, rBase: 0.6, rDepth: 1.45 }
    : preset.opts;
  return MODE_FRAMES[preset.mode](size, time, options);
}

function warmInk(white: number, alpha = 1) {
  const lightness = Math.max(0, Math.min(1, white));
  return `rgba(${Math.round(88 + lightness * 154)}, ${Math.round(50 + lightness * 181)}, ${Math.round(32 + lightness * 191)}, ${alpha})`;
}

function paintOrb(context: CanvasRenderingContext2D, frame: OrbFrame, opacity: number) {
  context.globalAlpha = opacity;
  for (const line of frame.lines) {
    context.strokeStyle = warmInk(line.white, line.a);
    context.lineWidth = line.w;
    context.beginPath();
    context.moveTo(line.x1, line.y1);
    context.lineTo(line.x2, line.y2);
    context.stroke();
  }
  for (const dot of frame.dots) {
    context.fillStyle = warmInk(dot.white, dot.a);
    context.beginPath();
    context.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 1;
}

export default function ScrollOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const section = canvas?.closest("section");
    if (!canvas || !context || !section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    function draw() {
      frameId = 0;
      if (!canvas || !context || !section || document.hidden) return;

      const rect = canvas.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Drive arrival from the section, not the lower-positioned canvas.
      // Finish after the section has travelled another fifth of the viewport.
      const sectionTop = section.getBoundingClientRect().top;
      const progress = reducedMotion.matches
        ? 1
        : Math.max(0, Math.min(1, (viewport - sectionTop) / (viewport * 1.2)));
      canvas.dataset.progress = progress.toFixed(3);
      const sequenceProgress = Math.max(0, (progress - gatheringEnd) / (1 - gatheringEnd));
      const stageIndex = Math.min(stages.length - 1, Math.floor(sequenceProgress * stages.length));
      const stageProgress = sequenceProgress * stages.length - stageIndex;
      canvas.dataset.state = progress < gatheringEnd ? "scattered" : stages[stageIndex];
      if (rect.bottom < 0 || rect.top > viewport || !rect.width) return;

      const size = rect.width;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const pixels = Math.round(size * pixelRatio);
      if (canvas.width !== pixels || canvas.height !== pixels) {
        canvas.width = pixels;
        canvas.height = pixels;
      }
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, size, size);

      if (progress < gatheringEnd) {
        paintOrb(context, scatteredFrame(progress / gatheringEnd, size), 1);
        return;
      }

      // Crossfade near each boundary so the actual library states never pop.
      const blend = stageIndex < stages.length - 1
        ? Math.max(0, (stageProgress - 0.72) / 0.28)
        : 0;
      const easedBlend = blend * blend * (3 - 2 * blend);
      paintOrb(context, stageFrame(stageIndex, stageProgress, size), 1 - easedBlend);
      if (easedBlend > 0) {
        paintOrb(context, stageFrame(stageIndex + 1, 0, size), easedBlend);
      }
    }

    function scheduleDraw() {
      if (!frameId) frameId = window.requestAnimationFrame(draw);
    }

    const resizeObserver = new ResizeObserver(scheduleDraw);
    resizeObserver.observe(canvas);
    window.addEventListener("scroll", scheduleDraw, { passive: true });
    window.addEventListener("resize", scheduleDraw);
    document.addEventListener("visibilitychange", scheduleDraw);
    reducedMotion.addEventListener("change", scheduleDraw);
    scheduleDraw();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleDraw);
      window.removeEventListener("resize", scheduleDraw);
      document.removeEventListener("visibilitychange", scheduleDraw);
      reducedMotion.removeEventListener("change", scheduleDraw);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.orb} aria-hidden="true" />;
}
