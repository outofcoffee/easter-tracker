import { useState, useEffect } from 'react';
import { formatTime, getCurrentTime } from '../../utils/timeUtils';

const Header = () => {
  // Update time every second using current time (real or mocked)
  const [time, setTime] = useState(getCurrentTime());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gradient-to-r from-easter-pink to-easter-purple p-4 text-white text-center shadow-md">
      <h1 className="text-3xl md:text-4xl font-bold">
        Easter Bunny Tracker
      </h1>
      <p className="text-lg mt-2">
        Follow the Easter Bunny's journey around the world!
      </p>
      <p className="text-sm mt-2">
        {time.toLocaleDateString()} • {formatTime(time)}
      </p>
    </header>
  );
};

export default Header;