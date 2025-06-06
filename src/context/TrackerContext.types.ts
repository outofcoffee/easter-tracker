import { BunnyPosition, ViewerLocation, DEFAULT_MAP_ZOOM } from '../types';
import { getNextEasterDate, formatDate } from '../utils/timeUtils';

// Define the type for our context
export interface TrackerContextType {
  currentPosition: BunnyPosition | null;
  totalCities: number;
  basketsDelivered: number;
  completionPercentage: number;
  viewerLocation: ViewerLocation | null;
  estimatedArrivalTime: string | null;
  isNearby: boolean;
  isEasterDay: boolean;
  nextEasterDate: Date;
  nextEasterFormatted: string;
  mapZoomLevel: number;
  setMapZoomLevel: (zoom: number) => void;
}

// Create a default context with sensible defaults
export const defaultContext: TrackerContextType = {
  currentPosition: null,
  totalCities: 0,
  basketsDelivered: 0,
  completionPercentage: 0,
  viewerLocation: null,
  estimatedArrivalTime: null,
  isNearby: false,
  isEasterDay: false,
  nextEasterDate: getNextEasterDate(),
  nextEasterFormatted: formatDate(getNextEasterDate()),
  mapZoomLevel: DEFAULT_MAP_ZOOM, // Default zoom level
  setMapZoomLevel: () => {} // No-op function as placeholder
};