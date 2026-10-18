import styles from './TraceEngineDiagram.module.css';

const searchPoints = [
  [50, 45], [76, 118], [112, 82], [144, 140], [170, 39],
  [205, 107], [238, 64], [268, 147], [304, 92], [332, 42],
  [365, 122], [418, 105], [453, 146],
];

export default function TraceEngineDiagram() {
  return (
    <div className={styles.workflow} aria-label="Geometric solver workflow">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Inverse design workflow</p>
          <h3>From a target to possible settings</h3>
        </div>
        <p className={styles.tools}>Python · NumPy · SciPy</p>
      </div>

      <div className={styles.flow}>
        <section className={styles.side} aria-labelledby="trace-input-title">
          <span className={styles.number}>01 / Input</span>
          <h4 id="trace-input-title">Target outcome</h4>
          <p>Start with the result the design needs to reach.</p>
          <span className={styles.example}>Desired result</span>
        </section>

        <div className={styles.connector} aria-hidden="true" />

        <section className={styles.solver} aria-labelledby="trace-solver-title">
          <div className={styles.solverHeading}>
            <div>
              <span className={styles.number}>02 / Solver</span>
              <h4 id="trace-solver-title">Search and refine</h4>
            </div>
            <span className={styles.visualLabel}>Illustrative search space</span>
          </div>

          <div className={styles.searchField}>
            <svg viewBox="0 0 500 180" aria-hidden="true" focusable="false">
              <defs>
                <pattern id="trace-engine-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M25 0H0V25" fill="none" stroke="#3c5363" strokeWidth="0.7" opacity="0.35" />
                </pattern>
              </defs>
              <rect width="500" height="180" fill="url(#trace-engine-grid)" />
              <path d="M38 152 C100 155 94 82 165 106 S240 152 286 110 S342 72 402 54" className={styles.routeBase} />
              <path d="M38 152 C100 155 94 82 165 106 S240 152 286 110 S342 72 402 54" className={styles.routeMotion} />
              {searchPoints.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3" className={styles.point} />)}
              <circle cx="38" cy="152" r="7" className={styles.startPoint} />
              <circle cx="402" cy="54" r="13" className={styles.targetRing} />
              <circle cx="402" cy="54" r="5" className={styles.targetPoint} />
            </svg>
          </div>

          <div className={styles.steps} aria-label="Solver steps">
            <span>Prepare target</span><span aria-hidden="true">→</span>
            <span>Search candidates</span><span aria-hidden="true">→</span>
            <span>Check constraints</span>
          </div>
          <p className={styles.refine}>Refine the search when a candidate does not fit.</p>
        </section>

        <div className={styles.connector} aria-hidden="true" />

        <section className={styles.side} aria-labelledby="trace-output-title">
          <span className={styles.number}>03 / Output</span>
          <h4 id="trace-output-title">Possible settings</h4>
          <p>Return feasible combinations or a nearby option.</p>
          <span className={styles.example}>Candidate inputs</span>
        </section>
      </div>
    </div>
  );
}
