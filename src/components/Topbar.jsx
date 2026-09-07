import React from 'react';
import styles from './Topbar.module.css';

export default function Topbar() {
  const notify = (msg) => {
    // We will implement a global toast context later if needed,
    // for now just alert or custom event.
    window.dispatchEvent(new CustomEvent('notify', { detail: msg }));
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.search}>
        <span>⌕</span>
        <input placeholder="Search mine, equipment, drill hole, production period…" />
        <span className={styles.keys}>⌘ K</span>
      </div>
      <div className={styles.topActions}>
        <div className={styles.status}>
          <i className={styles.dot}></i> AI Models: Active v2.4
        </div>
        <button 
          className={styles.notify} 
          onClick={() => notify('You have 1 active production risk')}
        >
          ♧
        </button>
        <div className={styles.avatar}>RV</div>
        <div className={styles.user}>
          <b>Rajesh Verma</b>
          <span>Dir. Mine Planning</span>
        </div>
      </div>
    </header>
  );
}
