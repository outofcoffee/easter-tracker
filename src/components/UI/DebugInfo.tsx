import { useState, useEffect } from 'react';
import { getCurrentTime } from '../../utils/timeUtils';
import { useTracker } from '../../context/TrackerContext';

const DebugInfo = () => {
  const { isEasterDay, nextEasterFormatted } = useTracker();
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [showDebug, setShowDebug] = useState(false);
  
  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Check if debug mode is enabled via environment variable
  useEffect(() => {
    try {
      // @ts-ignore
      const isDebug = import.meta.env?.VITE_DEBUG === 'true';
      setShowDebug(isDebug);
    } catch (e) {
      setShowDebug(false);
    }
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
        <strong>Is Easter Day:</strong> {isEasterDay ? "Yes" : "No"}
      </div>
      {!isEasterDay && (
        <div>
          <strong>Next Easter:</strong> {nextEasterFormatted}
        </div>
      )}
      <div className="text-gray-300 text-xs mt-1">
        Set VITE_MOCK_TIME or VITE_MOCK_DATE in .env to override
      </div>
    </div>
  );
};

export default DebugInfo;