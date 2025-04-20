import { useState, useEffect } from 'react';
import { formatTime } from '../../utils/timeUtils';

const Header = () => {
  // Update time every second
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
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