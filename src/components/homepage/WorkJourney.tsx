"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import Image from "next/image";
import { journeyStops } from "@/data/work-journey";
import JourneyScene from "./JourneyScene";
import { journeyProgress, journeyStopOffset, journeyTiming } from "./journey-motion";
import styles from "./WorkJourney.module.css";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export default function WorkJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia(motionQuery).matches, () => false);
  const stop = journeyStops[active];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let visible = false;
    const update = () => { stage.dataset.windActive = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(stage);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;
      const rect = section.getBoundingClientRect();
      stage.style.setProperty("--journey-top", `${Math.min(0, window.innerHeight - stage.offsetHeight)}px`);
      const timing = journeyTiming(journeyStops.length, window.innerHeight);
      section.style.setProperty("--journey-height", `${stage.offsetHeight + timing.total}px`);
      const progress = journeyProgress(-rect.top, journeyStops.length, window.innerHeight);
      progressRef.current = progress;
      section.style.setProperty("--journey-progress", String(progress));
      setActive(Math.min(journeyStops.length - 1, Math.round(progress * (journeyStops.length - 1))));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    if (stageRef.current) observer.observe(stageRef.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reducedMotion]);

  const goTo = useCallback((index: number) => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const progress = index / Math.max(1, journeyStops.length - 1);
    if (window.matchMedia(motionQuery).matches) {
      progressRef.current = progress;
      setActive(index);
      return;
    }
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY + journeyStopOffset(index, journeyStops.length, window.innerHeight),
      behavior: "smooth",
    });
  }, []);

  return (
    <section ref={sectionRef} id="journey" className={styles.section} aria-labelledby="journey-title" style={{ "--journey-stop-count": journeyStops.length } as CSSProperties}>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.wind} aria-hidden="true">
          <div className={styles.windWash} />
          <div className={`${styles.windWash} ${styles.windWashSecond}`} />
          <div className={`${styles.windWash} ${styles.windWashThird}`} />
          <div className={`${styles.windWash} ${styles.windWashTop}`} />
          <div className={`${styles.windWash} ${styles.windWashSecond} ${styles.windWashBottom}`} />
        </div>
        <header className={styles.header}>
          <div>
            <h2 id="journey-title">The road so far<span>.</span></h2>
            <p>From learning the foundations to building things people rely on.</p>
          </div>
          <a href="#journey-end" className={styles.skip}>Skip journey <span aria-hidden="true">↓</span></a>
        </header>

        <div className={styles.layout}>
          <div className={styles.world}>
            <JourneyScene progressRef={progressRef} active={active} onSelect={goTo} />
            <div className={styles.sceneNote}><span aria-hidden="true" /> {reducedMotion ? "Choose a stop to explore." : "Scroll to drive. Choose a stop to explore."}</div>
          </div>
          <div className={styles.details} aria-live="polite" aria-atomic="true">
            <article key={stop.id} className={styles.detailCard}>
              <div className={styles.cardHeader}>
                <div className={styles.companyMark} data-brand={stop.id} data-has-logo={Boolean(stop.logo)} aria-hidden="true">
                  {stop.logo ? <Image className={styles.brandLogo} src={stop.logo} alt="" width={stop.id === "monash" ? 96 : 42} height={42} /> : stop.mark}
                </div>
                <div className={styles.detailMeta}><span>{stop.type}</span><span>{stop.dates}</span></div>
              </div>
              <h3>{stop.name}</h3>
              <p className={styles.role}>{stop.role}</p>
              <p className={styles.description}>{stop.description}</p>
              <div className={styles.highlight}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6-4.4-4.3 6.1-.9Z" /></svg>
                <p>{stop.highlight}</p>
              </div>
              <ul className={styles.tools}>{stop.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
            </article>
          </div>
        </div>

      </div>
      <div id="journey-end" className={styles.end} />
    </section>
  );
}
