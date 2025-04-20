import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { calculateCurrentPosition } from '../utils/geoUtils';
import { calculateBasketsDelivered } from '../utils/basketCalculator';
import { BunnyPosition, ViewerLocation } from '../types';

interface TrackerContextType {
  currentPosition: BunnyPosition | null;
  totalCities: number;
  basketsDelivered: number;
  completionPercentage: number;
  viewerLocation: ViewerLocation | null;
  estimatedArrivalTime: string | null;
  isNearby: boolean;
}

const defaultContext: TrackerContextType = {
  currentPosition: null,
  totalCities: 0,
  basketsDelivered: 0,
  completionPercentage: 0,
  viewerLocation: null,
  estimatedArrivalTime: null,
  isNearby: false
};

const TrackerContext = createContext<TrackerContextType>(defaultContext);

export const useTracker = () => useContext(TrackerContext);

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

  // Update bunny position every second
  useEffect(() => {
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
            // TODO: Calculate estimated arrival time based on journey
            setEstimatedArrivalTime('Coming soon!');
          }
        }
      }
    };

    updatePosition();
    const interval = setInterval(updatePosition, 1000);
    
    return () => clearInterval(interval);
  }, [viewerLocation, estimatedArrivalTime]);

  // Get viewer's location ONCE at startup
  useEffect(() => {
    // Only get location if we don't already have it
    if (!viewerLocation && navigator.geolocation) {
      console.log("Getting user location once at startup");
      
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
            if (!viewerLocation) {
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
  }, []);

  return (
    <TrackerContext.Provider value={{
      currentPosition,
      totalCities,
      basketsDelivered,
      completionPercentage,
      viewerLocation,
      estimatedArrivalTime,
      isNearby
    }}>
      {children}
    </TrackerContext.Provider>
  );
};