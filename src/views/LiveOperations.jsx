import React, { useState, useRef, useEffect } from 'react';
import Map, { Source, Layer, NavigationControl, Popup, Marker } from 'react-map-gl/mapbox';
import useLiveSimulation from '../hooks/useLiveSimulation';
import styles from './LiveOperations.module.css';
import 'mapbox-gl/dist/mapbox-gl.css';

// Feature Data
const assetFeatures = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { id: 'HT-032', status: 'Critical' }, geometry: { type: 'Point', coordinates: [80.641, 21.818] } },
    { type: 'Feature', properties: { id: 'EX-002', status: 'Advisory' }, geometry: { type: 'Point', coordinates: [80.625, 21.825] } },
    { type: 'Feature', properties: { id: 'DT-24', status: 'Nominal' }, geometry: { type: 'Point', coordinates: [80.617, 21.812] } },
    { type: 'Feature', properties: { id: 'EX-003', status: 'Nominal' }, geometry: { type: 'Point', coordinates: [80.634, 21.831] } }
  ]
};

const geologyPolygon = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [[[80.608, 21.811], [80.625, 21.842], [80.653, 21.833], [80.648, 21.808], [80.625, 21.801], [80.608, 21.811]]] },
    properties: {}
  }]
};

const haulRouteLine = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: [[80.617, 21.812], [80.621, 21.817], [80.629, 21.819], [80.641, 21.818]] },
    properties: {}
  }]
};

export default function LiveOperations() {
  const mapRef = useRef();
  const [layersVisible, setLayersVisible] = useState({ assets: true, geology: true, haul: true, heatmap: false });
  const [selectedAsset, setSelectedAsset] = useState(null);
  const { throughput, truckPosition } = useLiveSimulation();
  
  const [assistantText, setAssistantText] = useState('');
  const [assistantInput, setAssistantInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const flyToMine = () => {
    mapRef.current?.flyTo({ center: [80.63, 21.82], zoom: 13.2, pitch: 60, bearing: -18, duration: 2000, essential: true });
  };

  const handleMapClick = (e) => {
    const features = e.features;
    if (features && features.length > 0) {
      const asset = features[0];
      setSelectedAsset({
        lngLat: e.lngLat,
        id: asset.properties.id,
        status: asset.properties.status
      });
    } else {
      setSelectedAsset(null);
    }
  };

  const askAssistant = (q) => {
    if (!q.trim() || isTyping) return;
    const responses = {
      "Which shifts caused the highest throughput variance this month?": "Shift B accounts for 46% of monthly variance, led by HT-032 congestion in the OP-4 east ramp.",
      "List our best haul trucks by throughput.": "DT-24, DT-17, and DT-41 lead the current month at 95%, 93%, and 92% schedule adherence.",
      "Will we reach our monthly KPI target?": "Current baseline: 128,500 t. With the recommended fleet reallocation, the model projects 142,600 t (97% of target).",
      "Which excavators have the most idle time?": "EX-002 has the highest idle time at 6h 13m, followed by EX-004 at 5h 36m."
    };
    
    const fullResponse = responses[q] || 'I found a shift-level operations signal. The primary opportunity is to rebalance haul assignments into OP-4 and validate EX-002 idle time at the next dispatch review.';
    setAssistantInput('');
    setIsTyping(true);
    setAssistantText('');
    
    let i = 0;
    const intervalId = setInterval(() => {
      setAssistantText(fullResponse.substring(0, i + 1));
      i++;
      if (i >= fullResponse.length) {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, 25);
  };

  return (
    <div className={`view active animate-fade-in`} id="operations">
      <div className={styles.opsRoom}>
        <div className="page-title" style={{ marginBottom: '18px' }}>
          <div>
            <span className="eyebrow" style={{ color: '#9eafb9' }}>Live mine control room · Balaghat Mine A</span>
            <h1 style={{ color: '#f4f5f6' }}>Loading &amp; Hauling Optimization</h1>
            <p style={{ color: '#aab5bd' }}>Real-time fleet telemetry, AI recommendations, and spatial operations.</p>
          </div>
          <div className={styles.context}><i>●</i> LIVE DATA STREAM &nbsp;·&nbsp; LAST UPDATE 15:31 IST</div>
        </div>
        
        <div className={styles.opsGrid}>
          <div>
            <article className={styles.opsPanel}>
              <div className={styles.opsHead}>
                <div><h2>Production Throughput by Excavator</h2><p>Current shift performance vs. expected throughput</p></div>
                <div className={styles.opsFilters}><button className={styles.opsFilter}>⌖ LOCATION</button><button className={styles.opsFilter}>▾ CURRENT</button></div>
              </div>
              <div className={styles.opsKpis}>
                <div className={styles.opsKpi}><span className={styles.asset}>EX-001</span><b style={{ transition: 'color 0.3s' }}>{throughput.EX001} <small>t/hr</small></b><small style={{ color: '#78c69c' }}>▲ 2% · 96% target</small><svg className={styles.opsSpark} viewBox="0 0 120 20"><polyline points="0,16 17,11 32,15 47,8 63,13 76,10 91,14 104,5 120,7" fill="none" stroke="#72bd92" strokeWidth="2"/></svg></div>
                <div className={`${styles.opsKpi} ${styles.warn}`}><span className={styles.asset}>EX-002</span><b style={{ transition: 'color 0.3s' }}>{throughput.EX002} <small>t/hr</small></b><small style={{ color: '#e4ad46' }}>▲ 1% · 91% target</small><svg className={styles.opsSpark} viewBox="0 0 120 20"><polyline points="0,15 18,16 34,8 51,12 67,6 82,12 101,4 120,10" fill="none" stroke="#e4ad46" strokeWidth="2"/></svg></div>
                <div className={styles.opsKpi}><span className={styles.asset}>EX-003</span><b style={{ transition: 'color 0.3s' }}>{throughput.EX003} <small>t/hr</small></b><small style={{ color: '#78c69c' }}>▲ 3% · 95% target</small><svg className={styles.opsSpark} viewBox="0 0 120 20"><polyline points="0,14 20,8 36,11 51,6 70,13 89,6 105,8 120,2" fill="none" stroke="#72bd92" strokeWidth="2"/></svg></div>
                <div className={`${styles.opsKpi} ${styles.warn}`}><span className={styles.asset}>EX-004</span><b style={{ transition: 'color 0.3s' }}>{throughput.EX004} <small>t/hr</small></b><small style={{ color: '#e4ad46' }}>▼ 4% · 78% target</small><svg className={styles.opsSpark} viewBox="0 0 120 20"><polyline points="0,3 18,6 34,5 50,10 67,7 81,15 101,13 120,18" fill="none" stroke="#e4ad46" strokeWidth="2"/></svg></div>
              </div>
            </article>

            <article className={styles.opsPanel}>
              <div className={styles.opsHead}>
                <div><h2>Real-Time Site Overview</h2><p>Active fleet and operating conditions (3D Terrain Enabled)</p></div>
                <div className={styles.opsFilters}>
                  <button className={styles.opsFilter} onClick={flyToMine}>◎ CENTER MINE</button>
                  <button className={styles.opsFilter} onClick={() => setLayersVisible(l => ({ ...l, heatmap: !l.heatmap }))}>◌ HEATMAP</button>
                </div>
              </div>
              <div className={styles.opsMapWrap}>
                <div className={styles.mapbox}>
                  <Map
                    ref={mapRef}
                    mapboxAccessToken={window.ENV.MAPBOX_API_KEY}
                    initialViewState={{ longitude: 80.63, latitude: 21.82, zoom: 12.3, pitch: 42, bearing: -18 }}
                    mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                    interactiveLayerIds={layersVisible.assets ? ['assets'] : []}
                    onClick={handleMapClick}
                    terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
                  >
                    <Source id="mapbox-dem" type="raster-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" tileSize={512} maxzoom={14} />
                    <NavigationControl showCompass={false} position="bottom-left" />

                    {layersVisible.geology && (
                      <Source type="geojson" data={geologyPolygon}>
                        <Layer id="geology" type="fill" paint={{ 'fill-color': '#d77c28', 'fill-opacity': 0.18, 'fill-outline-color': '#f1bf59' }} />
                      </Source>
                    )}

                    {layersVisible.haul && (
                      <Source type="geojson" data={haulRouteLine}>
                        <Layer id="haul-route" type="line" paint={{ 'line-color': '#f1b244', 'line-width': 4, 'line-opacity': 0.9 }} />
                      </Source>
                    )}

                    {layersVisible.assets && (
                      <Source type="geojson" data={assetFeatures}>
                        {layersVisible.heatmap && (
                          <Layer
                            id="asset-heat"
                            type="heatmap"
                            paint={{
                              'heatmap-weight': 1, 'heatmap-radius': 45, 'heatmap-intensity': 1.2, 'heatmap-opacity': 0.65,
                              'heatmap-color': ['interpolate', ['linear'], ['heatmap-density'], 0, 'rgba(0,0,0,0)', 0.3, '#39a9db', 0.6, '#efb94f', 1, '#e74c3c']
                            }}
                          />
                        )}
                      </Source>
                    )}

                    {layersVisible.assets && (
                      <>
                        <Marker longitude={80.641} latitude={21.818} anchor="center">
                          <div className={`${styles.markerDot} ${styles.critical}`} onClick={() => setSelectedAsset({lngLat: {lng: 80.641, lat: 21.818}, id: 'HT-032', status: 'Critical'})}></div>
                        </Marker>
                        <Marker longitude={80.625} latitude={21.825} anchor="center">
                          <div className={`${styles.markerDot} ${styles.advisory}`} onClick={() => setSelectedAsset({lngLat: {lng: 80.625, lat: 21.825}, id: 'EX-002', status: 'Advisory'})}></div>
                        </Marker>
                        <Marker longitude={80.634} latitude={21.831} anchor="center">
                          <div className={`${styles.markerDot} ${styles.nominal}`} onClick={() => setSelectedAsset({lngLat: {lng: 80.634, lat: 21.831}, id: 'EX-003', status: 'Nominal'})}></div>
                        </Marker>
                        {/* Live moving truck */}
                        <Marker longitude={truckPosition[0]} latitude={truckPosition[1]} anchor="center">
                          <div className={`${styles.markerDot} ${styles.nominal}`} onClick={() => setSelectedAsset({lngLat: {lng: truckPosition[0], lat: truckPosition[1]}, id: 'DT-24', status: 'Nominal'})}></div>
                        </Marker>
                      </>
                    )}

                    {selectedAsset && (
                      <Popup 
                        longitude={selectedAsset.lngLat.lng} 
                        latitude={selectedAsset.lngLat.lat} 
                        closeButton={false} 
                        offset={12} 
                        onClose={() => setSelectedAsset(null)}
                      >
                        <b>{selectedAsset.id}</b><br/>{selectedAsset.status} telemetry
                      </Popup>
                    )}
                  </Map>
                </div>
                <div className={styles.mapTools}>
                  <button onClick={() => mapRef.current?.zoomIn()}>+</button>
                  <button onClick={() => mapRef.current?.zoomOut()}>−</button>
                  <button onClick={flyToMine}>⌖</button>
                </div>
                <div className={styles.mapLayerPanel}>
                  <b>MAP LAYERS</b>
                  <label><input type="checkbox" checked={layersVisible.assets} onChange={e => setLayersVisible({ ...layersVisible, assets: e.target.checked })} /> Fleet assets</label>
                  <label><input type="checkbox" checked={layersVisible.geology} onChange={e => setLayersVisible({ ...layersVisible, geology: e.target.checked })} /> Geology zones</label>
                  <label><input type="checkbox" checked={layersVisible.haul} onChange={e => setLayersVisible({ ...layersVisible, haul: e.target.checked })} /> Haul routes</label>
                </div>
              </div>
            </article>
          </div>

          <div>
            <article className={styles.opsPanel}>
              <div className={styles.opsHead}><div><h2>AI Recommendations</h2><p>Ranked interventions from current shift data</p></div><button className={styles.opsFilter}>☷ FILTER</button></div>
              <div className={styles.opsRecs}>
                <div className={styles.opsRec}><strong>⚠ HT-032 · High production variance detected</strong><p>Throughput variance threshold exceeded 8 times this month. Check route congestion and loading assignment.</p></div>
                <div className={styles.opsRec}><strong>⚠ EX-002 · High idle time between truck loading</strong><p>Divert two additional trucks to Site A Zone 3 to improve shovel utilization.</p></div>
                <div className={styles.opsRec}><strong>⚠ HT-032 · Excessive load detected</strong><p>Load weight measured at 391 t against a 350 t operating threshold.</p></div>
                <div className={styles.opsRec}><strong>ℹ EX-004 · Throughput below expected range</strong><p>Inspect operator cycle time and asset condition before the next shift handover.</p></div>
              </div>
            </article>

            <article className={`${styles.opsPanel} ${styles.opsAssistant}`}>
              <div className={styles.opsHead}><div><h2>AI Mine Assistant</h2><p>On-premise operational intelligence model</p></div><span className="eyebrow">v6.7.12</span></div>
              <div className={styles.assistantSpace}>
                {assistantText ? (
                  <><span>AI MINE ASSISTANT</span><p>{assistantText}</p></>
                ) : (
                  <p style={{ color: '#8e9da5', fontStyle: 'italic' }}>Waiting for query...</p>
                )}
              </div>
              <div className={styles.promptGrid}>
                <button onClick={() => askAssistant('Which shifts caused the highest throughput variance this month?')}>Which shifts caused the highest throughput variance?</button>
                <button onClick={() => askAssistant('List our best haul trucks by throughput.')}>List our best haul trucks by throughput.</button>
                <button onClick={() => askAssistant('Will we reach our monthly KPI target?')}>Will we reach our KPI target?</button>
                <button onClick={() => askAssistant('Which excavators have the most idle time?')}>Which excavators have the most idle time?</button>
              </div>
              <div className={styles.assistantInput}>
                <input value={assistantInput} onChange={(e) => setAssistantInput(e.target.value)} placeholder="Ask AI Mine Assistant…" onKeyDown={(e) => e.key === 'Enter' && askAssistant(assistantInput)} />
                <button onClick={() => askAssistant(assistantInput)}>➤</button>
              </div>
            </article>
          </div>
        </div>

        <div className={styles.opsBottom}>
          <article className={styles.opsPanel}>
            <div className={styles.opsHead}><div><h2>Cycle Time Analysis</h2><p>Excavator idle time across the last 24 hours</p></div><button className={styles.opsFilter}>LAST 24 HRS ▾</button></div>
            <div className={styles.cycleChart}>
              <svg viewBox="0 0 850 180" preserveAspectRatio="none">
                <g stroke="#4a5358" strokeWidth="1">
                  <line x1="0" y1="20" x2="850" y2="20" /><line x1="0" y1="60" x2="850" y2="60" /><line x1="0" y1="100" x2="850" y2="100" /><line x1="0" y1="140" x2="850" y2="140" />
                </g>
                <polyline points="0,105 45,76 90,112 135,89 180,115 225,94 270,120 315,109 360,82 405,115 450,59 495,105 540,93 585,116 630,83 675,110 720,120 765,95 810,111 850,97" fill="none" stroke="#16aeda" strokeWidth="3" />
                <polyline points="0,86 45,97 90,75 135,88 180,68 225,105 270,92 315,116 360,78 405,128 450,92 495,107 540,78 585,111 630,96 675,87 720,116 765,72 810,101 850,84" fill="none" stroke="#d749bf" strokeWidth="3" />
                <polyline points="0,119 45,124 90,103 135,112 180,122 225,112 270,117 315,104 360,118 405,106 450,113 495,110 540,119 585,113 630,126 675,116 720,122 765,115 810,120 850,112" fill="none" stroke="#6bc496" strokeWidth="3" />
                <text x="1" y="171" fill="#a7b4bb" fontSize="9" fontFamily="monospace">01AM</text><text x="190" y="171" fill="#a7b4bb" fontSize="9" fontFamily="monospace">06AM</text><text x="395" y="171" fill="#a7b4bb" fontSize="9" fontFamily="monospace">12PM</text><text x="603" y="171" fill="#a7b4bb" fontSize="9" fontFamily="monospace">06PM</text><text x="805" y="171" fill="#a7b4bb" fontSize="9" fontFamily="monospace">12AM</text>
              </svg>
            </div>
          </article>
          <article className={styles.opsPanel}>
            <div className={styles.opsHead}><div><h2>Current cycle status</h2><p>Selected operational assets</p></div></div>
            <div className={styles.cycleList}>
              <div className={styles.cycleRow}><span style={{ color: '#76c897' }}>● RUNNING</span><b>EX-004</b><small>IDLE 5h 36m</small></div>
              <div className={styles.cycleRow}><span style={{ color: '#76c897' }}>● RUNNING</span><b>EX-003</b><small>IDLE 4h 12m</small></div>
              <div className={styles.cycleRow}><span style={{ color: '#c2cbd0' }}>● IDLE</span><b>EX-001</b><small>IDLE 4h 46m</small></div>
              <div className={styles.cycleRow}><span style={{ color: '#76c897' }}>● RUNNING</span><b>EX-002</b><small>IDLE 6h 13m</small></div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
