/**
 * This is a shim for the @geo-maps/earth-lands-10m module for Vite compatibility.
 * 
 * It imports the actual GeoJSON data directly using a dynamic import with ?raw,
 * which tells Vite to import it as a raw string.
 */

// Export a function that mirrors the original module's API
export default async function() {
  // Using dynamic import with ?raw to get the file content as string
  try {
    // At build time, Vite will include this in the bundle
    const geoJsonDataModule = await import('@geo-maps/earth-lands-10m/map.geo.json');
    return geoJsonDataModule.default;
  } catch (error) {
    console.error('Error loading GeoJSON data:', error);
    // Return an empty GeoJSON structure as fallback
    return {
      type: "GeometryCollection",
      geometries: []
    };
  }
}