// Format time to display in a user-friendly way
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Get the date of Easter for a given year
export const getEasterDate = (year: number): Date => {
  // Easter 2025 is April 20, 2025
  if (year === 2025) {
    return new Date('2025-04-20T00:00:00Z');
  }
  
  // Algorithm to calculate Easter Sunday for any year
  // Based on Butcher's algorithm
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  
  return new Date(year, month - 1, day);
};

// Get current time, possibly overridden for testing
interface GetCurrentTimeFunction {
  (): Date;
  hasLoggedMockTime: boolean;
  hasLoggedMockDate: boolean;
  hasLoggedError: boolean;
}

export const getCurrentTime = ((): GetCurrentTimeFunction => {
  const func = (): Date => {
  // Check for testing overrides via environment variables
  let mockTimeString, mockDateString;
  try {
    // @ts-ignore - Check for full time override
    mockTimeString = import.meta.env?.VITE_MOCK_TIME;
    // @ts-ignore - Check for date-only override
    mockDateString = import.meta.env?.VITE_MOCK_DATE;
  } catch (e) {
    // No mock values available
  }
  
  // VITE_MOCK_TIME takes precedence over VITE_MOCK_DATE
  if (mockTimeString) {
    try {
      // Parse ISO format YYYY-MM-DDTHH:MM:SS
      const mockTime = new Date(mockTimeString);
      
      // Validate that the date is valid
      if (!isNaN(mockTime.getTime())) {
        // Only log once when the app starts
        if (!getCurrentTime.hasLoggedMockTime) {
          console.log(`Using mock time: ${mockTime.toISOString()}`);
          getCurrentTime.hasLoggedMockTime = true;
        }
        return mockTime;
      } else {
        // Only log error once
        if (!getCurrentTime.hasLoggedError) {
          console.error(`Invalid mock time format: ${mockTimeString}, using real time instead`);
          getCurrentTime.hasLoggedError = true;
        }
      }
    } catch (error) {
      // Only log error once
      if (!getCurrentTime.hasLoggedError) {
        console.error(`Error parsing mock time: ${error}`);
        getCurrentTime.hasLoggedError = true;
      }
    }
  } 
  // If no VITE_MOCK_TIME but VITE_MOCK_DATE is specified
  else if (mockDateString) {
    try {
      // Get current time
      const now = new Date();
      
      // Parse date format YYYY-MM-DD
      const mockDate = new Date(mockDateString);
      
      // Validate that the date is valid
      if (!isNaN(mockDate.getTime())) {
        // Create a date with mock date but current time
        const hybridTime = new Date(
          mockDate.getFullYear(),
          mockDate.getMonth(),
          mockDate.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds(),
          now.getMilliseconds()
        );
        
        // Only log once when the app starts
        if (!getCurrentTime.hasLoggedMockDate) {
          console.log(`Using mock date with real time: ${hybridTime.toISOString()}`);
          getCurrentTime.hasLoggedMockDate = true;
        }
        return hybridTime;
      } else {
        // Only log error once
        if (!getCurrentTime.hasLoggedError) {
          console.error(`Invalid mock date format: ${mockDateString}, using real date instead`);
          getCurrentTime.hasLoggedError = true;
        }
      }
    } catch (error) {
      // Only log error once
      if (!getCurrentTime.hasLoggedError) {
        console.error(`Error parsing mock date: ${error}`);
        getCurrentTime.hasLoggedError = true;
      }
    }
  }
  
  // Default to actual current time
  return new Date();
  };
  
  // Add static properties
  func.hasLoggedMockTime = false;
  func.hasLoggedMockDate = false;
  func.hasLoggedError = false;
  
  return func;
})();

// Check if today is Easter
export const isEaster = (): boolean => {
  const today = getCurrentTime();
  const easter = getEasterDate(today.getFullYear());
  
  return (
    today.getFullYear() === easter.getFullYear() &&
    today.getMonth() === easter.getMonth() &&
    today.getDate() === easter.getDate()
  );
};

// Format a date nicely with month name
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Get the next Easter date
export const getNextEasterDate = (): Date => {
  const now = getCurrentTime();
  const currentYear = now.getFullYear();
  const easterThisYear = getEasterDate(currentYear);
  
  // If Easter has passed this year or it's not today, look to next year
  if (now > easterThisYear && !isEaster()) {
    return getEasterDate(currentYear + 1);
  }
  
  // Otherwise, return this year's Easter
  return easterThisYear;
};

// Calculate the completion percentage for Easter day
export const getEasterDayProgress = (): number => {
  const now = getCurrentTime();
  
  // If it's not Easter, return 0 progress
  if (!isEaster()) {
    return 0;
  }
  
  // Calculate progress through the day
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  
  const totalDayMs = endOfDay.getTime() - startOfDay.getTime();
  const elapsedMs = now.getTime() - startOfDay.getTime();
  
  // Return percentage (0-100)
  return (elapsedMs / totalDayMs) * 100;
};