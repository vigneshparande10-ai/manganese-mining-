import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import CommandCenter from './views/CommandCenter';
import LiveOperations from './views/LiveOperations';
import RiskShortfall from './views/RiskShortfall';
import EquipmentHealth from './views/EquipmentHealth';
import Simulator from './views/Simulator';
import ReserveIntelligence from './views/ReserveIntelligence';
import { useStore } from './store/useStore';

export default function App() {
  const [activeView, setActiveView] = useState('command');
  const [toastMsg, setToastMsg] = useState('');
  const startSimulation = useStore(state => state.startSimulation);

  useEffect(() => {
    // Start the global mock websocket simulation
    startSimulation();

    const handleNotify = (e) => {
      setToastMsg(e.detail);
      setTimeout(() => setToastMsg(''), 2800);
    };
    window.addEventListener('notify', handleNotify);
    return () => window.removeEventListener('notify', handleNotify);
  }, [startSimulation]);

  const renderView = () => {
    switch (activeView) {
      case 'command': return <CommandCenter />;
      case 'operations': return <LiveOperations />;
      case 'risk': return <RiskShortfall setActiveView={setActiveView} />;
      case 'equipment': return <EquipmentHealth />;
      case 'simulator': return <Simulator />;
      case 'reserve': return <ReserveIntelligence />;
      default: return <CommandCenter />;
    }
  };

  return (
    <>
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="shell">
        <Topbar />
        <main>
          {renderView()}
        </main>
      </div>
      <div className={`toast ${toastMsg ? 'show' : ''}`} id="toast">
        {toastMsg}
      </div>
    </>
  );
}
