import React from 'react';
import styles from './EquipmentHealth.module.css';

export default function EquipmentHealth() {
  const notify = (msg) => window.dispatchEvent(new CustomEvent('notify', { detail: msg }));

  return (
    <div className="view active animate-fade-in" id="equipment">
      <div className="page-title">
        <div>
          <span className="eyebrow" style={{ color: 'var(--blue)' }}>⚙ Satellite &amp; IoT diagnostics</span>
          <h1>Equipment Health Monitor</h1>
          <p>Predictive maintenance and fleet readiness across active operations.</p>
        </div>
        <div className="context">
          <i>●</i> 87 ASSETS &nbsp;·&nbsp; 76 ONLINE
        </div>
      </div>
      <div className="metrics">
        <article className="card metric">
          <span className="eyebrow">Fleet readiness</span>
          <div className="metric-val">87.4<small>%</small></div>
          <small>Target ≥ 90%</small>
        </article>
        <article className="card metric">
          <span className="eyebrow">Predictive alerts</span>
          <div className="metric-val" style={{ color: 'var(--amber)' }}>06</div>
          <small>2 require action today</small>
        </article>
        <article className="card metric">
          <span className="eyebrow">Mean cycle time</span>
          <div className="metric-val">21.4 <small>min</small></div>
          <small>+1.2 min vs baseline</small>
        </article>
        <article className="card metric">
          <span className="eyebrow">Fuel efficiency</span>
          <div className="metric-val">0.83 <small>L/t</small></div>
          <small>Within operating range</small>
        </article>
      </div>
      
      <div className={styles.equipmentGrid}>
        <article className={`card ${styles.machine}`}>
          <span className="eyebrow">Haul truck · DT-24</span>
          <span className={styles.machineIcon}>▰</span>
          <h3>Nominal operation</h3>
          <small className="muted">Engine / drivetrain telemetry</small>
          <div className={styles.dial}></div>
          <div className={styles.healthNumber}>96<span style={{ fontSize: '12px' }}>%</span></div>
          <div className={styles.track}>
            <i style={{ background: 'var(--green)', width: '96%' }}></i>
          </div>
          <small className="muted mono">NEXT SERVICE · 47h</small>
        </article>

        <article className={`card ${styles.machine} ${styles.warn}`}>
          <span className="eyebrow">Excavator · EX-08</span>
          <span className={styles.machineIcon}>⌘</span>
          <h3>Hydraulic advisory</h3>
          <small className="muted">Pressure trend above baseline</small>
          <div className={styles.dial}></div>
          <div className={styles.healthNumber} style={{ color: 'var(--amber)' }}>72<span style={{ fontSize: '12px' }}>%</span></div>
          <div className={styles.track}>
            <i style={{ background: 'var(--amber)', width: '72%' }}></i>
          </div>
          <small className="muted mono">INSPECT · 11h</small>
        </article>

        <article className={`card ${styles.machine} ${styles.red}`}>
          <span className="eyebrow">Haul truck · DT-36</span>
          <span className={styles.machineIcon}>▰</span>
          <h3>Brake temperature risk</h3>
          <small className="muted">Repeated thermal threshold breach</small>
          <div className={styles.dial}></div>
          <div className={styles.healthNumber} style={{ color: 'var(--red)' }}>43<span style={{ fontSize: '12px' }}>%</span></div>
          <div className={styles.track}>
            <i style={{ background: 'var(--red)', width: '43%' }}></i>
          </div>
          <small className="muted mono">ACTION REQUIRED</small>
        </article>
      </div>

      <article className="card" style={{ marginTop: '14px' }}>
        <div className="card-head">
          <div>
            <h2>Maintenance work queue</h2>
            <p>AI-ranked recommendations based on failure probability</p>
          </div>
          <button className="btn secondary" onClick={() => notify('Maintenance plan exported')}>Export plan</button>
        </div>
        <div className="panel">
          <table className="table">
            <thead>
              <tr><th>Asset</th><th>Finding</th><th>Failure risk</th><th>Recommended window</th><th></th></tr>
            </thead>
            <tbody>
              <tr>
                <td className="mono">DT-36</td>
                <td>Rear brake thermal variance</td>
                <td style={{ color: 'var(--red)' }}>High · 64%</td>
                <td className="mono">Before next shift</td>
                <td><button className="btn" onClick={() => notify('DT-36 inspection scheduled')}>Schedule</button></td>
              </tr>
              <tr>
                <td className="mono">EX-08</td>
                <td>Hydraulic pressure drift</td>
                <td style={{ color: 'var(--amber)' }}>Medium · 38%</td>
                <td className="mono">Within 11h</td>
                <td><button className="btn secondary" onClick={() => notify('EX-08 inspection added to queue')}>Add</button></td>
              </tr>
              <tr>
                <td className="mono">CR-02</td>
                <td>Vibration pattern change</td>
                <td style={{ color: 'var(--amber)' }}>Medium · 31%</td>
                <td className="mono">Next planned stop</td>
                <td><button className="btn secondary" onClick={() => notify('CR-02 diagnostic opened')}>Review</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}
