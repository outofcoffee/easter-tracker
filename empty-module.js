// This is a stub module used during development and build
// Returns an empty GeoJSON GeometryCollection

export default function() {
  console.log('%c[DEV MODE] Using empty module stub for @geo-maps/earth-lands-1km', 
              'background: #ffd700; color: #000000; padding: 4px; border-radius: 4px;');
  
  return {
    type: "GeometryCollection",
    geometries: []
  };
}