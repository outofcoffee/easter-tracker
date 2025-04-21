import { City } from '../types';
// City data with timezone information

// Populate cities with accurate timezone information
const citiesData: City[] = [
  {
    id: '1',
    name: 'Kiritimati',
    country: 'Kiribati',
    latitude: 1.8721,
    longitude: -157.4278,
    population: 6447,
    timezone: 'UTC+14:00',
    timezoneOffsetMinutes: -14 * 60 // Easternmost timezone
  },
  {
    id: '2',
    name: 'Auckland',
    country: 'New Zealand',
    latitude: -36.8509,
    longitude: 174.7645,
    population: 1657000,
    timezone: 'UTC+12:00',
    timezoneOffsetMinutes: -12 * 60
  },
  {
    id: '3',
    name: 'Sydney',
    country: 'Australia',
    latitude: -33.8688,
    longitude: 151.2093,
    population: 5312000,
    timezone: 'UTC+10:00',
    timezoneOffsetMinutes: -10 * 60
  },
  {
    id: '4',
    name: 'Tokyo',
    country: 'Japan',
    latitude: 35.6762,
    longitude: 139.6503,
    population: 37435191,
    timezone: 'UTC+09:00',
    timezoneOffsetMinutes: -9 * 60
  },
  {
    id: '5',
    name: 'Beijing',
    country: 'China',
    latitude: 39.9042,
    longitude: 116.4074,
    population: 21540000,
    timezone: 'UTC+08:00',
    timezoneOffsetMinutes: -8 * 60
  },
  {
    id: '6',
    name: 'Bangkok',
    country: 'Thailand',
    latitude: 13.7563,
    longitude: 100.5018,
    population: 10539000,
    timezone: 'UTC+07:00',
    timezoneOffsetMinutes: -7 * 60
  },
  {
    id: '7',
    name: 'Mumbai',
    country: 'India',
    latitude: 19.076,
    longitude: 72.8777,
    population: 20411274,
    timezone: 'UTC+05:30',
    timezoneOffsetMinutes: -5 * 60 - 30
  },
  {
    id: '8',
    name: 'Dubai',
    country: 'United Arab Emirates',
    latitude: 25.2048,
    longitude: 55.2708,
    population: 3331000,
    timezone: 'UTC+04:00',
    timezoneOffsetMinutes: -4 * 60
  },
  {
    id: '9',
    name: 'Moscow',
    country: 'Russia',
    latitude: 55.7558,
    longitude: 37.6173,
    population: 12537954,
    timezone: 'UTC+03:00',
    timezoneOffsetMinutes: -3 * 60
  },
  {
    id: '10',
    name: 'Cairo',
    country: 'Egypt',
    latitude: 30.0444,
    longitude: 31.2357,
    population: 20901000,
    timezone: 'UTC+02:00',
    timezoneOffsetMinutes: -2 * 60
  },
  {
    id: '11',
    name: 'Paris',
    country: 'France',
    latitude: 48.8566,
    longitude: 2.3522,
    population: 11017000,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '12',
    name: 'London',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
    population: 9046000,
    timezone: 'UTC+00:00',
    timezoneOffsetMinutes: 0
  },
  {
    id: '13',
    name: 'Cape Town',
    country: 'South Africa',
    latitude: -33.9249,
    longitude: 18.4241,
    population: 4618731,
    timezone: 'UTC+02:00',
    timezoneOffsetMinutes: -2 * 60
  },
  {
    id: '14',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    latitude: -22.9068,
    longitude: -43.1729,
    population: 13458075,
    timezone: 'UTC-03:00',
    timezoneOffsetMinutes: 3 * 60
  },
  {
    id: '15',
    name: 'Buenos Aires',
    country: 'Argentina',
    latitude: -34.6037,
    longitude: -58.3816,
    population: 15057273,
    timezone: 'UTC-03:00',
    timezoneOffsetMinutes: 3 * 60
  },
  {
    id: '16',
    name: 'New York City',
    country: 'United States',
    latitude: 40.7128,
    longitude: -74.006,
    population: 18804000,
    timezone: 'UTC-05:00',
    timezoneOffsetMinutes: 5 * 60
  },
  {
    id: '17',
    name: 'Mexico City',
    country: 'Mexico',
    latitude: 19.4326,
    longitude: -99.1332,
    population: 21581000,
    timezone: 'UTC-06:00',
    timezoneOffsetMinutes: 6 * 60
  },
  {
    id: '18',
    name: 'Los Angeles',
    country: 'United States',
    latitude: 34.0522,
    longitude: -118.2437,
    population: 12750807,
    timezone: 'UTC-08:00',
    timezoneOffsetMinutes: 8 * 60
  },
  {
    id: '19',
    name: 'Honolulu',
    country: 'United States',
    latitude: 21.3069,
    longitude: -157.8583,
    population: 953207,
    timezone: 'UTC-10:00',
    timezoneOffsetMinutes: 10 * 60
  },
  {
    id: '20',
    name: 'Baker Island',
    country: 'United States (Uninhabited)',
    latitude: 0.1936,
    longitude: -176.4769,
    population: 0,
    timezone: 'UTC-12:00',
    timezoneOffsetMinutes: 12 * 60 // Westernmost timezone
  }
];

// Function to get cities sorted by timezone (from easternmost to westernmost)
export const getCities = async (): Promise<City[]> => {
  // Sort by timezone offset (negative values first - easternmost timezones)
  return [...citiesData].sort((a, b) => a.timezoneOffsetMinutes - b.timezoneOffsetMinutes);
};

// Get a single city by ID
export const getCityById = async (id: string): Promise<City | undefined> => {
  return citiesData.find(city => city.id === id);
};