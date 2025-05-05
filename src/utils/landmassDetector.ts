/**
 * Landmass Detector using GeoJSON
 * 
 * This implementation uses the @geo-maps/earth-lands-10m dataset
 * and the Turf.js library for GeoJSON operations.
 */

// Import dependencies
import * as booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';
import earthLandsData from '@geo-maps/earth-lands-10m';

// We'll use a Map for caching results
const landCheckCache: Map<string, boolean> = new Map();
const landmassNameCache: Map<string, string | undefined> = new Map();

// Constants
const CACHE_PRECISION = 1000; // Round to 3 decimal places for caching (about 100m precision)

// Cache initialization flag
let dataInitialized = false;
let geoJsonData: any = null;

/**
 * Initialize the GeoJSON data (lazy loading)
 */
const initializeData = (): void => {
  if (!dataInitialized) {
    geoJsonData = earthLandsData();
    dataInitialized = true;
  }
};

/**
 * Reset function for testing
 */
export const __resetForTesting = (): void => {
  landCheckCache.clear();
  landmassNameCache.clear();
};

/**
 * Check if a position is over land using GeoJSON
 * 
 * @param latitude Latitude in decimal degrees
 * @param longitude Longitude in decimal degrees
 * @returns boolean True if over land, false if over water
 */
export const isOverLand = (latitude: number, longitude: number): boolean => {
  // Round coordinates for caching (about 100m precision)
  const roundedLat = Math.round(latitude * CACHE_PRECISION) / CACHE_PRECISION;
  const roundedLon = Math.round(longitude * CACHE_PRECISION) / CACHE_PRECISION;
  const cacheKey = `${roundedLat},${roundedLon}`;
  
  // Check if we have a cached result
  if (landCheckCache.has(cacheKey)) {
    return landCheckCache.get(cacheKey)!;
  }
  
  // Initialize the GeoJSON data if not already done
  if (!dataInitialized) {
    initializeData();
  }
  
  try {
    // Create a GeoJSON point from the coordinates
    const pt = point([longitude, latitude]);
    
    // Check if the point is within any landmass polygons
    // The 'earth-lands-10m' dataset uses a GeometryCollection
    const geometries = geoJsonData.geometries;
    let isLand = false;
    
    for (const geometry of geometries) {
      if (geometry.type === 'MultiPolygon') {
        // We need to create a proper GeoJSON MultiPolygon
        const multiPolygon = {
          type: 'MultiPolygon',
          coordinates: geometry.coordinates
        };
        
        if (booleanPointInPolygon.default(pt, multiPolygon)) {
          isLand = true;
          break;
        }
      }
    }
    
    // Cache the result
    landCheckCache.set(cacheKey, isLand);
    
    // Limit cache size to prevent memory leaks
    if (landCheckCache.size > 1000) {
      const firstKey = landCheckCache.keys().next().value;
      if (firstKey) {
        landCheckCache.delete(firstKey);
      }
    }
    
    return isLand;
  } catch (error) {
    console.error('Error in isOverLand:', error);
    // Default to land in case of error
    landCheckCache.set(cacheKey, true);
    return true;
  }
};

/**
 * Get the name of the landmass at a given position
 * 
 * @param latitude Latitude in decimal degrees
 * @param longitude Longitude in decimal degrees
 * @returns string | undefined The name of the landmass or undefined if over water
 */
export const getLandmassName = (latitude: number, longitude: number): string | undefined => {
  // Round coordinates for caching (about 100m precision)
  const roundedLat = Math.round(latitude * CACHE_PRECISION) / CACHE_PRECISION;
  const roundedLon = Math.round(longitude * CACHE_PRECISION) / CACHE_PRECISION;
  const cacheKey = `${roundedLat},${roundedLon}`;
  
  // Check if we have a cached result
  if (landmassNameCache.has(cacheKey)) {
    return landmassNameCache.get(cacheKey);
  }
  
  // First check if it's over land
  if (!isOverLand(latitude, longitude)) {
    landmassNameCache.set(cacheKey, undefined);
    return undefined;
  }
  
  // Since the earth-lands dataset doesn't include landmass names,
  // we'll just use a generic name
  const landmassName = "Land";
  
  // Cache the result
  landmassNameCache.set(cacheKey, landmassName);
  
  // Limit cache size to prevent memory leaks
  if (landmassNameCache.size > 1000) {
    const firstKey = landmassNameCache.keys().next().value;
    if (firstKey) {
      landmassNameCache.delete(firstKey);
    }
  }
  
  return landmassName;
};