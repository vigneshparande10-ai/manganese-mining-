import { useState, useEffect } from 'react';

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

export default function useLiveSimulation() {
  const [throughput, setThroughput] = useState({
    EX001: 690,
    EX002: 770,
    EX003: 810,
    EX004: 610
  });

  const [truckPosition, setTruckPosition] = useState(haulRoutePoints[0]);
  const [routeFraction, setRouteFraction] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Simulate Throughput Fluctuations
      setThroughput(prev => {
        // Random fluctuation between -15 and +15
        const vary = () => Math.floor(Math.random() * 31) - 15;
        return {
          EX001: Math.max(600, Math.min(800, prev.EX001 + vary())),
          EX002: Math.max(700, Math.min(900, prev.EX002 + vary())),
          EX003: Math.max(750, Math.min(950, prev.EX003 + vary())),
          EX004: Math.max(500, Math.min(700, prev.EX004 + vary()))
        };
      });

      // 2. Simulate Truck Movement
      setRouteFraction(prev => {
        let nextFraction = prev + 0.05; // 5% per tick
        if (nextFraction > 1) {
          nextFraction = 0; // loop back
        }
        
        // Calculate segment and interpolation
        const totalSegments = haulRoutePoints.length - 1;
        const overallPosition = nextFraction * totalSegments;
        const segmentIndex = Math.floor(overallPosition);
        const segmentFraction = overallPosition - segmentIndex;
        
        if (segmentIndex >= totalSegments) {
          setTruckPosition(haulRoutePoints[totalSegments]);
        } else {
          setTruckPosition(interpolatePoint(
            haulRoutePoints[segmentIndex], 
            haulRoutePoints[segmentIndex + 1], 
            segmentFraction
          ));
        }
        
        return nextFraction;
      });

    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return { throughput, truckPosition };
}
