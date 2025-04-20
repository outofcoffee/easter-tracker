import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useTracker } from '../../context/TrackerContext';
import { getRandomFact, getFactForCountry } from '../../data/easterFacts';
import { useEffect, useState } from 'react';
import { BunnyAnimationState, calculateAnimationState } from '../../utils/animationUtils';

// For initial testing, we'll use a placeholder bunny icon
// In a real implementation, we'd use actual bunny sprites for different animation states
const bunnyIcon = new L.Icon({
  iconUrl: 'https://img.icons8.com/color/96/000000/rabbit.png',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48]
});

interface BunnyMarkerProps {
  position: [number, number];
}

const BunnyMarker: React.FC<BunnyMarkerProps> = ({ position }) => {
  const { currentPosition } = useTracker();
  const [fact, setFact] = useState(getRandomFact());
  const [animationState, setAnimationState] = useState(BunnyAnimationState.HOPPING);
  
  // Update animation state based on bunny's progress
  useEffect(() => {
    if (currentPosition) {
      const newState = calculateAnimationState(
        currentPosition.completionPercentage,
        currentPosition.transitionProgress
      );
      setAnimationState(newState);
    }
  }, [currentPosition]);
  
  // Update fact when the bunny reaches a new city
  useEffect(() => {
    if (currentPosition?.currentCity) {
      const countryFact = getFactForCountry(currentPosition.currentCity.country);
      setFact(countryFact || getRandomFact());
    }
  }, [currentPosition?.currentCity?.id]);
  
  return (
    <Marker position={position} icon={bunnyIcon}>
      <Popup className="bunny-popup">
        <div className="text-center">
          <h3 className="font-bold text-lg text-easter-pink">Easter Bunny</h3>
          {currentPosition?.currentCity && (
            <p>
              Currently in {currentPosition.currentCity.name}, {currentPosition.currentCity.country}
            </p>
          )}
          <div className="mt-2 bg-easter-yellow p-2 rounded-lg">
            <p className="text-sm italic">{fact.text}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default BunnyMarker;