import React from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../store/useStore';

export default function CommandCenter() {
  const { throughput } = useStore();
  const totalThroughput = Object.values(throughput).reduce((a, b) => a + b, 0);
  const throughputChange = (totalThroughput / 2870 * 100 - 100).toFixed(1);
  const todayOre = Math.floor(42680 + (throughputChange * 120));
  const notify = (msg) => window.dispatchEvent(new CustomEvent('notify', { detail: msg }));

  return (
    <div className="view active animate-fade-in" id="command">
      <div className="page-title">
        <div>
          <span className="eyebrow" style={{ color: 'var(--orange)' }}>◈ Portfolio intelligence</span>
          <h1>Operational Command Center</h1>
          <p>Live operational visibility across the MOIL manganese portfolio.</p>
        </div>
        <div className="context">
          <i>●</i> LIVE TELEMETRY &nbsp;·&nbsp; LAST SYNC 12:04 IST
        </div>
      </div>
      <div className="metrics">
        <article className="card metric">
          <span className="eyebrow">Today's ore output</span>
          <span className={`change ${throughputChange < 0 ? 'red' : ''}`}>{throughputChange >= 0 ? '↑' : '↓'} {Math.abs(throughputChange)}%</span>
          <div className="metric-val" style={{ transition: 'color 0.3s' }}>{todayOre.toLocaleString()} <small>t</small></div>
          <small>Target 46,000 t</small>
          <div className="mini-bars">
            <i style={{ height: '34%' }}></i><i style={{ height: '48%' }}></i><i style={{ height: '43%' }}></i>
            <i style={{ height: '67%' }}></i><i style={{ height: '61%' }}></i><i style={{ height: '86%' }}></i>
            <i style={{ height: '72%' }}></i><i style={{ height: `${Math.min(100, 80 + throughputChange * 10)}%`, transition: 'height 1s' }}></i>
          </div>
        </article>
        <article className="card metric">
          <span className="eyebrow">Dispatch adherence</span>
          <span className="change">↑ 2.1%</span>
          <div className="metric-val">92.7<small>%</small></div>
          <small>143 of 154 scheduled trips</small>
          <div className="mini-bars">
            <i style={{ height: '55%' }}></i><i style={{ height: '63%' }}></i><i style={{ height: '58%' }}></i>
            <i style={{ height: '70%' }}></i><i style={{ height: '83%' }}></i><i style={{ height: '94%' }}></i>
            <i style={{ height: '91%' }}></i><i style={{ height: '87%' }}></i>
          </div>
        </article>
        <article className="card metric">
          <span className="eyebrow">Fleet availability</span>
          <span className="change warn">↓ 1.2%</span>
          <div className="metric-val">87.4<small>%</small></div>
          <small>76 / 87 assets online</small>
          <div className="mini-bars">
            <i style={{ height: '88%' }}></i><i style={{ height: '82%' }}></i><i style={{ height: '92%' }}></i>
            <i style={{ height: '84%' }}></i><i style={{ height: '90%' }}></i><i style={{ height: '77%' }}></i>
            <i style={{ height: '81%' }}></i><i style={{ height: '87%' }}></i>
          </div>
        </article>
        <article className="card metric">
          <span className="eyebrow">Blended Mn grade</span>
          <span className="change">↑ 0.6%</span>
          <div className="metric-val">41.8<small>%</small></div>
          <small>Plan 40.5% Mn</small>
          <div className="mini-bars">
            <i style={{ height: '58%' }}></i><i style={{ height: '67%' }}></i><i style={{ height: '63%' }}></i>
            <i style={{ height: '72%' }}></i><i style={{ height: '79%' }}></i><i style={{ height: '83%' }}></i>
            <i style={{ height: '91%' }}></i><i style={{ height: '94%' }}></i>
          </div>
        </article>
      </div>

      <div className="grid">
        <article className="card">
          <div className="card-head">
            <div>
              <h2>Production performance</h2>
              <p>Daily ore movement vs. monthly plan</p>
            </div>
            <div className="legend">
              <span>Actual</span>
              <span className="forecast">Forecast</span>
            </div>
          </div>
          <div className="chart" style={{ height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={[
                { day: '01 Sep', actual: 31000 },
                { day: '05', actual: 34500 },
                { day: '10', actual: 33000 },
                { day: '15', actual: 38000 },
                { day: '20', actual: 39500 },
                { day: 'Today', actual: 42700, forecast: 42700 },
                { day: 'End', forecast: 45000 }
              ]} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dce5ee" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                <YAxis hide domain={['dataMin - 5000', 'dataMax + 5000']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  labelStyle={{ fontWeight: 600, color: '#334155', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="actual" fill="#087bb81a" stroke="none" />
                <Line type="monotone" dataKey="actual" stroke="#087bb8" strokeWidth={3} dot={{ r: 4, fill: '#087bb8' }} />
                <Line type="monotone" dataKey="forecast" stroke="#b45309" strokeWidth={3} strokeDasharray="6 4" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="card">
          <div className="card-head">
            <div>
              <h2>Site status</h2>
              <p>Top operating areas by variance</p>
            </div>
            <button className="btn secondary" onClick={() => notify('All 10 operating sites loaded')}>View all</button>
          </div>
          <div className="site-list" style={{ padding: '6px 16px 15px' }}>
            <div className="site" style={{ display: 'grid', gridTemplateColumns: '9px 1fr auto', alignItems: 'center', gap: '10px', borderTop: '1px solid #edf1f5', padding: '11px 0' }}>
              <i className="site-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)' }}></i>
              <div><b style={{ display: 'block', fontSize: '12px' }}>Balaghat Mine</b><small style={{ color: 'var(--muted)', font: '10px var(--mono)' }}>OP-4 · 17 assets online</small></div>
              <strong style={{ font: '600 12px var(--mono)' }}>+6.2%</strong>
            </div>
            <div className="site" style={{ display: 'grid', gridTemplateColumns: '9px 1fr auto', alignItems: 'center', gap: '10px', borderTop: '1px solid #edf1f5', padding: '11px 0' }}>
              <i className="site-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)' }}></i>
              <div><b style={{ display: 'block', fontSize: '12px' }}>Ukwa Mine</b><small style={{ color: 'var(--muted)', font: '10px var(--mono)' }}>UG-2 · 11 assets online</small></div>
              <strong style={{ font: '600 12px var(--mono)' }}>+3.8%</strong>
            </div>
            <div className="site" style={{ display: 'grid', gridTemplateColumns: '9px 1fr auto', alignItems: 'center', gap: '10px', borderTop: '1px solid #edf1f5', padding: '11px 0' }}>
              <i className="site-dot warn" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--amber)' }}></i>
              <div><b style={{ display: 'block', fontSize: '12px' }}>Chikla Mine</b><small style={{ color: 'var(--muted)', font: '10px var(--mono)' }}>OP-1 · 9 assets online</small></div>
              <strong style={{ font: '600 12px var(--mono)', color: 'var(--amber)' }}>−2.1%</strong>
            </div>
            <div className="site" style={{ display: 'grid', gridTemplateColumns: '9px 1fr auto', alignItems: 'center', gap: '10px', borderTop: '1px solid #edf1f5', padding: '11px 0' }}>
              <i className="site-dot red" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red)' }}></i>
              <div><b style={{ display: 'block', fontSize: '12px' }}>Munsar Mine</b><small style={{ color: 'var(--muted)', font: '10px var(--mono)' }}>UG-3 · Haul cycle delay</small></div>
              <strong style={{ font: '600 12px var(--mono)', color: 'var(--red)' }}>−9.7%</strong>
            </div>
          </div>
        </article>
      </div>

      <div className="grid lower" style={{ marginTop: '14px' }}>
        <article className="card">
          <div className="card-head">
            <div>
              <h2>Balaghat spatial operations</h2>
              <p>Active fleet, pit geometry, and dispatch routes</p>
            </div>
            <span className="eyebrow" style={{ color: 'var(--green)' }}>● nominal</span>
          </div>
          <div className="map" style={{ height: '230px', margin: '12px 16px 16px', background: '#183249', borderRadius: '5px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(30deg,transparent 0 34px,#36526a 35px 36px),repeating-linear-gradient(120deg,transparent 0 50px,#28465e 51px 52px)', opacity: 0.7 }}></div>
            <div className="road" style={{ position: 'absolute', width: '440px', height: '5px', transform: 'rotate(-21deg)', top: '111px', left: '90px', background: '#7a9eae', boxShadow: '0 0 0 2px #304f65' }}></div>
            <div className="pit" style={{ position: 'absolute', left: '30%', top: '18%', height: '175px', width: '320px', border: '2px solid #e59436', clipPath: 'polygon(14% 0,90% 16%,100% 58%,70% 100%,14% 79%,0 33%)', background: 'linear-gradient(125deg,#355c69,#1d3f55)', opacity: 0.95 }}></div>
            <i className="pin" style={{ position: 'absolute', width: '12px', height: '12px', border: '2px solid #fff', borderRadius: '50%', background: 'var(--orange)', boxShadow: '0 0 0 4px #e6781459', left: '37%', top: '37%' }}></i>
            <i className="pin" style={{ position: 'absolute', width: '12px', height: '12px', border: '2px solid #fff', borderRadius: '50%', background: '#1bb985', boxShadow: '0 0 0 4px #e6781459', left: '60%', top: '58%' }}></i>
            <i className="pin" style={{ position: 'absolute', width: '12px', height: '12px', border: '2px solid #fff', borderRadius: '50%', background: '#e33f3f', boxShadow: '0 0 0 4px #e6781459', left: '69%', top: '28%' }}></i>
            <div className="map-key" style={{ position: 'absolute', right: '10px', bottom: '10px', background: '#14283ad9', color: '#dce8f2', border: '1px solid #49657b', borderRadius: '4px', padding: '8px', font: '9px var(--mono)', lineHeight: 1.7 }}>
              ● Fleet 17 active<br /><span style={{ color: '#1bb985' }}>●</span> Plant / crusher<br /><span style={{ color: '#e33f3f' }}>●</span> Advisory zone
            </div>
          </div>
        </article>
        
        <article className="card">
          <div className="card-head">
            <div>
              <h2>Shift dispatch queue</h2>
              <p>Haul movement cycle performance</p>
            </div>
          </div>
          <div className="panel">
            <table className="table">
              <thead>
                <tr><th>Fleet</th><th>Route</th><th>Cycle</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mono">DT-24</td><td>OP-4 → Crusher</td><td className="mono">18m</td>
                  <td><span style={{ color: 'var(--green)' }}>● On time</span></td>
                </tr>
                <tr>
                  <td className="mono">DT-17</td><td>OP-3 → Stockpile</td><td className="mono">22m</td>
                  <td><span style={{ color: 'var(--amber)' }}>● +3m</span></td>
                </tr>
                <tr>
                  <td className="mono">EX-08</td><td>OP-4 loading</td><td className="mono">—</td>
                  <td><span style={{ color: 'var(--green)' }}>● Loading</span></td>
                </tr>
                <tr>
                  <td className="mono">DT-36</td><td>UG-2 → ROM</td><td className="mono">27m</td>
                  <td><span style={{ color: 'var(--red)' }}>● Review</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
  );
}
