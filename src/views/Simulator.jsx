import React, { useState, useEffect } from 'react';
import styles from './Simulator.module.css';

export default function Simulator() {
  const [trucks, setTrucks] = useState(3);
  const [advance, setAdvance] = useState(8);
  const [blend, setBlend] = useState(25);
  const [defer, setDefer] = useState(12);

  const [metrics, setMetrics] = useState({ output: 0, dispatch: 0, grade: 0, confidence: 0 });

  useEffect(() => {
    const gain = (trucks * 2450) + (advance * 220) + (blend * 42) + (defer * 110);
    const output = 128500 + gain;
    const dispatch = (88 + trucks * 1.4 + advance * 0.28).toFixed(1);
    const grade = (40.9 + blend * 0.064).toFixed(1);
    const confidence = Math.min(95, 75 + trucks * 2 + advance * 0.35 + blend * 0.08).toFixed(0);
    
    setMetrics({ output, dispatch, grade, confidence });
  }, [trucks, advance, blend, defer]);

  const notify = (msg) => window.dispatchEvent(new CustomEvent('notify', { detail: msg }));

  return (
    <div className="view active animate-fade-in" id="simulator">
      <div className="page-title">
        <div>
          <span className="eyebrow" style={{ color: 'var(--orange)' }}>⌁ Management what-if environment</span>
          <h1>Recovery Scenario Simulator</h1>
          <p>Test the operational effect of dispatch, access and blending adjustments.</p>
        </div>
        <div className="context">
          <i>●</i> SCENARIO UNSAVED
        </div>
      </div>
      
      <div className={styles.simLayout}>
        <aside className={`card ${styles.sliders}`}>
          <h2 style={{ fontSize: '14px', margin: '0' }}>Control variables</h2>
          <p className="muted" style={{ fontSize: '11px' }}>Changes recalculate the expected production outcome.</p>
          
          <div className={styles.sliderRow}>
            <label>Haul units reassigned <output>{trucks} units</output></label>
            <input type="range" min="0" max="6" value={trucks} onChange={e => setTrucks(Number(e.target.value))} />
          </div>
          <div className={styles.sliderRow}>
            <label>East-cut sequence advance <output>{advance} hours</output></label>
            <input type="range" min="0" max="18" value={advance} onChange={e => setAdvance(Number(e.target.value))} />
          </div>
          <div className={styles.sliderRow}>
            <label>Stockpile S-3 blend share <output>{blend}%</output></label>
            <input type="range" min="0" max="50" value={blend} onChange={e => setBlend(Number(e.target.value))} />
          </div>
          <div className={styles.sliderRow}>
            <label>Maintenance deferral <output>{defer} hours</output></label>
            <input type="range" min="0" max="18" value={defer} onChange={e => setDefer(Number(e.target.value))} />
          </div>
          
          <button className="btn" style={{ width: '100%', marginTop: '9px' }} onClick={() => notify('Scenario saved as REC-2409')}>Save scenario</button>
        </aside>

        <article className={`card ${styles.scenario}`}>
          <div className="card-head" style={{ padding: '0' }}>
            <div>
              <h2>Projected management outlook</h2>
              <p>Balaghat monthly forecast under selected changes</p>
            </div>
            <span className="tag">AI SIMULATION</span>
          </div>
          
          <div className={styles.bigResult}>
            <span className="eyebrow" style={{ color: '#087a5a' }}>Projected recoverable output</span>
            <b>{metrics.output.toLocaleString()} t</b>
            <span className="muted">
              Target 147,000 t · <strong style={{ color: '#087a5a' }}>
                {metrics.output >= 147000 ? `+${(metrics.output - 147000).toLocaleString()} t above target` : `−${(147000 - metrics.output).toLocaleString()} t shortfall`}
              </strong>
            </span>
          </div>
          
          <div className="chart" style={{ marginLeft: 0, marginRight: 0 }}>
            <svg viewBox="0 0 700 240" preserveAspectRatio="none">
              <g stroke="#dce5ee">
                <line x1="0" y1="40" x2="700" y2="40" />
                <line x1="0" y1="90" x2="700" y2="90" />
                <line x1="0" y1="140" x2="700" y2="140" />
                <line x1="0" y1="190" x2="700" y2="190" />
              </g>
              <path d="M0 190 L100 170 L200 145 L300 138 L400 104 L500 84 L600 57 L700 48 L700 240 L0 240Z" fill="#0a9b7018" />
              <polyline points="0,190 100,170 200,145 300,138 400,104 500,84 600,57 700,48" fill="none" stroke="#0a9b70" strokeWidth="3" />
              <polyline points="0,198 100,184 200,171 300,164 400,154 500,144 600,135 700,124" fill="none" stroke="#db3d3d" strokeWidth="2" strokeDasharray="6 4" />
              <text x="612" y="42" fill="#0a9b70" fontSize="11" fontFamily="monospace">Recovery case</text>
              <text x="602" y="118" fill="#db3d3d" fontSize="11" fontFamily="monospace">Baseline</text>
            </svg>
            <div className="chart-labels">
              <span>Today</span><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Month end</span>
            </div>
          </div>
          
          <div className="metrics" style={{ margin: 0 }}>
            <div className="card metric">
              <span className="eyebrow">Output recovery</span>
              <div className="metric-val" style={{ fontSize: '18px', color: 'var(--green)' }}>+{ (metrics.output - 128500).toLocaleString() } t</div>
              <small>vs. baseline</small>
            </div>
            <div className="card metric">
              <span className="eyebrow">On-time dispatch</span>
              <div className="metric-val" style={{ fontSize: '18px' }}>{metrics.dispatch}%</div>
              <small>contract position</small>
            </div>
            <div className="card metric">
              <span className="eyebrow">Grade forecast</span>
              <div className="metric-val" style={{ fontSize: '18px' }}>{metrics.grade}%</div>
              <small>blended Mn</small>
            </div>
            <div className="card metric">
              <span className="eyebrow">Scenario confidence</span>
              <div className="metric-val" style={{ fontSize: '18px' }}>{metrics.confidence}%</div>
              <small>model certainty</small>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
