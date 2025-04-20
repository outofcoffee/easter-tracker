import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useTracker } from '../../context/TrackerContext';
import BunnyMarker from '../BunnySprite/BunnyMarker';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Component to handle map positioning
const MapController = () => {
  const { currentPosition } = useTracker();
  const map = useMap();
  
  useEffect(() => {
    if (currentPosition) {
      map.setView(
        [currentPosition.latitude, currentPosition.longitude],
        map.getZoom()
      );
    }
  }, [currentPosition, map]);
  
  return null;
};

const Map = () => {
  const { currentPosition, viewerLocation } = useTracker();
  const mapRef = useRef<L.Map | null>(null);
  
  // Default position (middle of the world)
  const defaultPosition: [number, number] = [0, 0];
  const defaultZoom = 2;
  
  // Update ref when map is created
  const MapInitializer = () => {
    const map = useMap();
    useEffect(() => {
      mapRef.current = map;
    }, [map]);
    return null;
  };
  
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={currentPosition 
          ? [currentPosition.latitude, currentPosition.longitude] 
          : defaultPosition}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
      >
        <MapInitializer />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Easter Bunny Marker */}
        {currentPosition && (
          <BunnyMarker position={[currentPosition.latitude, currentPosition.longitude]} />
        )}
        
        {/* User Location Marker */}
        {viewerLocation && (
          <Marker position={[viewerLocation.latitude, viewerLocation.longitude]}>
            <Popup>
              <div className="text-center">
                <p className="font-bold">You are here!</p>
                {viewerLocation.nearestCity && (
                  <p>Near {viewerLocation.nearestCity.name}, {viewerLocation.nearestCity.country}</p>
                )}
              </div>
            </Popup>
          </Marker>
        )}
        
        <MapController />
      </MapContainer>
    </div>
  );
};

export default Map;