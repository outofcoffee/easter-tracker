declare module '@geo-maps/earth-lands-10m' {
  /**
   * Returns the GeoJSON data for earth's landmasses 
   */
  // Using GeoJSON GeometryCollection type
  export default function(): GeoJSON.GeometryCollection;
}

declare module '@geo-maps/earth-lands-10m/map.geo.json' {
  const data: GeoJSON.GeometryCollection;
  export default data;
}