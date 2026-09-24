"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { socialPosts, socialPreviews, socialProfileUrl } from "@/data/social-content";
import styles from "./SocialContent.module.css";

const posts = socialPosts.length ? socialPosts : socialPreviews;
const preview = socialPosts.length === 0;

function Chevron({ backwards = false }: { backwards?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={backwards ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"} /></svg>;
}

export default function SocialContent() {
  const [active, setActive] = useState(Math.floor(posts.length / 2));
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const selected = posts[active];
  const select = (index: number) => setActive((index + posts.length) % posts.length);
  const motionPaused = paused || hovered || focused;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || motionPaused || posts.length < 2) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.4;
    }, { threshold: 0.4 });
    observer.observe(section);
    const timer = window.setInterval(() => {
      if (visible && !document.hidden && !reducedMotion.matches && !touchStart.current) {
        setActive((current) => (current + 1) % posts.length);
      }
    }, 5000);
    return () => { observer.disconnect(); window.clearInterval(timer); };
  }, [active, motionPaused]);

  return (
    <section
      ref={sectionRef}
      id="content"
      className={styles.section}
      aria-labelledby="content-title"
      data-paused={motionPaused}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <header className={styles.header}>
        <h2 id="content-title">Beyond the build<span>.</span></h2>
        <p>The people, conversations, and everyday moments behind the work.</p>
      </header>

      <div
        className={styles.carousel}
        role="region"
        aria-roledescription="carousel"
        aria-label="Personal moments"
        tabIndex={0}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            select(active + (event.key === "ArrowLeft" ? -1 : 1));
          }
        }}
        onTouchStart={(event) => {
          if ((event.target as HTMLElement).closest("video")) return;
          touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const x = event.changedTouches[0].clientX - start.x;
          const y = event.changedTouches[0].clientY - start.y;
          if (Math.abs(x) > 45 && Math.abs(x) > Math.abs(y)) select(active + (x < 0 ? 1 : -1));
        }}
        onTouchCancel={() => { touchStart.current = null; }}
      >
        {posts.map((post, index) => {
          let offset = (index - active + posts.length) % posts.length;
          if (offset > posts.length / 2) offset -= posts.length;
          const isActive = index === active;
          return (
            <article
              key={post.id}
              className={`${styles.card} ${isActive ? styles.active : ""}`}
              style={{ "--offset": offset } as CSSProperties}
              data-active={isActive}
              data-tone={index % 4}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${posts.length}: ${post.title}`}
            >
              {post.thumbnail ? (
                <Image src={post.thumbnail} alt="" fill sizes="(max-width: 600px) 72vw, 300px" className={styles.image} unoptimized={post.thumbnail.startsWith("https://")} />
              ) : (
                <div className={styles.artwork} aria-hidden="true">
                  <span className={styles.orbit} />
                  <span className={styles.symbol}>{["✳", "↗", "○", "DT"][index % 4]}</span>
                </div>
              )}
              <div className={styles.shade} />
              {preview && <span className={styles.previewBadge}>Layout preview</span>}
              <button className={styles.selectCard} onClick={() => select(index)} tabIndex={-1} aria-label={`Select ${post.title}`} />
              {isActive && post.videoUrl && <video key={post.id} className={styles.video} controls playsInline preload="none" poster={post.thumbnail} src={post.videoUrl} aria-label={post.title} onPlay={() => setPaused(true)} />}
              <div className={styles.caption}>
                <p>{post.topic}</p>
                <h3>{post.title}</h3>
                {isActive && <span className={styles.byline}><span>DT</span>Dayrent Tjiang</span>}
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.navigation}>
        <button className={styles.arrow} onClick={() => select(active - 1)} aria-label="Previous moment"><Chevron backwards /></button>
        <div className={styles.dots} role="group" aria-label="Choose a moment">
          {posts.map((post, index) => <button key={post.id} onClick={() => select(index)} aria-label={`Show ${post.title}`} aria-pressed={active === index}><span /></button>)}
        </div>
        <button className={styles.arrow} onClick={() => select(active + 1)} aria-label="Next moment"><Chevron /></button>
        <button className={`${styles.arrow} ${styles.pause}`} onClick={() => setPaused(!paused)} aria-label={paused ? "Resume carousel" : "Pause carousel"} aria-pressed={paused}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            {paused ? <path d="m8 5 11 7-11 7V5Z" /> : <path d="M7 5h3v14H7zm7 0h3v14h-3z" />}
          </svg>
        </button>
      </div>
      <p className={styles.srOnly} aria-live={motionPaused ? "polite" : "off"} aria-atomic="true">{active + 1} of {posts.length}: {selected.title}</p>
      <div className={styles.footer}>
        {socialProfileUrl ? (
          <a className={styles.cta} href={socialProfileUrl} target="_blank" rel="noopener noreferrer">Follow the journey <span aria-hidden="true">↗</span></a>
        ) : (
          <Link className={styles.cta} href="/contact">Let’s get to know each other <span aria-hidden="true">↗</span></Link>
        )}
        {!preview && selected.permalink && <a className={styles.postLink} href={selected.permalink} target="_blank" rel="noopener noreferrer">See the full story ↗</a>}
      </div>
    </section>
  );
}
