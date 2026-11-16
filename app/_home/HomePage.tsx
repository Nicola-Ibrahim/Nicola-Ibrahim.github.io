import Link from 'next/link';
import BlackholeCanvas from './BlackholeCanvas';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section id="home" className={styles.hero} aria-labelledby="home-title">
        <div className={styles.canvas} aria-hidden="true">
          <BlackholeCanvas />
        </div>

        <header className={styles.header}>
          <Link href="/" className={styles.brand} aria-label="Nicola Ibrahim home">N / I</Link>
        </header>

        <div className={styles.content}>
          <p className={styles.eyebrow}>SOFTWARE ENGINEER</p>
          <h1 id="home-title" className={styles.title}>Nicola<br /> Ibrahim.</h1>
          <p className={styles.description}>
            I design backend services, develop software platforms, and explore practical applications of AI.
          </p>
          <nav className={styles.actions} aria-label="Explore the portfolio">
            <Link href="/about" className={styles.primaryAction}>Explore portfolio <span aria-hidden="true">↗</span></Link>
          </nav>
          <p className={styles.signature}>DESIGN&nbsp; / &nbsp;ENGINEERING&nbsp; / &nbsp;EXPERIMENTATION</p>
        </div>

      </section>
    </main>
  );
}
