import ScrollOrb from "./ScrollOrb";
import StackMarquee from "./StackMarquee";
import PortfolioLink from "./PortfolioLink";
import styles from "./Introduction.module.css";

export default function Introduction() {
  return (
    <section id="introduction" className={styles.section} aria-labelledby="introduction-title">
      <div className={styles.backdrop} aria-hidden="true" />
      <StackMarquee />
      <div className={styles.content}>
        <div className={styles.overview}>
          <h2 id="introduction-title" className={styles.heading}>
            I turn complex problems
            <br className={styles.linebreak} /> into solutions that scale.
          </h2>
          <p className={styles.description}>
            I build applications, AI tools, and automated workflows that help
            businesses and teams turn ambitious ideas into everyday progress.
          </p>
          <ul className={styles.capabilities} aria-label="What I build">
            <li>Application Development</li>
            <li>AI Apps &amp; Workflows</li>
            <li>Automation</li>
          </ul>
          <ScrollOrb />
        </div>
      </div>
      <PortfolioLink />
    </section>
  );
}
