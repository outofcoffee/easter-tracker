import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useTracker } from '../../hooks/useTracker';
import DeliveryBunny from '../BunnySprite/DeliveryBunny';
import { DEFAULT_MAP_ZOOM } from '../../types';
import 'leaflet/dist/leaflet.css';

// Add a class to the map container for targeting with CSS
import './map-styles.css';

// Fix for Leaflet marker icon issue
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Component to handle map positioning and zoom tracking
const MapController = () => {
  const { currentPosition, setMapZoomLevel } = useTracker();
  const map = useMap();
  const MIN_ZOOM = 3;
  const MAX_ZOOM = 8;
  
  // Track when the bunny moves and update map view
  useEffect(() => {
    if (currentPosition) {
      // Move view to follow the bunny with current zoom level
      map.setView(
        [currentPosition.latitude, currentPosition.longitude],
        map.getZoom()
      );
    }
  }, [currentPosition, map]);
  
  // Set up zoom constraints the proper way
  useEffect(() => {
    // According to Leaflet docs, this is the proper way to set min/max zoom
    map.setMinZoom(MIN_ZOOM);
    map.setMaxZoom(MAX_ZOOM);
    
    // Log to confirm settings are applied
    console.log(`Zoom constraints set: min=${map.getMinZoom()}, max=${map.getMaxZoom()}, current=${map.getZoom()}`);
    
    // Handle any initial zoom adjustment if needed
    const currentZoom = map.getZoom();
    if (currentZoom < MIN_ZOOM) {
      console.log("Initial zoom too low, adjusting to min zoom");
      map.setZoom(MIN_ZOOM);
    } else if (currentZoom > MAX_ZOOM) {
      console.log("Initial zoom too high, adjusting to max zoom");
      map.setZoom(MAX_ZOOM);
    }
  }, [map]);
  
  // Keep the tracker context updated with the current zoom level
  useEffect(() => {
    // Function to update the context with the current zoom level
    const updateZoomLevel = () => {
      const zoom = map.getZoom();
      console.log("Zoom updated:", zoom);
      setMapZoomLevel(zoom);
    };
    
    // Set initial zoom level in context
    updateZoomLevel();
    
    // Listen for zoom changes
    map.on('zoomend', updateZoomLevel);
    
    // Cleanup
    return () => {
      map.off('zoomend', updateZoomLevel);
    };
  }, [map, setMapZoomLevel]);
  
  return null;
};

const Map = () => {
  const { currentPosition, viewerLocation } = useTracker();
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Default position (middle of the world)
  const defaultPosition: [number, number] = [0, 0];
  const defaultZoom = DEFAULT_MAP_ZOOM;
  const MIN_ZOOM = 3;
  const MAX_ZOOM = 8;
  
  // Function to determine if the bunny is delivering at a city
  const isDeliveringAtCity = currentPosition && 
    currentPosition.currentCity && 
    currentPosition.nextCity && 
    currentPosition.currentCity.id === currentPosition.nextCity.id;

  // Debug the delivery state  
  useEffect(() => {
    if (currentPosition) {
      console.log('Current bunny position:', currentPosition);
      console.log('Is delivering at city:', isDeliveringAtCity ? 'Yes' : 'No');
      console.log('Is over land:', currentPosition.overLand ? 'Yes' : 'No');
      console.log('Current city:', currentPosition.currentCity?.name);
      console.log('Next city:', currentPosition.nextCity?.name);
    }
  }, [currentPosition, isDeliveringAtCity]);
  
  // Update ref when map is created
  const MapInitializer = () => {
    const map = useMap();
    useEffect(() => {
      mapRef.current = map;
    }, [map]);
    return null;
  };
  
  return (
    <div ref={containerRef} className="w-full h-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={currentPosition 
          ? [currentPosition.latitude, currentPosition.longitude] 
          : defaultPosition}
        zoom={defaultZoom}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        zoomControl={true}
        className="easter-map"
        style={{ height: '100%', width: '100%' }}
      >
        <MapInitializer />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
        />
        
        {/* Easter Bunny Marker with delivery items */}
        {currentPosition && (
          <DeliveryBunny position={[currentPosition.latitude, currentPosition.longitude]} />
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
        
        {/* 
          Eggs and baskets are now handled directly by the BunnyMarker component
          This is much more reliable and visually coherent
        */}
      </MapContainer>
    </div>
  );
};

export default Map;