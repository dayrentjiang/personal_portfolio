"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./Services.module.css";

const capabilities = [
  {
    id: "applications", title: "Applications",
    description: "From an idea to something people use. Web, mobile, desktop, and internal tools built around the way your business works.",
    examples: "Customer platforms · Business tools · Connected products",
    caption: "One product. Every screen.",
  },
  {
    id: "ai", title: "AI apps & workflows",
    description: "Make your knowledge useful and your day a little easier. AI assistants and workflows that help your team find answers and get things done.",
    examples: "Knowledge assistants · Document tools · AI workflows",
    caption: "Your knowledge, put to work.",
  },
  {
    id: "automation", title: "Automation & integrations",
    description: "Let your systems do the repetitive work. Connect the tools you already use and keep information moving without the manual handoffs.",
    examples: "System integrations · Reporting · Everyday operations",
    caption: "Less busywork. More progress.",
  },
] as const;

type Capability = typeof capabilities[number]["id"];

function CapabilityIcon({ kind }: { kind: Capability }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "applications" ? <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M9 9v11" /></>
      : kind === "ai" ? <><path d="M6 4h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9l-6 3V7a3 3 0 0 1 3-3Z" /><path d="M8 9h9M8 13h6" /></>
        : <><rect x="2" y="9" width="6" height="6" rx="2" /><rect x="16" y="2" width="6" height="6" rx="2" /><rect x="16" y="16" width="6" height="6" rx="2" /><path d="M8 12h3a2 2 0 0 0 2-2V7a2 2 0 0 1 2-2h1M11 12a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1" /></>}
  </svg>;
}

function ApplicationPreview() {
  return <div className={styles.applicationArt}>
    <div className={styles.appWindow}>
      <div className={styles.windowBar}><span className={styles.windowDots}><i /><i /><i /></span><span>Workspace</span><span className={styles.avatar}>A</span></div>
      <div className={styles.appBody}>
        <div className={styles.appSidebar}><CapabilityIcon kind="applications" /><span /><span /><span /><span /></div>
        <div className={styles.dashboard}>
          <div className={styles.eyebrow}>YOUR WORK, TOGETHER</div><strong>Good morning, Alex<span>.</span></strong>
          <div className={styles.stats}><div><small>Projects</small><b>06</b></div><div><small>Tasks complete</small><b>24 <em>↗</em></b></div></div>
          <div className={styles.chart}><span>This week</span><div>{[34, 50, 43, 72, 60, 88, 78].map((height, i) => <i key={i} style={{ "--bar-height": `${height}%`, "--delay": `${i * .12}s` } as CSSProperties} />)}</div></div>
          <div className={styles.taskRow}><span className={styles.taskDot} />Product launch<span className={styles.status}>On track</span></div>
        </div>
      </div>
    </div>
    <div className={styles.phone}><div className={styles.phoneNotch} /><small>YOUR WORKSPACE</small><strong>Today<span>.</span></strong><div className={styles.phoneCard}><span>✓</span><b>Design review</b><small>Ready to share</small></div><div className={styles.phoneCard}><span>↗</span><b>Team sync</b><small>Everyone in the loop</small></div><div className={styles.phoneNav}><i /><i /><i /></div></div>
  </div>;
}

function AiPreview() {
  return <div className={styles.aiArt}>
    <div className={styles.assistantWindow}>
      <div className={styles.assistantHeader}><span className={styles.assistantIcon}><CapabilityIcon kind="ai" /></span><div><strong>Knowledge assistant</strong><small>Connected to your workspace</small></div><i /></div>
      <div className={styles.question}>What needs my attention today?</div>
      <div className={styles.answer}>
        <span className={styles.answerLabel}><CapabilityIcon kind="ai" /> Here&apos;s your overview</span>
        <p>Three things worth a look.</p>
        {[['01', 'A contract is ready for review'], ['02', 'Two project tasks are due today'], ['03', 'Your customer follow-up is drafted']].map(([number, title], i) => <div className={styles.answerRow} key={number} style={{ "--delay": `${.6 + i * .55}s` } as CSSProperties}><span>{number}</span>{title}<i>↗</i></div>)}
        <div className={styles.sources}><span>Based on your</span><b>Documents</b><b>Tasks</b></div>
      </div>
      <div className={styles.composer}><span>Ask a follow-up…</span><span>↑</span></div>
    </div>
  </div>;
}

function AutomationPreview() {
  return <div className={styles.automationArt}>
    <div className={styles.workflowHeading}><span className={styles.workflowIcon}><CapabilityIcon kind="automation" /></span><div><strong>A little less manual.</strong><small>New enquiry → ready for your team</small></div></div>
    <div className={styles.workflow}>
      {[
        { icon: '↙', title: 'Enquiry received', detail: 'Your website form', tag: 'Trigger' },
        { icon: '⇄', title: 'Contact updated', detail: 'Synced with your CRM', tag: 'Sync' },
        { icon: '✓', title: 'Team notified', detail: 'The right people, in the loop', tag: 'Done' },
      ].map((step, i) => <div className={styles.workflowStep} key={step.title} style={{ "--delay": `${i * 1.1}s` } as CSSProperties}><div className={styles.workflowNode}><span className={styles.nodeIcon}>{step.icon}</span><div><strong>{step.title}</strong><small>{step.detail}</small></div><span className={styles.nodeTag}>{step.tag}</span></div>{i < 2 && <div className={styles.connector}><i /></div>}</div>)}
    </div>
    <div className={styles.workflowResult}><span>✓</span> Connected from start to finish</div>
  </div>;
}

export default function Services() {
  const [active, setActive] = useState<Capability>("applications");
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        section.style.removeProperty("--services-height");
        stage.style.removeProperty("--services-top");
        return;
      }
      const hold = Math.max(420, window.innerHeight * .85);
      const overhang = Math.max(0, stage.offsetHeight - window.innerHeight);
      stage.style.setProperty("--services-top", `${-overhang}px`);
      section.style.setProperty("--services-height", `${stage.offsetHeight + hold * capabilities.length}px`);
      const offset = Math.max(0, -section.getBoundingClientRect().top - overhang);
      const index = Math.min(capabilities.length - 1, Math.floor(offset / hold));
      setActive(capabilities[index].id);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  const selectCapability = (id: Capability) => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(id);
      return;
    }
    const index = capabilities.findIndex(capability => capability.id === id);
    const hold = Math.max(420, window.innerHeight * .85);
    const overhang = Math.max(0, stage.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY + overhang + (index + .5) * hold,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const section = stageRef.current;
    if (!section) return;
    let visible = false;
    const update = () => { section.dataset.running = String(visible && !document.hidden && !paused); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(section);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, [paused]);

  return <section ref={sectionRef} id="services" className={styles.section} data-paused={paused} aria-labelledby="services-title">
    <div ref={stageRef} className={styles.inner}>
      <header className={styles.heading}><h2 id="services-title">What I can help you with<span>.</span></h2><p>Useful software, built around your ideas and the way you work.</p></header>
      <div className={styles.explorer}>
        <div className={styles.options}>
          {capabilities.map(capability => {
            const selected = active === capability.id;
            return <div key={capability.id} className={styles.option} data-active={selected}>
              <h3><button id={`capability-${capability.id}`} aria-expanded={selected} aria-controls={`capability-panel-${capability.id}`} onClick={() => selectCapability(capability.id)}><span className={styles.optionIcon}><CapabilityIcon kind={capability.id} /></span><span>{capability.title}</span><span className={styles.toggle} aria-hidden="true">{selected ? "−" : "+"}</span></button></h3>
              <div id={`capability-panel-${capability.id}`} role="region" aria-labelledby={`capability-${capability.id}`} hidden={!selected}>
                {selected && <>
                  <div className={styles.description}><p>{capability.description}</p><p className={styles.examples}>{capability.examples}</p><Link href="/contact">Let&apos;s talk about your idea <span aria-hidden="true">↗</span></Link></div>
                  <figure className={styles.preview} data-kind={capability.id}>
                    <div className={styles.previewTop}><button className={styles.motionToggle} onClick={() => setPaused(!paused)} aria-label={paused ? "Resume preview animation" : "Pause preview animation"} aria-pressed={paused}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button></div>
                    <div className={styles.art} role="img" aria-label={capability.id === "applications" ? "Illustrative application dashboard with a companion mobile app" : capability.id === "ai" ? "Illustrative AI assistant summarizing documents and tasks" : "Illustrative workflow connecting a website enquiry, CRM update, and team notification"}><div aria-hidden="true">{capability.id === "applications" ? <ApplicationPreview /> : capability.id === "ai" ? <AiPreview /> : <AutomationPreview />}</div></div>
                    <figcaption><strong>{capability.caption}</strong><span>Illustrative preview</span></figcaption>
                  </figure>
                </>}
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  </section>;
}
