import { useState, useEffect } from 'react';
import { getCurrentTime, getSimulatedTime } from '../../utils/timeUtils';

const DebugInfo = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [simulatedTime, setSimulatedTime] = useState(getSimulatedTime());
  const [showDebug, setShowDebug] = useState(false);
  
  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
      setSimulatedTime(getSimulatedTime());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Check if debug mode is enabled via environment variable
  useEffect(() => {
    const isDebug = import.meta.env.VITE_DEBUG === 'true';
    setShowDebug(isDebug);
  }, []);

  if (!showDebug) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 bg-gray-800 text-white p-2 text-xs z-50 opacity-70 hover:opacity-100">
      <div>
        <strong>Current Time:</strong> {currentTime.toLocaleString()}
      </div>
      <div>
        <strong>Simulated Time:</strong> {simulatedTime.toLocaleString()}
      </div>
      <div>
        <strong>Progress:</strong> {Math.round((simulatedTime.getHours() * 60 + simulatedTime.getMinutes()) / (24 * 60) * 100)}%
      </div>
      <div className="text-gray-300 text-xs mt-1">
        Set VITE_MOCK_TIME in .env to override
      </div>
    </div>
  );
};

export default DebugInfo;