import { describe, it, expect } from 'vitest';
import { calculateBasketsDelivered, formatNumber } from '../../utils/basketCalculator';

describe('basketCalculator', () => {
  describe('calculateBasketsDelivered', () => {
    it('returns 0 baskets when completion is 0%', () => {
      expect(calculateBasketsDelivered(0)).toBe(0);
    });

    it('returns correct baskets for 50% completion', () => {
      const baskets = calculateBasketsDelivered(50);
      // Based on 8.1 billion population / 4 people per basket * 0.5
      expect(baskets).toBe(Math.floor(Math.ceil(8_100_000_000 / 4) * 0.5));
    });

    it('returns correct baskets for 100% completion', () => {
      const baskets = calculateBasketsDelivered(100);
      // Based on 8.1 billion population / 4 people per basket
      expect(baskets).toBe(Math.ceil(8_100_000_000 / 4));
    });

    it('handles decimal completion percentages correctly', () => {
      const baskets = calculateBasketsDelivered(33.33);
      // Based on 8.1 billion population / 4 people per basket * 0.3333
      expect(baskets).toBe(Math.floor(Math.ceil(8_100_000_000 / 4) * (33.33 / 100)));
    });
  });

  describe('formatNumber', () => {
    it('formats integers with commas in British English style', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
      expect(formatNumber(1234567890)).toBe('1,234,567,890');
    });

    it('formats negative numbers correctly', () => {
      expect(formatNumber(-1000)).toBe('-1,000');
    });

    it('handles zero correctly', () => {
      expect(formatNumber(0)).toBe('0');
    });

    it('handles decimal numbers correctly', () => {
      // British English typically uses decimal point
      const formatted = formatNumber(1234.56);
      // The exact format might vary by locale, so we just check the structure
      expect(formatted).toContain('1,234');
      expect(formatted).toContain('56');
    });
  });
});