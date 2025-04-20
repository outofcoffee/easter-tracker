import { useTracker } from '../../context/TrackerContext';

const LocationInfo = () => {
  const { viewerLocation, estimatedArrivalTime, isNearby } = useTracker();

  if (!viewerLocation?.nearestCity) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-easter-yellow mb-3">Your Location</h2>
        <p>Share your location to see when the Easter Bunny will visit you!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-easter-yellow mb-3">Your Location</h2>
      
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
            <p className="text-sm">The Easter Bunny will visit at approximately:</p>
            <p className="text-2xl font-bold text-easter-purple mt-1">{estimatedArrivalTime}</p>
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