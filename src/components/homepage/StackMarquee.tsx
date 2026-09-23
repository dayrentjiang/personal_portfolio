"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./StackMarquee.module.css";

const technologies = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Python", icon: "python" },
  { name: "Flutter", icon: "flutter" },
  { name: "Vue.js", icon: "vuedotjs" },
  { name: "FastAPI", icon: "fastapi" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Docker", icon: "docker" },
];

export default function StackMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <div className={styles.banner} role="group" aria-label="Tools I work with">
      <div className={styles.label}>
        <span>Tools I work with</span>
        <button
          type="button"
          className={styles.pause}
          aria-label={paused ? "Resume scrolling logos" : "Pause scrolling logos"}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            {paused ? <path d="m5 3 8 5-8 5V3Z" /> : <path d="M4 3h3v10H4zm5 0h3v10H9z" />}
          </svg>
        </button>
      </div>
      <div className={styles.window}>
        <div className={styles.track} data-paused={paused}>
          {[false, true].map((duplicate) => (
            <ul className={styles.logos} key={String(duplicate)} aria-hidden={duplicate || undefined}>
              {technologies.map(({ name, icon }) => (
                <li className={styles.logo} key={icon}>
                  <Image src={`/stack-icons/${icon}.svg`} alt="" width={28} height={28} loading="eager" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
