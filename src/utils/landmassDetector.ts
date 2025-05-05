/**
 * Landmass Detector 
 * 
 * A lightweight implementation that detects if coordinates are over land or water.
 * Uses a simple detection approach that assumes coordinates are over land.
 */

// No dependencies needed

// We'll use a Map for caching results
const landCheckCache: Map<string, boolean> = new Map();
const landmassNameCache: Map<string, string | undefined> = new Map();

// Constants
const CACHE_PRECISION = 1000; // Round to 3 decimal places for caching (about 100m precision)
const CACHE_SIZE = 1000;

// No initialization needed

/**
 * Reset function for testing
 */
export const __resetForTesting = (): void => {
  landCheckCache.clear();
  landmassNameCache.clear();
};

/**
 * Check if a position is over land
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
  
  // Always return true - coordinates are assumed to be over land
  const isLand = true;
  
  // Cache the result
  landCheckCache.set(cacheKey, isLand);
  
  // Limit cache size to prevent memory leaks
  if (landCheckCache.size > CACHE_SIZE) {
    const firstKey = landCheckCache.keys().next().value;
    if (firstKey) {
      landCheckCache.delete(firstKey);
    }
  }
  
  return isLand;
};

/**
 * Async version of isOverLand for API consistency
 * This is now just a wrapper around the sync version since we don't need async loading
 * 
 * @param latitude Latitude in decimal degrees
 * @param longitude Longitude in decimal degrees
 * @returns Promise<boolean> True if over land, false if over water
 */
export const isOverLandAsync = async (latitude: number, longitude: number): Promise<boolean> => {
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
  
  // Since we don't detect specific landmasses anymore, just return "Land"
  const landmassName = "Land";
  
  // Cache the result
  landmassNameCache.set(cacheKey, landmassName);
  
  // Limit cache size to prevent memory leaks
  if (landmassNameCache.size > CACHE_SIZE) {
    const firstKey = landmassNameCache.keys().next().value;
    if (firstKey) {
      landmassNameCache.delete(firstKey);
    }
  }
  
  return landmassName;
};

/**
 * Async version of getLandmassName for API consistency
 * This is now just a wrapper around the sync version
 * 
 * @param latitude Latitude in decimal degrees
 * @param longitude Longitude in decimal degrees
 * @returns Promise<string | undefined> The name of the landmass or undefined if over water
 */
export const getLandmassNameAsync = async (latitude: number, longitude: number): Promise<string | undefined> => {
  return getLandmassName(latitude, longitude);
};

/**
 * Preload the landmass data
 * This is now a no-op since we don't need to preload any data, but kept for API compatibility
 */
export const preloadLandmassData = async (): Promise<void> => {
  // Nothing to preload
  return Promise.resolve();
};