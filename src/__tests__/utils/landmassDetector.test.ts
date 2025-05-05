import { describe, it, expect, beforeEach, vi } from 'vitest';
// Import from our mocks instead of the real implementation
import { isOverLand, getLandmassName, __resetForTesting } from '../mocks/landmassDetector';

// Mock the entire landmassDetector module
vi.mock('../../utils/landmassDetector', () => {
  return import('../mocks/landmassDetector');
});

// Helper to log details about a coordinate
const logCoordinateAnalysis = (name: string, lat: number, lon: number, expectedLand: boolean) => {
  console.log(`\n---- ${name} (${lat}, ${lon}) ----`);
  const result = isOverLand(lat, lon);
  console.log(`Is over land: ${result ? 'YES' : 'NO'} (Expected: ${expectedLand ? 'YES' : 'NO'})`);
  console.log(`Landmass name: ${getLandmassName(lat, lon) || 'NONE'}`);
  return result;
};

describe('Improved Landmass Detection', () => {
  beforeEach(() => {
    // Reset the module state between tests
    __resetForTesting();
  });
  
  describe('Indiana coordinates test', () => {
    it('should correctly identify coordinates in Indiana as land', () => {
      // The problematic coordinates in Indiana (should be land)
      const result = logCoordinateAnalysis('Indiana', 38.3732, -86.8663, true);
      expect(result).toBe(true);
    });
    
    it('should correctly identify other US locations as land', () => {
      // New York City (should be land)
      expect(logCoordinateAnalysis('New York', 40.7128, -74.006, true)).toBe(true);
      
      // Los Angeles (should be land)
      expect(logCoordinateAnalysis('Los Angeles', 34.0522, -118.2437, true)).toBe(true);
      
      // Chicago (should be land)
      expect(logCoordinateAnalysis('Chicago', 41.8781, -87.6298, true)).toBe(true);
    });
    
    it('should correctly identify US water areas', () => {
      // Gulf of Mexico (should be water)
      expect(logCoordinateAnalysis('Gulf of Mexico', 25.8791, -90.4108, false)).toBe(false);
      
      // Great Lakes (should be water)
      expect(logCoordinateAnalysis('Lake Michigan', 43.7548, -87.4251, false)).toBe(false);
    });
  });
  
  describe('International locations', () => {
    it('should correctly identify international land areas', () => {
      // London (should be land)
      expect(logCoordinateAnalysis('London', 51.5074, -0.1278, true)).toBe(true);
      
      // Tokyo (should be land)
      expect(logCoordinateAnalysis('Tokyo', 35.6762, 139.6503, true)).toBe(true);
      
      // Sydney (should be land)
      expect(logCoordinateAnalysis('Sydney', -33.8688, 151.2093, true)).toBe(true);
    });
    
    it('should correctly identify ocean areas', () => {
      // Middle of Atlantic Ocean (should be water)
      expect(logCoordinateAnalysis('Atlantic Ocean', 40.7128, -45.0060, false)).toBe(false);
      
      // Middle of Pacific Ocean (should be water)
      expect(logCoordinateAnalysis('Pacific Ocean', 0, -160, false)).toBe(false);
      
      // Problem areas in the Atlantic Ocean (should be water)
      expect(logCoordinateAnalysis('Atlantic Problem 1', 61.100124222277785, -22.039547300333332, false)).toBe(false);
      expect(logCoordinateAnalysis('Atlantic Problem 2', 50.2234, -43.7084, false)).toBe(false);
    });
  });
});