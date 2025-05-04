import { describe, it, expect, beforeEach } from 'vitest';
import { isOverLand, getLandmassName, __resetForTesting } from '../../utils/landmassDetectorGeoJSON';

// Helper to log details about a coordinate
const logCoordinateAnalysis = (name: string, lat: number, lon: number, expectedLand: boolean) => {
  console.log(`\n---- ${name} (${lat}, ${lon}) ----`);
  const result = isOverLand(lat, lon);
  console.log(`Is over land: ${result ? 'YES' : 'NO'} (Expected: ${expectedLand ? 'YES' : 'NO'})`);
  console.log(`Landmass name: ${getLandmassName(lat, lon) || 'NONE'}`);
  return result;
};

describe('GeoJSON Landmass Detection Test', () => {
  // Setup before each test
  beforeEach(() => {
    // Reset the module state
    __resetForTesting();
  });
  
  describe('US landmass detection', () => {
    it('should correctly identify Indiana coordinates as land', () => {
      // The problematic Indiana coordinates 
      const result = logCoordinateAnalysis('Indiana', 38.3732, -86.8663, true);
      expect(result).toBe(true);
    });
    
    it('should correctly identify major US cities as land', () => {
      // New York
      expect(logCoordinateAnalysis('New York', 40.7128, -74.0060, true)).toBe(true);
      
      // Los Angeles
      expect(logCoordinateAnalysis('Los Angeles', 34.0522, -118.2437, true)).toBe(true);
      
      // Chicago
      expect(logCoordinateAnalysis('Chicago', 41.8781, -87.6298, true)).toBe(true);
    });
  });
  
  describe('UK landmass detection', () => {
    it('should correctly identify major UK cities as land', () => {
      // London
      expect(logCoordinateAnalysis('London', 51.5074, -0.1278, true)).toBe(true);
      
      // Edinburgh
      expect(logCoordinateAnalysis('Edinburgh', 55.9533, -3.1883, true)).toBe(true);
      
      // Cardiff
      expect(logCoordinateAnalysis('Cardiff', 51.4837, -3.1681, true)).toBe(true);
      
      // Belfast (the problematic one)
      expect(logCoordinateAnalysis('Belfast', 54.5973, -5.9301, true)).toBe(true);
    });
    
    it('should correctly identify UK coastal areas as land', () => {
      // Dover (southeast coast)
      expect(logCoordinateAnalysis('Dover', 51.1295, 1.3089, true)).toBe(true);
      
      // Cornwall (southwest tip)
      expect(logCoordinateAnalysis('Cornwall', 50.1167, -5.4164, true)).toBe(true);
      
      // North Scotland
      expect(logCoordinateAnalysis('North Scotland', 58.6373, -3.0701, true)).toBe(true);
    });
  });
  
  describe('Water detection', () => {
    it('should correctly identify oceans as water', () => {
      // Atlantic Ocean
      expect(logCoordinateAnalysis('Atlantic Ocean', 25.0, -40.0, false)).toBe(false);
      
      // Pacific Ocean
      expect(logCoordinateAnalysis('Pacific Ocean', 0.0, -150.0, false)).toBe(false);
      
      // Indian Ocean
      expect(logCoordinateAnalysis('Indian Ocean', -20.0, 80.0, false)).toBe(false);
    });
    
    it('should correctly identify the English Channel as water', () => {
      // Middle of English Channel
      expect(logCoordinateAnalysis('English Channel', 50.5000, 0.0000, false)).toBe(false);
    });
    
    it('should correctly identify the Irish Sea as water', () => {
      // Irish Sea between Wales and Ireland
      expect(logCoordinateAnalysis('Irish Sea', 53.5000, -5.0000, false)).toBe(false);
    });
  });
});