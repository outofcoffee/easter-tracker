export interface City {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string; // Format: "UTC+/-HH:MM"
  timezoneOffsetMinutes: number; // Minutes from UTC, negative for east, positive for west
}

export interface BunnyPosition {
  latitude: number;
  longitude: number;
  currentCity: City | null;
  nextCity: City | null;
  nearestCity: City | null;
  totalCities: number;
  visitedCities: number;
  completionPercentage: number;
  transitionProgress: number;
}

export interface ViewerLocation {
  latitude: number;
  longitude: number;
  nearestCity: City | null;
}

export interface EasterFact {
  id: number;
  text: string;
  country?: string;
}