import { useEffect, useState } from 'react';
import { useTracker } from '../../hooks/useTracker';
import { getCurrentTime, formatTime } from '../../utils/timeUtils';

const LocationInfo = () => {
  const { viewerLocation, estimatedArrivalTime, isNearby, isEasterDay } = useTracker();
  const [permissionStatus, setPermissionStatus] = useState<string>('prompt');
  
  // Check geolocation permission status - only if it's Easter Day
  useEffect(() => {
    // Skip permission check if it's not Easter Day
    if (!isEasterDay) return;
    
    const checkPermission = async () => {
      try {
        if ('permissions' in navigator) {
          const status = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
          setPermissionStatus(status.state);
          
          // Listen for permission changes
          status.addEventListener('change', () => {
            setPermissionStatus(status.state);
          });
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.debug('Error checking permission status');
        }
      }
    };
    
    checkPermission();
  }, [isEasterDay]);
  
  // Don't show location info at all if it's not Easter
  if (!isEasterDay) {
    return null;
  }
  
  // Handle prompt permission or loading state
  if (!viewerLocation) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-easter-dark-purple mb-3">Your Location</h2>
        {permissionStatus === 'denied' ? (
          <div>
            <p>Please enable location access in your browser settings to see when the Easter Bunny will visit you!</p>
            <p className="text-sm mt-2 text-gray-500">Check your browser's permissions settings for this site.</p>
          </div>
        ) : (
          <div>
            <p>Share your location to see when the Easter Bunny will visit you!</p>
            <div className="mt-3 flex justify-center">
              <div className="w-6 h-6 border-4 border-easter-pink border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // If we have location but no nearest city yet
  if (!viewerLocation.nearestCity) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-easter-dark-purple mb-3">Your Location</h2>
        <p>Finding the nearest city to you...</p>
        <div className="mt-3 flex justify-center">
          <div className="w-6 h-6 border-4 border-easter-pink border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-easter-dark-purple mb-3">Your Location</h2>
      
      <div className="text-center">
        <p className="font-medium">
          You're near {viewerLocation.nearestCity.name}, {viewerLocation.nearestCity.country}
        </p>
        
        {isNearby ? (
          <div className="mt-4 bg-easter-pink p-3 rounded-lg animate-pulse">
            <p className="font-bold text-white">The Easter Bunny is in your area right now!</p>
            <p className="text-white text-sm">Keep an eye out for Easter surprises!</p>
          </div>
        ) : estimatedArrivalTime ? (
          <div className="mt-4">
            <p className="text-sm">
              {formatTime(getCurrentTime()) > estimatedArrivalTime
                ? "The Easter Bunny visited at approximately:"
                : "The Easter Bunny will visit at approximately:"}
            </p>
            <p className="text-2xl font-bold text-easter-dark-purple mt-1">{estimatedArrivalTime}</p>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-sm">Calculating when the Easter Bunny will visit you...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationInfo;