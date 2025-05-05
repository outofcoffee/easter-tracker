/**
 * Landmass Detector using GeoJSON
 * 
 * This implementation fetches the GeoJSON data at runtime
 * and uses the Turf.js library for GeoJSON operations.
 */

// Import dependencies
import * as booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';

// We'll use a Map for caching results
const landCheckCache: Map<string, boolean> = new Map();
const landmassNameCache: Map<string, string | undefined> = new Map();

// Constants
const CACHE_PRECISION = 1000; // Round to 3 decimal places for caching (about 100m precision)
const GEOJSON_URL = '/data/map.geo.json'; // Path to the GeoJSON file

// Cache initialization flag and data
let dataInitialized = false;
let geoJsonData: GeoJSON.GeometryCollection | null = null;
let dataFetchPromise: Promise<GeoJSON.GeometryCollection | void> | null = null;

/**
 * Initialize the GeoJSON data (lazy loading)
 * Returns a promise that resolves when the data is loaded
 */
const initializeData = async (): Promise<void> => {
  if (dataInitialized) {
    return; // Data already loaded
  }
  
  if (dataFetchPromise) {
    await dataFetchPromise; // Wait for the existing fetch to complete
    return;
  }
  
  // Start the fetch
  dataFetchPromise = fetch(GEOJSON_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch GeoJSON data: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      geoJsonData = data;
      dataInitialized = true;
      console.log('GeoJSON data loaded successfully');
    })
    .catch(error => {
      console.error('Error loading GeoJSON data:', error);
      // Provide a minimal fallback
      geoJsonData = { 
        type: "GeometryCollection", 
        geometries: [] 
      };
      dataInitialized = true; // Mark as initialized even though it failed
    });
  
  // Wait for fetch to complete
  await dataFetchPromise;
};

/**
 * Reset function for testing
 */
export const __resetForTesting = (): void => {
  landCheckCache.clear();
  landmassNameCache.clear();
  dataInitialized = false;
  geoJsonData = null;
  dataFetchPromise = null;
};

/**
 * Check if a position is over land using GeoJSON
 * Now supports both sync and async usage
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
  
  // If data is not initialized, we need to default to land for safety
  // The async version should be used for initial loading
  if (!dataInitialized) {
    // Start the initialization process but don't wait for it
    initializeData().catch(err => console.error('Error initializing data:', err));
    // Return true (land) as a safe default
    landCheckCache.set(cacheKey, true);
    return true;
  }
  
  try {
    // Create a GeoJSON point from the coordinates
    const pt = point([longitude, latitude]);
    
    // Check if the point is within any landmass polygons
    let isLand = false;
    
    // Only proceed if we have valid geoJsonData
    if (geoJsonData && geoJsonData.geometries) {
      const geometries = geoJsonData.geometries;
      
      for (const geometry of geometries) {
        if (geometry.type === 'MultiPolygon') {
          // We need to create a proper GeoJSON MultiPolygon
          const multiPolygon = {
            type: 'MultiPolygon' as const,
            coordinates: geometry.coordinates
          };
          
          if (booleanPointInPolygon.default(pt, multiPolygon)) {
            isLand = true;
            break;
          }
        }
      }
    } else {
      // If we don't have valid data, default to land
      isLand = true;
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
 * Async version of isOverLand - ensures data is loaded before checking
 * Use this for initial loading or when you need to ensure fresh data
 * 
 * @param latitude Latitude in decimal degrees
 * @param longitude Longitude in decimal degrees
 * @returns Promise<boolean> True if over land, false if over water
 */
export const isOverLandAsync = async (latitude: number, longitude: number): Promise<boolean> => {
  // Initialize data if not already loaded
  if (!dataInitialized) {
    await initializeData();
  }
  
  // Now use the sync version (data is guaranteed to be loaded)
  return isOverLand(latitude, longitude);
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

/**
 * Async version of getLandmassName - ensures data is loaded before checking
 * 
 * @param latitude Latitude in decimal degrees
 * @param longitude Longitude in decimal degrees
 * @returns Promise<string | undefined> The name of the landmass or undefined if over water
 */
export const getLandmassNameAsync = async (latitude: number, longitude: number): Promise<string | undefined> => {
  // Initialize data if not already loaded
  if (!dataInitialized) {
    await initializeData();
  }
  
  // Now use the sync version (data is guaranteed to be loaded)
  return getLandmassName(latitude, longitude);
};

/**
 * Preload the GeoJSON data
 * Call this at application startup to ensure data is ready
 */
export const preloadLandmassData = async (): Promise<void> => {
  return initializeData();
};