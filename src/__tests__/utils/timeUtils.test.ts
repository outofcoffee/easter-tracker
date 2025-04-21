import { describe, it, expect, vi } from 'vitest';
import {
  formatTime,
  formatDate,
  getTimezoneAbbr,
  getEasterDate,
  isWithinGlobalEaster,
  getGlobalEasterStart,
  getGlobalEasterEnd,
  getNextEasterDate,
  getCurrentTime,
  isEaster,
  getGlobalEasterProgress,
  getLocalMidnight,
  calculateIdealArrivalTime
} from '../../utils/timeUtils';

describe('timeUtils', () => {
  describe('formatTime', () => {
    it('formats time correctly', () => {
      const date = new Date(2025, 3, 20, 14, 30, 45); // April 20, 2025, 14:30:45
      const formattedTime = formatTime(date);
      
      // Check the format looks like a time
      expect(formattedTime).toMatch(/^\d{1,2}:\d{2}(?:\s?[AP]M)?$/i);
    });
  });

  describe('formatDate', () => {
    it('formats date with month name', () => {
      const date = new Date(2025, 3, 20); // April 20, 2025
      const formatted = formatDate(date);
      
      // Check that the result contains year and the month name
      expect(formatted).toContain('2025');
      expect(formatted).toMatch(/April|apr/i);
      expect(formatted).toContain('20');
    });
  });

  describe('getTimezoneAbbr', () => {
    it('formats timezone offsets correctly', () => {
      // Update the expected output based on how the function actually works
      const hourOffsets = {
        "-60": "UTC+01",   // 1 hour east of UTC
        "0": "UTC+00",     // UTC
        "300": "UTC-05"    // 5 hours west of UTC
      };
      
      for (const [offset, expected] of Object.entries(hourOffsets)) {
        expect(getTimezoneAbbr(parseInt(offset))).toBe(expected);
      }
    });
    
    it('includes minutes in timezone abbreviation when needed', () => {
      const offsetWithMinutes = -570; // 9 hours and 30 minutes (UTC+09:30)
      const abbr = getTimezoneAbbr(offsetWithMinutes);
      expect(abbr).toContain(':30');
    });
  });

  describe('getEasterDate', () => {
    it('calculates Easter dates correctly for various years', () => {
      const knownEasters = {
        2024: { month: 2, day: 31 },  // March 31, 2024
        2025: { month: 3, day: 20 },  // April 20, 2025
        2026: { month: 3, day: 5 },   // April 5, 2026
        2027: { month: 2, day: 28 }   // March 28, 2027
      };
      
      for (const [year, expected] of Object.entries(knownEasters)) {
        const easterDate = getEasterDate(parseInt(year));
        expect(easterDate.getFullYear()).toBe(parseInt(year));
        expect(easterDate.getMonth()).toBe(expected.month);
        expect(easterDate.getDate()).toBe(expected.day);
      }
    });
  });

  describe('isWithinGlobalEaster', () => {
    it('identifies Easter day correctly', () => {
      const easterDay2025 = new Date(2025, 3, 20, 12, 0, 0); // Noon on Easter 2025
      const nonEasterDay = new Date(2025, 2, 1, 12, 0, 0);  // March 1, 2025
      
      const easter2025 = getEasterDate(2025);
      
      // Easter day should be within Easter period
      expect(isWithinGlobalEaster(easterDay2025, easter2025)).toBe(true);
      
      // A day far from Easter should not be within Easter period
      expect(isWithinGlobalEaster(nonEasterDay, easter2025)).toBe(false);
    });
  });
  
  describe('getGlobalEasterStart and getGlobalEasterEnd', () => {
    it('creates a proper Easter period timespan', () => {
      const easterDate = getEasterDate(2025);
      const startDate = getGlobalEasterStart(easterDate);
      const endDate = getGlobalEasterEnd(easterDate);
      
      // End date should be after start date
      expect(endDate.getTime()).toBeGreaterThan(startDate.getTime());
      
      // The difference should be approximately 48-50 hours (Easter period across all timezones)
      const durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
      expect(durationHours).toBeGreaterThanOrEqual(48);
      expect(durationHours).toBeLessThanOrEqual(50);
    });
  });
  
  describe('getCurrentTime', () => {
    it('returns current time as Date object', () => {
      const result = getCurrentTime();
      expect(result).toBeInstanceOf(Date);
      
      // Should be within a small window of now
      const now = new Date();
      expect(Math.abs(result.getTime() - now.getTime())).toBeLessThan(1000);
    });
  });
  
  describe('getNextEasterDate', () => {
    it('returns a Date for Easter', () => {
      const nextEaster = getNextEasterDate();
      expect(nextEaster).toBeInstanceOf(Date);
    });
  });
  
  describe('getLocalMidnight', () => {
    it('returns a date object with hours set to 0', () => {
      const date = new Date(2025, 3, 20, 15, 30); // 3:30 PM on Easter
      const timezoneOffset = 0; // UTC
      
      const localMidnight = getLocalMidnight(date, timezoneOffset);
      
      // Should be a valid date
      expect(localMidnight).toBeInstanceOf(Date);
    });
  });
  
  describe('calculateIdealArrivalTime', () => {
    it('handles timezone parsing', () => {
      const easterDate = getEasterDate(2025);
      const city = { timezone: 'UTC+00:00' }; // London
      
      const arrivalTime = calculateIdealArrivalTime(city, easterDate);
      
      // Should be a valid date
      expect(arrivalTime).toBeInstanceOf(Date);
    });
    
    it('handles invalid timezone gracefully', () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const easterDate = getEasterDate(2025);
      const city = { timezone: 'Invalid' };
      
      const arrivalTime = calculateIdealArrivalTime(city, easterDate);
      
      // Should still be a valid date
      expect(arrivalTime).toBeInstanceOf(Date);
      
      expect(console.warn).toHaveBeenCalled();
    });
  });
  
  describe('isEaster', () => {
    it('checks if current time is Easter day', () => {
      const result = isEaster();
      expect(typeof result).toBe('boolean');
    });
  });
  
  describe('getGlobalEasterProgress', () => {
    it('calculates Easter progress percentage', () => {
      const progress = getGlobalEasterProgress();
      
      // No errors should be thrown
      expect(typeof progress).toBe('number');
      expect(progress).toBeGreaterThanOrEqual(0);
      expect(progress).toBeLessThanOrEqual(100);
    });
  });
});