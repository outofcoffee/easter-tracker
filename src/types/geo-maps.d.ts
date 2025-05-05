// Removed unused declarations for @geo-maps/earth-lands-10m

declare module '@geo-maps/earth-lands-1km' {
  /**
   * Returns the GeoJSON data for earth's landmasses (smaller file size)
   */
  // Using GeoJSON GeometryCollection type
  export default function(): GeoJSON.GeometryCollection;
}

declare module '@geo-maps/earth-lands-1km/map.geo.json' {
  const data: GeoJSON.GeometryCollection;
  export default data;
}