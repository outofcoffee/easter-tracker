import { City, BunnyPosition, DEFAULT_MAP_ZOOM } from '../types';
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
export const calculateCurrentPosition = async (mapZoomLevel?: number): Promise<BunnyPosition | null> => {
  try {
    // Import time utilities
    const { 
      isEaster,
      getEasterDate,
      getGlobalEasterStart,
      getGlobalEasterEnd,
      getCurrentTime,
      calculateIdealArrivalTime
    } = await import('./timeUtils');
    
    // If it's not Easter anywhere in the world, return null
    if (!isEaster()) {
      return null;
    }
    
    // Get the cities sorted by timezone (easternmost first)
    const cities = await getCities();
    
    // Get current time and Easter date
    const now = getCurrentTime();
    const currentYear = now.getFullYear();
    let easterDate = getEasterDate(currentYear);
    
    // Check if we're in Easter period for previous or next year
    const thisYearStart = getGlobalEasterStart(easterDate);
    const thisYearEnd = getGlobalEasterEnd(easterDate);
    
    if (now < thisYearStart || now > thisYearEnd) {
      // Check previous year
      const prevYearEaster = getEasterDate(currentYear - 1);
      const prevYearStart = getGlobalEasterStart(prevYearEaster);
      const prevYearEnd = getGlobalEasterEnd(prevYearEaster);
      
      if (now >= prevYearStart && now <= prevYearEnd) {
        easterDate = prevYearEaster;
      } else {
        // Check next year
        const nextYearEaster = getEasterDate(currentYear + 1);
        const nextYearStart = getGlobalEasterStart(nextYearEaster);
        const nextYearEnd = getGlobalEasterEnd(nextYearEaster);
        
        if (now >= nextYearStart && now <= nextYearEnd) {
          easterDate = nextYearEaster;
        }
      }
    }
    
    // Calculate delivery schedule for each city
    // Each city should be visited at midnight local time
    const citySchedule = cities.map(city => {
      const arrivalTime = calculateIdealArrivalTime(city, easterDate);
      return {
        city,
        arrivalTime
      };
    });
    
    // Sort schedule by arrival time
    citySchedule.sort((a, b) => a.arrivalTime.getTime() - b.arrivalTime.getTime());
    
    // Calculate global progress through Easter
    const globalStart = getGlobalEasterStart(easterDate);
    const globalEnd = getGlobalEasterEnd(easterDate);
    const totalDuration = globalEnd.getTime() - globalStart.getTime();
    const elapsedTime = now.getTime() - globalStart.getTime();
    const progress = Math.max(0, Math.min(1, elapsedTime / totalDuration));
    
    // Find current position in schedule
    let currentIndex = 0;
    let nextIndex = 1;
    let transitionProgress = 0;
    
    // If we're before the first city arrival time, we're en route to the first city
    if (now < citySchedule[0].arrivalTime) {
      currentIndex = 0;
      nextIndex = 0;
      
      // Calculate progress as percentage of time between start and first arrival
      const timeToFirstCity = citySchedule[0].arrivalTime.getTime() - globalStart.getTime();
      transitionProgress = timeToFirstCity > 0 ? elapsedTime / timeToFirstCity : 1;
    } 
    // If we're after the last city arrival time, we're at the last city
    else if (now >= citySchedule[citySchedule.length - 1].arrivalTime) {
      currentIndex = citySchedule.length - 1;
      nextIndex = citySchedule.length - 1;
      transitionProgress = 1;
    } 
    // Otherwise, find where we are in the schedule
    else {
      for (let i = 0; i < citySchedule.length - 1; i++) {
        if (now >= citySchedule[i].arrivalTime && now < citySchedule[i + 1].arrivalTime) {
          currentIndex = i;
          nextIndex = i + 1;
          
          // Calculate progress between cities
          const segmentDuration = citySchedule[nextIndex].arrivalTime.getTime() - 
                                 citySchedule[currentIndex].arrivalTime.getTime();
          const segmentElapsed = now.getTime() - citySchedule[currentIndex].arrivalTime.getTime();
          transitionProgress = segmentDuration > 0 ? segmentElapsed / segmentDuration : 1;
          break;
        }
      }
    }
    
    const currentCity = citySchedule[currentIndex].city;
    const nextCity = citySchedule[nextIndex].city;
    
    // Interpolate position between cities
    let latitude, longitude;
    
    if (currentIndex === nextIndex) {
      // At a city (not in transit) - implement "hopping" delivery pattern
      // Much more dramatic and visible movement
      
      // Use time to create discrete "hops" between delivery points
      const now = Date.now();
      const hopPeriod = 1000; // Time in ms between major position changes (1 second)
      const hopPhase = (now % hopPeriod) / hopPeriod; // 0-1 progress through current hop
      
      // Create "hop points" based on time
      // This creates a new random target every second
      const hopSeed = Math.floor(now / hopPeriod);
      
      // Use the hop seed to generate pseudo-random but consistent coordinates
      // This creates a random but not chaotic pattern of delivery points
      const rand1 = Math.sin(hopSeed * 123.456) * 0.5 + 0.5; // 0-1
      const rand2 = Math.cos(hopSeed * 789.012) * 0.5 + 0.5; // 0-1
      
      // Scale movement based on zoom level - but MUCH larger than before
      // At zoom level 4, we want movement to be easily visible
      const zoom = mapZoomLevel || DEFAULT_MAP_ZOOM;
      
      // Calculate delivery range based on zoom 
      // This is much more aggressive than before - up to 5-8 degrees at low zoom
      // which is very noticeable even on a world map
      let deliveryRange;
      if (zoom <= 2) {
        // World view - massive jumps (countries apart)
        deliveryRange = 8.0;
      } else if (zoom <= 4) {
        // Continental view - large jumps (regions apart)
        deliveryRange = 4.0;
      } else if (zoom <= 6) {
        // Country view - medium jumps (cities apart)
        deliveryRange = 2.0;
      } else if (zoom <= 8) {
        // Regional view - smaller jumps (neighborhoods apart)
        deliveryRange = 1.0;
      } else if (zoom <= 10) {
        // City view - very small jumps (blocks apart)
        deliveryRange = 0.5;
      } else {
        // Street view - tiny jumps (houses apart)
        deliveryRange = 0.2;
      }
      
      // Calculate current target position
      const targetLat = currentCity.latitude + (rand1 * 2 - 1) * deliveryRange;
      const targetLon = currentCity.longitude + (rand2 * 2 - 1) * deliveryRange;
      
      // Previous position (another random point)
      const prevRand1 = Math.sin((hopSeed - 1) * 123.456) * 0.5 + 0.5;
      const prevRand2 = Math.cos((hopSeed - 1) * 789.012) * 0.5 + 0.5;
      const prevLat = currentCity.latitude + (prevRand1 * 2 - 1) * deliveryRange;
      const prevLon = currentCity.longitude + (prevRand2 * 2 - 1) * deliveryRange;
      
      // Create a hopping effect with a slight pause at each delivery point
      // This makes the movement more deliberate and noticeable
      let effectivePhase = hopPhase;
      
      // Add "rest" at beginning and end of hop (20% of time)
      if (hopPhase < 0.1) {
        // Starting position - slight pause
        effectivePhase = 0;
      } else if (hopPhase > 0.9) {
        // Ending position - slight pause
        effectivePhase = 1;
      } else {
        // Rescale the middle portion for smooth transition
        effectivePhase = (hopPhase - 0.1) / 0.8;
        
        // Add a slight arc to the hop using a sine wave
        // This makes it look more like hopping than straight line movement
        const hopHeight = Math.sin(effectivePhase * Math.PI);
        effectivePhase = effectivePhase + hopHeight * 0.1; // Small arc effect
      }
      
      // Interpolate between previous and target positions
      latitude = prevLat + (targetLat - prevLat) * effectivePhase;
      longitude = prevLon + (targetLon - prevLon) * effectivePhase;
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
      totalCities: cities.length,
      visitedCities: currentIndex,
      completionPercentage: progress * 100,
      transitionProgress,
      mapZoomLevel
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
export const calculateArrivalTime = async (city: City): Promise<string> => {
  // Import time utilities
  const { getEasterDate, calculateIdealArrivalTime, formatTime } = await import('./timeUtils');
  
  // Calculate for Easter this year
  const now = new Date();
  const easterDate = getEasterDate(now.getFullYear());
  
  // Calculate the ideal arrival time (midnight local time on Easter)
  const arrivalTime = calculateIdealArrivalTime(city, easterDate);
  
  // Format the time for display
  return formatTime(arrivalTime);
};