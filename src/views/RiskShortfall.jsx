import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './RiskShortfall.module.css';

export default function RiskShortfall({ setActiveView }) {
  const notify = (msg) => window.dispatchEvent(new CustomEvent('notify', { detail: msg }));

  return (
    <div className="view active animate-fade-in" id="risk">
      <div className="page-title">
        <div>
          <span className="eyebrow" style={{ color: 'var(--red)' }}>⚠ Deterministic risk &amp; dispatch remediation</span>
          <h1>Production Risk &amp; AI Recommendations</h1>
          <p>Prioritized recovery actions from the current portfolio forecast.</p>
        </div>
        <div className="context">
          <i style={{ color: 'var(--red)' }}>●</i> BAL-OPT-v4.1 &nbsp;·&nbsp; 14:02 IST
        </div>
      </div>

      <div className={styles.alert}>
        <div>
          <b>Predicted production shortfall: 18,500 tonnes <span className="mono">(82% probability)</span></b>
          <p>Balaghat forecast is 128,500 t against a 147,000 t monthly target. Intervention window: 36h 45m.</p>
        </div>
        <button className="btn" onClick={() => setActiveView('simulator')}>
          Model recovery
        </button>
      </div>

      <div className="grid">
        <article className="card">
          <div className="card-head">
            <div>
              <h2>30-day deficit escalation</h2>
              <p>Cumulative probability without corrective dispatch</p>
            </div>
            <span className="eyebrow">Monte Carlo n=10,000</span>
          </div>
          <div className="chart" style={{ height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { day: 'Today', probability: 12 },
                { day: 'Day 7', probability: 34 },
                { day: 'Day 14', probability: 68 },
                { day: 'Day 21', probability: 79 },
                { day: 'Day 30', probability: 82 }
              ]} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dce5ee" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  labelStyle={{ fontWeight: 600, color: '#334155', marginBottom: '4px' }}
                  formatter={(value) => value + '%'}
                />
                <Area type="monotone" dataKey="probability" stroke="#db3d3d" strokeWidth={3} fill="#db3d3d18" dot={{ r: 4, fill: '#db3d3d' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
        
        <article className="card">
          <div className="card-head">
            <div>
              <h2>Root-cause decomposition</h2>
              <p>Contribution to expected loss</p>
            </div>
          </div>
          <div className="panel">
            <div className="site" style={{ display: 'grid', gridTemplateColumns: '9px 1fr auto', alignItems: 'center', gap: '10px', borderTop: '1px solid #edf1f5', padding: '11px 0' }}>
              <i className="site-dot red" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red)' }}></i>
              <div><b style={{ display: 'block', fontSize: '12px' }}>Haulage cycle degradation</b><small style={{ color: 'var(--muted)', font: '10px var(--mono)' }}>Ramp congestion + asset availability</small></div>
              <strong className="risk" style={{ font: '600 12px var(--mono)', color: 'var(--red)' }}>41%</strong>
            </div>
            <div className="site" style={{ display: 'grid', gridTemplateColumns: '9px 1fr auto', alignItems: 'center', gap: '10px', borderTop: '1px solid #edf1f5', padding: '11px 0' }}>
              <i className="site-dot warn" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--amber)' }}></i>
              <div><b style={{ display: 'block', fontSize: '12px' }}>Weather access constraint</b><small style={{ color: 'var(--muted)', font: '10px var(--mono)' }}>Rainfall risk in OP-4 east cut</small></div>
              <strong style={{ font: '600 12px var(--mono)', color: 'var(--amber)' }}>26%</strong>
            </div>
            <div className="site" style={{ display: 'grid', gridTemplateColumns: '9px 1fr auto', alignItems: 'center', gap: '10px', borderTop: '1px solid #edf1f5', padding: '11px 0' }}>
              <i className="site-dot warn" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--amber)' }}></i>
              <div><b style={{ display: 'block', fontSize: '12px' }}>Crusher feed variability</b><small style={{ color: 'var(--muted)', font: '10px var(--mono)' }}>ROM blending variance</small></div>
              <strong style={{ font: '600 12px var(--mono)', color: 'var(--amber)' }}>19%</strong>
            </div>
            <div className="site" style={{ display: 'grid', gridTemplateColumns: '9px 1fr auto', alignItems: 'center', gap: '10px', borderTop: '1px solid #edf1f5', padding: '11px 0' }}>
              <i className="site-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)' }}></i>
              <div><b style={{ display: 'block', fontSize: '12px' }}>Lab turnaround delay</b><small style={{ color: 'var(--muted)', font: '10px var(--mono)' }}>Grade reconciliation</small></div>
              <strong style={{ font: '600 12px var(--mono)' }}>14%</strong>
            </div>
          </div>
        </article>
      </div>

      <h2 style={{ fontSize: '15px', margin: '20px 0 10px' }}>AI recovery prescriptions</h2>
      <div className={styles.prescriptions}>
        <article className={`card ${styles.prescription}`}>
          <span className={styles.rank}>1</span>
          <span className={styles.tag}>HIGH CONFIDENCE</span>
          <h3>Reassign three haul units to OP-4</h3>
          <p>Pull DT-31, DT-36 and DT-41 from low-utilization routes for the next two shifts.</p>
          <div className={styles.impact}>
            <div>RECOVERY<b>+7,400 t</b></div>
            <div>CONFIDENCE<b>91%</b></div>
            <button className="btn" onClick={() => notify('Prescription 1 approved for dispatch review')}>Approve</button>
          </div>
        </article>
        
        <article className={`card ${styles.prescription}`}>
          <span className={styles.rank}>2</span>
          <span className={styles.tag}>OPTIMIZATION</span>
          <h3>Advance east-cut loading sequence</h3>
          <p>Prioritize high-grade block E-12 before projected rainfall access restrictions.</p>
          <div className={styles.impact}>
            <div>RECOVERY<b>+4,800 t</b></div>
            <div>CONFIDENCE<b>84%</b></div>
            <button className="btn" onClick={() => notify('Prescription 2 staged for planning review')}>Stage plan</button>
          </div>
        </article>
        
        <article className={`card ${styles.prescription}`}>
          <span className={styles.rank}>3</span>
          <span className={styles.tag}>BLENDING</span>
          <h3>Adjust crusher feed blend</h3>
          <p>Increase stockpile S-3 draw to hold the delivered grade within contractual band.</p>
          <div className={styles.impact}>
            <div>GRADE<b>+0.7% Mn</b></div>
            <div>CONFIDENCE<b>88%</b></div>
            <button className="btn" onClick={() => notify('Blend change sent to crusher operator')}>Send</button>
          </div>
        </article>
        
        <article className={`card ${styles.prescription}`}>
          <span className={styles.rank}>4</span>
          <span className={styles.tag}>MAINTENANCE</span>
          <h3>Defer planned DT-17 inspection</h3>
          <p>Move a non-critical inspection by 12 hours after technician confirmation.</p>
          <div className={styles.impact}>
            <div>RECOVERY<b>+1,900 t</b></div>
            <div>CONFIDENCE<b>76%</b></div>
            <button className="btn secondary" onClick={() => notify('Maintenance supervisor notified')}>Review</button>
          </div>
        </article>
      </div>
    </div>
  );
}
