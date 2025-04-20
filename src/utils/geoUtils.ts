import { City, BunnyPosition, ViewerLocation } from '../types';
import { getCities } from '../data/cities';

// Calculate distance between two points using Haversine formula
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

// Get nearest city to a location
export const getNearestCity = (
  latitude: number,
  longitude: number,
  cities: City[]
): City => {
  let nearestCity = cities[0];
  let minDistance = calculateDistance(
    latitude,
    longitude,
    cities[0].latitude,
    cities[0].longitude
  );

  for (let i = 1; i < cities.length; i++) {
    const distance = calculateDistance(
      latitude,
      longitude,
      cities[i].latitude,
      cities[i].longitude
    );
    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = cities[i];
    }
  }

  return nearestCity;
};

// Calculate the current position of the Easter Bunny
export const calculateCurrentPosition = async (): Promise<BunnyPosition | null> => {
  try {
    const cities = await getCities();
    
    // Easter Sunday 2025 is April 20
    const easterDate = new Date('2025-04-20T00:00:00Z');
    const now = new Date();
    
    // For testing purposes, we'll scale a full day to the current time within the current day
    // In production, you'd use the actual Easter date
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    
    const totalDayMs = endOfDay.getTime() - startOfDay.getTime();
    const elapsedMs = now.getTime() - startOfDay.getTime();
    const progress = Math.min(1, Math.max(0, elapsedMs / totalDayMs));
    
    const totalCities = cities.length;
    const visitedCitiesFloat = progress * totalCities;
    const visitedCities = Math.floor(visitedCitiesFloat);
    const transitionProgress = visitedCitiesFloat - visitedCities;
    
    // Determine current and next cities
    const currentCityIndex = Math.min(visitedCities, totalCities - 1);
    const nextCityIndex = Math.min(currentCityIndex + 1, totalCities - 1);
    
    const currentCity = cities[currentCityIndex];
    const nextCity = cities[nextCityIndex];
    
    // Interpolate position between cities
    let latitude, longitude;
    
    if (currentCityIndex === nextCityIndex) {
      // At the last city
      latitude = currentCity.latitude;
      longitude = currentCity.longitude;
    } else {
      // Interpolate between cities
      latitude = currentCity.latitude + (nextCity.latitude - currentCity.latitude) * transitionProgress;
      longitude = currentCity.longitude + (nextCity.longitude - currentCity.longitude) * transitionProgress;
    }
    
    // Find nearest city to current position
    const nearestCity = getNearestCity(latitude, longitude, cities);
    
    return {
      latitude,
      longitude,
      currentCity,
      nextCity,
      nearestCity,
      totalCities,
      visitedCities,
      completionPercentage: progress * 100,
      transitionProgress
    };
  } catch (error) {
    console.error('Error calculating bunny position:', error);
    return null;
  }
};

// Get the user's nearest city
export const getUserNearestCity = async (
  latitude: number,
  longitude: number
): Promise<City | null> => {
  try {
    const cities = await getCities();
    return getNearestCity(latitude, longitude, cities);
  } catch (error) {
    console.error('Error finding nearest city:', error);
    return null;
  }
};

// Calculate arrival time for a specific city
export const calculateArrivalTime = (city: City): string => {
  // Easter Sunday 2025 is April 20
  const easterDate = new Date('2025-04-20T00:00:00Z');
  const cities = getCities();
  
  // Find the index of the city in our journey
  const cityIndex = cities.findIndex(c => c.id === city.id);
  if (cityIndex === -1) return 'Unknown';
  
  // Calculate what time the bunny will arrive at this city
  const totalCities = cities.length;
  const dayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const msPerCity = dayInMs / totalCities;
  const arrivalTimeMs = easterDate.getTime() + (cityIndex * msPerCity);
  
  const arrivalTime = new Date(arrivalTimeMs);
  
  // Format the time
  return arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};