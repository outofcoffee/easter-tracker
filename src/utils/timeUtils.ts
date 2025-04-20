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

// Check if today is Easter
export const isEaster = (): boolean => {
  const today = new Date();
  const easter = getEasterDate(today.getFullYear());
  
  return (
    today.getFullYear() === easter.getFullYear() &&
    today.getMonth() === easter.getMonth() &&
    today.getDate() === easter.getDate()
  );
};

// For development, we simulate the progression of Easter day 
// by mapping the current time to the equivalent time on Easter day
export const getSimulatedTime = (): Date => {
  // If it's actually Easter, use the real time
  if (isEaster()) {
    return new Date();
  }
  
  // Otherwise, map the current time of day to a simulated Easter time
  const now = new Date();
  const easterDate = getEasterDate(2025); // Use 2025 Easter
  
  // Create a simulated time that maps today's progress through the day
  // to the same progress through Easter day
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);
  
  const totalDayMs = endOfToday.getTime() - startOfToday.getTime();
  const elapsedMs = now.getTime() - startOfToday.getTime();
  const progress = elapsedMs / totalDayMs;
  
  // Map this progress to Easter day
  const simulatedEaster = new Date(easterDate);
  simulatedEaster.setHours(0, 0, 0, 0);
  simulatedEaster.setTime(simulatedEaster.getTime() + progress * 24 * 60 * 60 * 1000);
  
  return simulatedEaster;
};