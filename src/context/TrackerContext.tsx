import { useEffect, useState, ReactNode } from 'react';
import { calculateCurrentPosition } from '../utils/geoUtils';
import { calculateBasketsDelivered } from '../utils/basketCalculator';
import { BunnyPosition, ViewerLocation } from '../types';
import { isEaster, getNextEasterDate, formatDate } from '../utils/timeUtils';
import { TrackerContext } from './TrackerContextDefinition';

interface TrackerProviderProps {
  children: ReactNode;
}

export const TrackerProvider = ({ children }: TrackerProviderProps) => {
  const [currentPosition, setCurrentPosition] = useState<BunnyPosition | null>(null);
  const [totalCities, setTotalCities] = useState(0);
  const [basketsDelivered, setBasketsDelivered] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [viewerLocation, setViewerLocation] = useState<ViewerLocation | null>(null);
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState<string | null>(null);
  const [isNearby, setIsNearby] = useState(false);
  const [isEasterDay, setIsEasterDay] = useState(isEaster());
  const [nextEasterDate, setNextEasterDate] = useState(getNextEasterDate());
  const [nextEasterFormatted, setNextEasterFormatted] = useState(formatDate(getNextEasterDate()));

  // Check if it's Easter Day and update relevant information
  useEffect(() => {
    const checkEaster = () => {
      // Update Easter status
      const easterDay = isEaster();
      setIsEasterDay(easterDay);
      
      // Update next Easter date if needed
      const nextEaster = getNextEasterDate();
      setNextEasterDate(nextEaster);
      setNextEasterFormatted(formatDate(nextEaster));
    };
    
    // Check initially
    checkEaster();
    
    // Check periodically (every minute is enough for date changes)
    const interval = setInterval(checkEaster, 60000);
    return () => clearInterval(interval);
  }, []);

  // Update bunny position every second (only on Easter)
  useEffect(() => {
    // If it's not Easter, don't track position
    if (!isEasterDay) {
      setCurrentPosition(null);
      setCompletionPercentage(0);
      setBasketsDelivered(0);
      return;
    }
    
    const updatePosition = async () => {
      const position = await calculateCurrentPosition();
      
      if (position) {
        setCurrentPosition(position);
        setTotalCities(position.totalCities);
        setCompletionPercentage(position.completionPercentage);
        
        // Calculate baskets
        const baskets = calculateBasketsDelivered(position.completionPercentage);
        setBasketsDelivered(baskets);
        
        // Check if bunny is near viewer
        if (viewerLocation) {
          const isNear = position.nearestCity?.name === viewerLocation.nearestCity?.name;
          setIsNearby(isNear);
          
          if (!estimatedArrivalTime && viewerLocation.nearestCity) {
            // Calculate estimated arrival time based on journey
            const { calculateArrivalTime } = await import('../utils/geoUtils');
            const arrivalTime = await calculateArrivalTime(viewerLocation.nearestCity);
            setEstimatedArrivalTime(arrivalTime);
          }
        }
      }
    };

    updatePosition();
    const interval = setInterval(updatePosition, 1000);
    
    return () => clearInterval(interval);
  }, [viewerLocation, estimatedArrivalTime, isEasterDay, viewerLocation?.nearestCity]);

  // Get viewer's location ONCE at startup, but only during Easter period
  useEffect(() => {
    // Only get location if:
    // 1. We don't already have it
    // 2. Geolocation is available
    // 3. It's Easter day (do not request in development when not Easter)
    const shouldRequestLocation = 
      !viewerLocation && 
      navigator.geolocation && 
      isEasterDay;
    
    if (shouldRequestLocation) {
      console.log(`Getting user location once during Easter period (isEasterDay: ${isEasterDay})`);
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            console.log("Got user location:", latitude, longitude);
            
            // Import getUserNearestCity directly to avoid circular imports
            const { getUserNearestCity } = await import('../utils/geoUtils');
            const nearestCity = await getUserNearestCity(latitude, longitude);
            
            setViewerLocation({
              latitude,
              longitude,
              nearestCity
            });
            
            // If we have the nearest city, set an estimated arrival time
            if (nearestCity) {
              const { calculateArrivalTime } = await import('../utils/geoUtils');
              const arrivalTime = await calculateArrivalTime(nearestCity);
              setEstimatedArrivalTime(arrivalTime);
            }
          } catch (error) {
            console.error("Error processing location:", error);
          }
        },
        (error) => {
          console.error('Error getting location:', error.message);
          
          // Try once more after a delay (user might have dismissed the prompt)
          setTimeout(() => {
            if (!viewerLocation && isEasterDay) {
              console.log("Retrying geolocation once...");
              navigator.geolocation.getCurrentPosition(
                async (position) => {
                  const { latitude, longitude } = position.coords;
                  const { getUserNearestCity, calculateArrivalTime } = await import('../utils/geoUtils');
                  const nearestCity = await getUserNearestCity(latitude, longitude);
                  
                  setViewerLocation({
                    latitude,
                    longitude,
                    nearestCity
                  });
                  
                  if (nearestCity) {
                    const arrivalTime = await calculateArrivalTime(nearestCity);
                    setEstimatedArrivalTime(arrivalTime);
                  }
                },
                (retryError) => {
                  console.error('Retry failed:', retryError.message);
                },
                { timeout: 10000, maximumAge: 0 }
              );
            }
          }, 3000);
        },
        { 
          timeout: 10000, 
          enableHighAccuracy: true, 
          // Cache position for 24 hours
          maximumAge: 24 * 60 * 60 * 1000 
        }
      );
    }
  }, [viewerLocation, isEasterDay]);

  return (
    <TrackerContext.Provider value={{
      currentPosition,
      totalCities,
      basketsDelivered,
      completionPercentage,
      viewerLocation,
      estimatedArrivalTime,
      isNearby,
      isEasterDay,
      nextEasterDate,
      nextEasterFormatted
    }}>
      {children}
    </TrackerContext.Provider>
  );
};