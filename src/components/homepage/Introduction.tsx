import ScrollOrb from "./ScrollOrb";
import CloudBackground from "./CloudBackground";
import styles from "./Introduction.module.css";

export default function Introduction() {
  return (
    <section id="introduction" className={styles.section} aria-labelledby="introduction-title">
      <CloudBackground />
      <div className={styles.content}>
        <h2 id="introduction-title" className={styles.heading}>
          I turn complex problems
          <br className={styles.linebreak} /> into solutions that scale.
        </h2>
        <p className={styles.description}>
          Dayrent Tjiang is a software engineer helping businesses, technology
          companies, and teams work more efficiently through practical software,
          AI tools, and better workflows.
        </p>
        <ScrollOrb />
      </div>
    </section>
  );
}
