"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { journeyStops } from "@/data/work-journey";
import styles from "./WorkJourney.module.css";

interface Props {
  progressRef: RefObject<number>;
  active: number;
  onSelect: (index: number) => void;
}

export default function JourneyScene({ progressRef, active, onSelect }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [arrived, setArrived] = useState(false);
  const fallbackPoints = journeyStops.map((_, index) => ({ x: 65 + index * 192.5, y: index % 2 ? 110 : 300 }));
  const fallbackStart = Math.max(0, Math.min((journeyStops.length - 5) * 192.5, active * 192.5 - 385));
  const fallbackPath = fallbackPoints.map((point, index) => {
    if (!index) return `M${point.x} ${point.y}`;
    const previous = fallbackPoints[index - 1];
    const middle = (previous.x + point.x) / 2;
    return `C${middle} ${previous.y} ${middle} ${point.y} ${point.x} ${point.y}`;
  }).join(" ") + `h100`;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let started = false;
    let visible = false;
    let scene: { dispose: () => void; setVisible: (visible: boolean) => void } | undefined;
    const observer = new IntersectionObserver(async ([entry]) => {
      visible = entry.isIntersecting;
      if (entry.intersectionRatio >= 0.6) setArrived(true);
      scene?.setVisible(visible);
      if (!entry.isIntersecting || started) return;
      started = true;
      try {
        const { createJourneyScene } = await import("./journey-scene");
        if (cancelled) return;
        scene = createJourneyScene(host, progressRef, markersRef);
        scene.setVisible(visible);
        setReady(true);
      } catch {
        // The illustrated route and destination controls also work without WebGL.
      }
    }, { threshold: [0, 0.6] });
    observer.observe(host);
    return () => { cancelled = true; observer.disconnect(); scene?.dispose(); };
  }, [progressRef]);

  return (
    <div className={styles.scene} data-ready={ready} data-arrived={arrived}>
      <svg className={styles.fallback} viewBox={`${fallbackStart} 0 900 440`} preserveAspectRatio="none" aria-hidden="true">
        <path d={fallbackPath} fill="none" stroke="#cad4d1" strokeWidth="32" strokeLinecap="round" />
        <path d={fallbackPath} fill="none" stroke="#f7f8f5" strokeWidth="2" strokeDasharray="7 12" />
        <text x={fallbackStart + 450} y="405" textAnchor="middle" fill="#657176" fontSize="13">Choose a destination to explore the journey</text>
      </svg>
      <div ref={hostRef} className={styles.canvasHost} aria-hidden="true" />
      <div className={styles.markers}>
        {journeyStops.map((stop, index) => (
          <button
            key={stop.id}
            ref={element => { markersRef.current[index] = element; }}
            className={`${styles.marker} ${index === 0 ? styles.monashMarker : ""}`}
            style={ready ? undefined : {
              left: `${(fallbackPoints[index].x - fallbackStart) / 9}%`,
              top: `${fallbackPoints[index].y / 4.4}%`,
              visibility: fallbackPoints[index].x < fallbackStart || fallbackPoints[index].x > fallbackStart + 900 ? "hidden" : "visible",
            }}
            data-active={index === active}
            aria-label={`Explore ${stop.name}`}
            onClick={() => onSelect(index)}
          >
            <span className={styles.markerTile} data-brand={stop.id} data-has-logo={Boolean(stop.logo)}>
              {stop.logo ? <Image className={styles.brandLogo} src={stop.logo} alt="" width={stop.id === "monash" ? 96 : 42} height={42} /> : stop.mark}
            </span>
            <span className={styles.markerName}>{stop.shortName}</span>
            <span className={styles.markerStem} />
          </button>
        ))}
      </div>
    </div>
  );
}
