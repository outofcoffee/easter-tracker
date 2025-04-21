import { useState, useEffect } from 'react';
import { getCurrentTime, getGlobalEasterStart, getGlobalEasterEnd, getEasterDate } from '../../utils/timeUtils';
import { useTracker } from '../../context/TrackerContext';

const DebugInfo = () => {
  const { isEasterDay, nextEasterFormatted, currentPosition } = useTracker();
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

  // Calculate global Easter period for display
  const year = currentTime.getFullYear();
  const easterDate = getEasterDate(year);
  const globalStart = getGlobalEasterStart(easterDate);
  const globalEnd = getGlobalEasterEnd(easterDate);

  return (
    <div className="fixed bottom-0 right-0 bg-gray-800 text-white p-2 text-xs z-50 opacity-70 hover:opacity-100">
      <div>
        <strong>Current Time:</strong> {currentTime.toLocaleString()}
      </div>
      <div>
        <strong>Is Easter Day:</strong> {isEasterDay ? "Yes" : "No"}
      </div>
      {isEasterDay ? (
        <>
          <div>
            <strong>Easter Period:</strong> {globalStart.toISOString().slice(0, 16)} to {globalEnd.toISOString().slice(0, 16)}
          </div>
          {currentPosition && (
            <>
              <div>
                <strong>Current City:</strong> {currentPosition.currentCity?.name}
              </div>
              <div>
                <strong>Next City:</strong> {currentPosition.nextCity?.name}
              </div>
              <div>
                <strong>Progress:</strong> {Math.round(currentPosition.completionPercentage)}%
              </div>
            </>
          )}
        </>
      ) : (
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