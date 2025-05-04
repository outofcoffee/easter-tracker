import { describe, it, expect, beforeAll, vi, beforeEach } from 'vitest';
import { isOverLand, getLandmassName, __resetForTesting } from '../../utils/landmassDetector';
import path from 'path';
import fs from 'fs';

// No need to mock fetch as we're not making HTTP requests

// Helper to log details about a coordinate
const logCoordinateAnalysis = (name: string, lat: number, lon: number, expectedLand: boolean) => {
  console.log(`\n---- ${name} (${lat}, ${lon}) ----`);
  const result = isOverLand(lat, lon);
  console.log(`Is over land: ${result ? 'YES' : 'NO'} (Expected: ${expectedLand ? 'YES' : 'NO'})`);
  console.log(`Landmass name: ${getLandmassName(lat, lon) || 'NONE'}`);
  return result;
};

describe('Indiana Coordinates Detection Test', () => {
  // Setup before each test
  beforeEach(() => {
    // Reset the module state
    __resetForTesting();
    
    // Our improved detector doesn't need to load GeoJSON data from files
    console.log(`Using improved landmass detector with hardcoded polygons for tests`);
  });
  
  describe('Indiana coordinates test', () => {
    it('should correctly identify coordinates in Indiana as land', () => {
      // The problematic coordinates in Indiana (should be land)
      const result = logCoordinateAnalysis('Indiana', 38.3732, -86.8663, true);
      
      // This should be true (land) but is currently false (water)
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
});