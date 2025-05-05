// Development stub for @geo-maps/earth-lands-1km
// This is a simplified version that returns an empty GeoJSON collection
export const version = '0.6.0-dev';

export default function() {
  console.log('%c[DEV MODE] Using stub GeoJSON data for @geo-maps/earth-lands-1km', 
              'background: #ffd700; color: #000000; padding: 4px; border-radius: 4px;');
  
  return {
    type: "GeometryCollection",
    geometries: []
  };
}