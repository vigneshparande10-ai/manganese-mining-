import React from 'react';
import styles from './ReserveIntelligence.module.css';

export default function ReserveIntelligence() {
  return (
    <div className="view active animate-fade-in" id="reserve">
      <div className="page-title">
        <div>
          <span className="eyebrow" style={{ color: 'var(--blue)' }}>▤ Geological model intelligence</span>
          <h1>Reserve &amp; Geological Intelligence</h1>
          <p>Block-model confidence and grade continuity for Balaghat OP-4.</p>
        </div>
        <div className="context">
          <i>●</i> MODEL UPDATED 11:48 IST
        </div>
      </div>
      <div className={styles.reserveLayout}>
        <article className="card">
          <div className="card-head">
            <div>
              <h2>OP-4 block model</h2>
              <p>Grade distribution by bench · drill model v18.2</p>
            </div>
            <span className="eyebrow">North ↑</span>
          </div>
          <div className={styles.orebody}>
            <svg viewBox="0 0 650 420">
              <defs>
                <linearGradient id="ore" x1="0" x2="1">
                  <stop stopColor="#0e6c99" />
                  <stop offset=".48" stopColor="#e18d1b" />
                  <stop offset="1" stopColor="#cf493b" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>
              <path d="M60 30 L420 15 L590 95 L560 350 L330 400 L75 320Z" fill="#193c52" stroke="#63879a" strokeWidth="2" />
              <g opacity=".95">
                <path d="M75 95 L500 38 L560 92 L120 166Z" fill="#0e91c1" />
                <path d="M120 166 L560 92 L555 150 L90 230Z" fill="#1a7ca6" />
                <path d="M90 230 L555 150 L550 215 L85 290Z" fill="url(#ore)" />
                <path d="M85 290 L550 215 L548 278 L126 355Z" fill="#df8b19" />
                <path d="M126 355 L548 278 L558 340 L335 390Z" fill="#c65339" />
              </g>
              <g stroke="#d7f0fb" strokeOpacity=".5">
                <path d="M195 57 L177 347" />
                <path d="M330 34 L315 392" />
                <path d="M462 47 L454 365" />
              </g>
              <g fill="#fff">
                <circle cx="195" cy="102" r="4" />
                <circle cx="330" cy="153" r="4" />
                <circle cx="462" cy="210" r="4" />
              </g>
              <text x="18" y="402" fill="#bed9e7" fontFamily="monospace" fontSize="10">BENCH 1440m</text>
            </svg>
          </div>
          <div className={styles.layers}>
            <span><i className="site-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#0e91c1', marginRight: '5px' }}></i> High grade &gt;44%</span>
            <span><i className="site-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#e18d1b', marginRight: '5px' }}></i> Medium 35–44%</span>
            <span><i className="site-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#cf493b', marginRight: '5px' }}></i> Low &lt;35%</span>
          </div>
        </article>
        <aside className="card">
          <div className="card-head">
            <div>
              <h2>Reserve quality</h2>
              <p>Recoverable reserve model</p>
            </div>
          </div>
          <div className={styles.modelStat}>
            <span className="eyebrow">Insitu manganese</span>
            <div className="metric-val mono" style={{ fontSize: '25px', marginTop: '5px', fontWeight: '600' }}>
              8.42 <small>Mt</small>
            </div>
            <small className="muted">+0.18 Mt vs. last reconciliation</small>
          </div>
          <div className={styles.modelStat}>
            <span className="eyebrow">Average grade</span>
            <div className="metric-val mono" style={{ fontSize: '25px', marginTop: '5px', fontWeight: '600' }}>
              41.8<small>% Mn</small>
            </div>
            <div className={styles.gradeBar}>
              <i></i><i></i><i></i>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', font: '9px var(--mono)', color: 'var(--muted)' }}>
              <span>High 38%</span>
              <span>Medium 43%</span>
              <span>Low 19%</span>
            </div>
          </div>
          <div className={styles.modelStat}>
            <span className="eyebrow">Model confidence</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
              <b className="mono" style={{ fontSize: '23px' }}>94.2%</b>
              <div className={styles.progress} style={{ flex: 1 }}>
                <i style={{ width: '94%' }}></i>
              </div>
            </div>
            <small className="muted">218 drillholes · 12,480 assays</small>
          </div>
          <div className={styles.drill}>
            <table className="table">
              <thead>
                <tr><th>Hole</th><th>Depth</th><th>Mn</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mono">BH-2417</td>
                  <td className="mono">122m</td>
                  <td className="mono">46.3%</td>
                </tr>
                <tr>
                  <td className="mono">BH-2418</td>
                  <td className="mono">138m</td>
                  <td className="mono">43.8%</td>
                </tr>
                <tr>
                  <td className="mono">BH-2419</td>
                  <td className="mono">96m</td>
                  <td className="mono">39.1%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </div>
  );
}
