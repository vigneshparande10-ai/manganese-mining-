import { create } from 'zustand';

// A simple utility to interpolate between two points
function interpolatePoint(p1, p2, fraction) {
  return [
    p1[0] + (p2[0] - p1[0]) * fraction,
    p1[1] + (p2[1] - p1[1]) * fraction
  ];
}

// The route the truck will follow
const haulRoutePoints = [
  [80.617, 21.812],
  [80.621, 21.817],
  [80.629, 21.819],
  [80.641, 21.818]
];

// Initialize with some history points to make sparklines look good initially
const initialHistory = Array(20).fill(0).map((_, i) => ({
  time: i,
  EX001: 690 + Math.floor(Math.random() * 30) - 15,
  EX002: 770 + Math.floor(Math.random() * 30) - 15,
  EX003: 810 + Math.floor(Math.random() * 30) - 15,
  EX004: 610 + Math.floor(Math.random() * 30) - 15,
}));

export const useStore = create((set, get) => ({
  throughput: {
    EX001: initialHistory[19].EX001,
    EX002: initialHistory[19].EX002,
    EX003: initialHistory[19].EX003,
    EX004: initialHistory[19].EX004
  },
  throughputHistory: initialHistory,
  truckPosition: haulRoutePoints[0],
  routeFraction: 0,
  isSimulationRunning: false,
  
  // Method to handle incoming socket messages (mocked)
  receiveTelemetry: (data) => set((state) => {
    const newHistory = [...state.throughputHistory.slice(1), {
      time: Date.now(),
      EX001: data.throughput.EX001,
      EX002: data.throughput.EX002,
      EX003: data.throughput.EX003,
      EX004: data.throughput.EX004,
    }];
    return {
      throughput: data.throughput,
      throughputHistory: newHistory,
      truckPosition: data.truckPosition,
      routeFraction: data.routeFraction
    };
  }),
  
  // The actual mock websocket class equivalent that pushes data
  startSimulation: () => {
    if (get().isSimulationRunning) return;
    set({ isSimulationRunning: true });
    
    // Using setInterval to simulate a WebSocket stream
    const interval = setInterval(() => {
      const state = get();
      
      // 1. Simulate Throughput Fluctuations
      const vary = () => Math.floor(Math.random() * 31) - 15;
      const nextThroughput = {
        EX001: Math.max(600, Math.min(800, state.throughput.EX001 + vary())),
        EX002: Math.max(700, Math.min(900, state.throughput.EX002 + vary())),
        EX003: Math.max(750, Math.min(950, state.throughput.EX003 + vary())),
        EX004: Math.max(500, Math.min(700, state.throughput.EX004 + vary()))
      };

      // 2. Simulate Truck Movement
      let nextFraction = state.routeFraction + 0.05; // 5% per tick
      if (nextFraction > 1) nextFraction = 0; // loop back
      
      const totalSegments = haulRoutePoints.length - 1;
      const overallPosition = nextFraction * totalSegments;
      const segmentIndex = Math.floor(overallPosition);
      const segmentFraction = overallPosition - segmentIndex;
      
      let nextPosition;
      if (segmentIndex >= totalSegments) {
        nextPosition = haulRoutePoints[totalSegments];
      } else {
        nextPosition = interpolatePoint(
          haulRoutePoints[segmentIndex], 
          haulRoutePoints[segmentIndex + 1], 
          segmentFraction
        );
      }
      
      // Emit the event to our store
      get().receiveTelemetry({
        throughput: nextThroughput,
        truckPosition: nextPosition,
        routeFraction: nextFraction
      });
      
    }, 2000); // 2 seconds update
  }
}));
