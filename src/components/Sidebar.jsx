import React from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar({ activeView, setActiveView }) {
  const navItems = [
    { id: 'operations', icon: '◉', label: 'Live Operations' },
    { id: 'command', icon: '▦', label: 'Command Center' },
    { id: 'reserve', icon: '▤', label: 'Reserve Intelligence' },
    { id: 'equipment', icon: '⚙', label: 'Equipment Health' },
    { id: 'risk', icon: '⚠', label: 'Risk & Shortfall', badge: '1' },
    { id: 'recommendations', icon: '✦', label: 'AI Recommendations', badge: '4', badgeBlue: true },
    { id: 'simulator', icon: '⌁', label: 'What-If Simulation' },
    { id: 'reports', icon: '◫', label: 'Reports & Audit' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandmark}>M</div>
        <div>
          <b>MOIL AI-MINE</b>
          <small>Manganese intelligence</small>
        </div>
      </div>
      <div className={styles.navLabel}>Operational telemetry</div>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={activeView === item.id ? styles.active : ''}
            onClick={() => {
              // Map 'recommendations' to 'risk' view as per original
              if (item.id === 'recommendations' || item.id === 'reports') {
                setActiveView(item.id === 'recommendations' ? 'risk' : 'command');
              } else {
                setActiveView(item.id);
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className={styles.ico}>{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && (
              <em className={`${styles.badge} ${item.badgeBlue ? styles.blue : ''}`}>
                {item.badge}
              </em>
            )}
          </button>
        ))}
      </nav>
      <div className={styles.health}>
        <span className="eyebrow" style={{ color: '#9bb0c7' }}>Telemetry health</span>
        <div className={styles.healthRow}>
          <span>Pipeline health</span>
          <b>99.4%</b>
        </div>
        <div className={styles.track}>
          <i></i>
        </div>
        <div className={styles.healthRow}>
          <span>Active sites</span>
          <b>10 mines</b>
        </div>
        <div className={styles.healthRow}>
          <span>Mn model conf.</span>
          <b style={{ color: '#ffc99c' }}>94%</b>
        </div>
      </div>
    </aside>
  );
}
