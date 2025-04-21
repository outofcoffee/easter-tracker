// Format time to display in a user-friendly way
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Get the date of Easter for a given year
export const getEasterDate = (year: number): Date => {
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
  
  // Create a date in UTC (avoiding Date.UTC for better compatibility)
  const easterDate = new Date();
  easterDate.setUTCFullYear(year, month - 1, day);
  easterDate.setUTCHours(0, 0, 0, 0);
  return easterDate;
};

// Define timezone constants
const EASTERNMOST_TIMEZONE = 14; // UTC+14 (Kiritimati/Christmas Island)
const WESTERNMOST_TIMEZONE = -12; // UTC-12 (Baker Island)

// Get when Easter begins globally (in easternmost timezone UTC+14)
export const getGlobalEasterStart = (easterDate: Date): Date => {
  // Create a new date object to avoid modifying the original
  const easterStart = new Date(easterDate);
  
  // Set to midnight UTC
  easterStart.setUTCHours(0, 0, 0, 0);
  
  // Adjust for easternmost timezone (UTC+14)
  // Easter in UTC+14 starts 14 hours before UTC
  // So we need to subtract 14 hours from Easter at UTC
  easterStart.setUTCHours(easterStart.getUTCHours() - EASTERNMOST_TIMEZONE);
  
  return easterStart;
};

// Get when Easter ends globally (in westernmost timezone UTC-12)
export const getGlobalEasterEnd = (easterDate: Date): Date => {
  // Create a new date object to avoid modifying the original
  const easterEnd = new Date(easterDate);
  
  // Set to end of day UTC (23:59:59.999)
  easterEnd.setUTCHours(23, 59, 59, 999);
  
  // Adjust for westernmost timezone (UTC-12)
  // Easter in UTC-12 ends 12 hours after UTC
  // So we need to add 12 hours to Easter end at UTC
  easterEnd.setUTCHours(easterEnd.getUTCHours() - WESTERNMOST_TIMEZONE);
  
  return easterEnd;
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

// Check if a given time is within the global Easter period
export const isWithinGlobalEaster = (time: Date, easterDate: Date): boolean => {
  const globalStart = getGlobalEasterStart(easterDate);
  const globalEnd = getGlobalEasterEnd(easterDate);
  
  return time >= globalStart && time <= globalEnd;
};

// Check if today is Easter (anywhere in the world)
export const isEaster = (): boolean => {
  const now = getCurrentTime();
  const currentYear = now.getFullYear();
  const easterDate = getEasterDate(currentYear);
  
  // Check if we're in the global Easter period
  if (isWithinGlobalEaster(now, easterDate)) {
    return true;
  }
  
  // Also check the previous year's Easter (edge case at year boundary)
  const lastYearEaster = getEasterDate(currentYear - 1);
  if (isWithinGlobalEaster(now, lastYearEaster)) {
    return true;
  }
  
  // Also check next year's Easter (edge case at year boundary)
  const nextYearEaster = getEasterDate(currentYear + 1);
  if (isWithinGlobalEaster(now, nextYearEaster)) {
    return true;
  }
  
  return false;
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
  
  // If current time is before Easter this year, return this year's Easter
  if (now < getGlobalEasterStart(easterThisYear)) {
    return easterThisYear;
  }
  
  // If we're within Easter period, return this year's Easter
  if (isWithinGlobalEaster(now, easterThisYear)) {
    return easterThisYear;
  }
  
  // If Easter has passed, look to next year
  return getEasterDate(currentYear + 1);
};

// Calculate global Easter progress percentage
export const getGlobalEasterProgress = (): number => {
  const now = getCurrentTime();
  const currentYear = now.getFullYear();
  
  // Try this year's Easter
  let easterDate = getEasterDate(currentYear);
  let start = getGlobalEasterStart(easterDate);
  let end = getGlobalEasterEnd(easterDate);
  
  // If not within this year's Easter period, try previous year
  if (now < start || now > end) {
    const previousEaster = getEasterDate(currentYear - 1);
    const prevStart = getGlobalEasterStart(previousEaster);
    const prevEnd = getGlobalEasterEnd(previousEaster);
    
    if (now >= prevStart && now <= prevEnd) {
      start = prevStart;
      end = prevEnd;
      easterDate = previousEaster;
    }
  }
  
  // If not within this or previous year's Easter, try next year
  if (now < start || now > end) {
    const nextEaster = getEasterDate(currentYear + 1);
    const nextStart = getGlobalEasterStart(nextEaster);
    const nextEnd = getGlobalEasterEnd(nextEaster);
    
    if (now >= nextStart && now <= nextEnd) {
      start = nextStart;
      end = nextEnd;
      easterDate = nextEaster;
    }
  }
  
  // If not currently Easter, return 0
  if (now < start || now > end) {
    return 0;
  }
  
  // Calculate progress through the entire global Easter period
  const totalEasterMs = end.getTime() - start.getTime();
  const elapsedMs = now.getTime() - start.getTime();
  
  // Return percentage (0-100)
  return (elapsedMs / totalEasterMs) * 100;
};

// Get timezone abbreviation based on offset in minutes
export const getTimezoneAbbr = (timezoneOffset: number): string => {
  // Convert minutes to hours
  const hours = Math.abs(Math.floor(timezoneOffset / 60));
  const mins = Math.abs(timezoneOffset % 60);
  
  // Format: UTC+/-HH:MM
  return `UTC${timezoneOffset <= 0 ? '+' : '-'}${hours.toString().padStart(2, '0')}${
    mins > 0 ? `:${mins.toString().padStart(2, '0')}` : ''
  }`;
};

// Get local midnight for a specific place based on its timezone
export const getLocalMidnight = (date: Date, timezoneOffset: number): Date => {
  // Create a new date object to avoid modifying the original
  const localMidnight = new Date(date);
  
  // Set to UTC midnight
  localMidnight.setUTCHours(0, 0, 0, 0);
  
  // Adjust for the timezone offset
  // timezoneOffset is in minutes, negative for east, positive for west
  // But getTimezoneOffset() returns the opposite, so we invert it
  const adjustedOffset = -timezoneOffset;
  localMidnight.setMinutes(localMidnight.getMinutes() + adjustedOffset);
  
  return localMidnight;
};

// Calculate the ideal arrival time for a city
// (Should be around midnight on Easter morning in the local timezone)
export const calculateIdealArrivalTime = (city: { timezone: string }, easterDate: Date): Date => {
  // Parse the timezone from string format (e.g., "America/New_York")
  // For simplicity, we'll extract the UTC offset directly
  const timezoneMatch = city.timezone.match(/([+-])(\d{2}):?(\d{2})?/);
  let timezoneOffsetMinutes = 0;
  
  if (timezoneMatch) {
    const sign = timezoneMatch[1] === '-' ? -1 : 1;
    const hours = parseInt(timezoneMatch[2], 10);
    const minutes = timezoneMatch[3] ? parseInt(timezoneMatch[3], 10) : 0;
    timezoneOffsetMinutes = sign * (hours * 60 + minutes);
  } else {
    // If we can't parse, assume UTC
    console.warn(`Could not parse timezone: ${city.timezone}, defaulting to UTC`);
  }
  
  // Get the Easter date and set it to local midnight
  const idealTime = new Date(easterDate);
  
  // Set to midnight UTC, then adjust by timezone offset
  idealTime.setUTCHours(0, 0, 0, 0);
  idealTime.setMinutes(idealTime.getMinutes() - timezoneOffsetMinutes);
  
  return idealTime;
};