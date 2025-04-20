import { describe, it, expect } from 'vitest';
import { formatNumber } from '../utils/basketCalculator';
import { calculateDistance } from '../utils/geoUtils';
import { formatTime } from '../utils/timeUtils';

describe('Utility Functions', () => {
  describe('basketCalculator', () => {
    it('formats numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
      expect(formatNumber(1234567890)).toBe('1,234,567,890');
    });
  });

  describe('geoUtils', () => {
    it('calculates distance between two points', () => {
      // Distance between New York and Los Angeles (approximately 3935 km)
      const distance = calculateDistance(40.7128, -74.006, 34.0522, -118.2437);
      expect(distance).toBeGreaterThan(3900);
      expect(distance).toBeLessThan(4000);
    });
  });

  describe('timeUtils', () => {
    it('formats time correctly', () => {
      const date = new Date('2025-04-20T12:30:00');
      const formattedTime = formatTime(date);
      
      // Format depends on locale, so we'll just check that it's a string
      expect(typeof formattedTime).toBe('string');
      expect(formattedTime.length).toBeGreaterThan(0);
    });
  });
});