import { useTracker } from '../../context/TrackerContext';
import { formatNumber } from '../../utils/basketCalculator';

const ProgressTracker = () => {
  const { basketsDelivered, completionPercentage, totalCities, currentPosition } = useTracker();
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold text-easter-purple mb-3">Easter Bunny Progress</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <h3 className="text-md font-semibold">Baskets Delivered</h3>
          <div className="text-2xl font-bold text-easter-pink animate-bounce">
            {formatNumber(basketsDelivered)}
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-md font-semibold">Journey Complete</h3>
          <div className="text-2xl font-bold text-easter-green">
            {Math.round(completionPercentage)}%
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-easter-pink h-4 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm">
          {currentPosition?.visitedCities || 0} of {totalCities} cities visited
        </p>
        {currentPosition?.currentCity && (
          <p className="font-medium mt-2">
            Currently in {currentPosition.currentCity.name}, {currentPosition.currentCity.country}
          </p>
        )}
        {currentPosition?.nextCity && currentPosition.nextCity.id !== currentPosition?.currentCity?.id && (
          <p className="text-sm text-gray-600 mt-1">
            Next stop: {currentPosition.nextCity.name}, {currentPosition.nextCity.country}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;