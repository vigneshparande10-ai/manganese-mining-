import React, { useState, useEffect } from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
          
          <div className="chart" style={{ marginLeft: 0, marginRight: 0, height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={[
                { period: 'Today', baseline: 10000, recovery: 10000 },
                { period: 'Week 1', baseline: 40000, recovery: 40000 + (metrics.output - 128500) * 0.2 },
                { period: 'Week 2', baseline: 70000, recovery: 70000 + (metrics.output - 128500) * 0.5 },
                { period: 'Week 3', baseline: 100000, recovery: 100000 + (metrics.output - 128500) * 0.8 },
                { period: 'Month end', baseline: 128500, recovery: metrics.output }
              ]} margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dce5ee" />
                <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                <YAxis hide domain={['dataMin - 10000', 'dataMax + 10000']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  labelStyle={{ fontWeight: 600, color: '#334155', marginBottom: '4px' }}
                  formatter={(value) => value.toLocaleString() + ' t'}
                />
                <Area type="monotone" dataKey="recovery" name="Recovery case" fill="#0a9b7018" stroke="none" />
                <Line type="monotone" dataKey="recovery" name="Recovery case" stroke="#0a9b70" strokeWidth={3} dot={{ r: 4, fill: '#0a9b70' }} />
                <Line type="monotone" dataKey="baseline" name="Baseline" stroke="#db3d3d" strokeWidth={2} strokeDasharray="6 4" dot={{ r: 3, fill: '#db3d3d' }} />
              </ComposedChart>
            </ResponsiveContainer>
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
