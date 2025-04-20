import { describe, it, expect } from 'vitest';
import { formatNumber } from '../utils/basketCalculator';

describe('Basic Tests', () => {
  it('formats numbers with commas', () => {
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(1000000)).toBe('1,000,000');
    expect(formatNumber(1234567890)).toBe('1,234,567,890');
  });
});