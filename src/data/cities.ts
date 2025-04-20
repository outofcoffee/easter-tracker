import { City } from '../types';

// These are placeholder cities - in a real implementation,
// you would use a more comprehensive database of cities worldwide
const citiesData: City[] = [
  {
    id: '1',
    name: 'Tokyo',
    country: 'Japan',
    latitude: 35.6762,
    longitude: 139.6503,
    population: 37435191,
    timezone: 'Asia/Tokyo'
  },
  {
    id: '2',
    name: 'New York City',
    country: 'United States',
    latitude: 40.7128,
    longitude: -74.006,
    population: 18804000,
    timezone: 'America/New_York'
  },
  {
    id: '3',
    name: 'London',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
    population: 9046000,
    timezone: 'Europe/London'
  },
  {
    id: '4',
    name: 'Paris',
    country: 'France',
    latitude: 48.8566,
    longitude: 2.3522,
    population: 11017000,
    timezone: 'Europe/Paris'
  },
  {
    id: '5',
    name: 'Sydney',
    country: 'Australia',
    latitude: -33.8688,
    longitude: 151.2093,
    population: 5312000,
    timezone: 'Australia/Sydney'
  },
  {
    id: '6',
    name: 'Cairo',
    country: 'Egypt',
    latitude: 30.0444,
    longitude: 31.2357,
    population: 20901000,
    timezone: 'Africa/Cairo'
  },
  {
    id: '7',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    latitude: -22.9068,
    longitude: -43.1729,
    population: 13458075,
    timezone: 'America/Sao_Paulo'
  },
  {
    id: '8',
    name: 'Moscow',
    country: 'Russia',
    latitude: 55.7558,
    longitude: 37.6173,
    population: 12537954,
    timezone: 'Europe/Moscow'
  },
  {
    id: '9',
    name: 'Beijing',
    country: 'China',
    latitude: 39.9042,
    longitude: 116.4074,
    population: 21540000,
    timezone: 'Asia/Shanghai'
  },
  {
    id: '10',
    name: 'Mexico City',
    country: 'Mexico',
    latitude: 19.4326,
    longitude: -99.1332,
    population: 21581000,
    timezone: 'America/Mexico_City'
  },
  {
    id: '11',
    name: 'Mumbai',
    country: 'India',
    latitude: 19.076,
    longitude: 72.8777,
    population: 20411274,
    timezone: 'Asia/Kolkata'
  },
  {
    id: '12',
    name: 'Cape Town',
    country: 'South Africa',
    latitude: -33.9249,
    longitude: 18.4241,
    population: 4618731,
    timezone: 'Africa/Johannesburg'
  },
  {
    id: '13',
    name: 'Buenos Aires',
    country: 'Argentina',
    latitude: -34.6037,
    longitude: -58.3816,
    population: 15057273,
    timezone: 'America/Argentina/Buenos_Aires'
  },
  {
    id: '14',
    name: 'Berlin',
    country: 'Germany',
    latitude: 52.5200,
    longitude: 13.4050,
    population: 3664088,
    timezone: 'Europe/Berlin'
  },
  {
    id: '15',
    name: 'Toronto',
    country: 'Canada',
    latitude: 43.6532,
    longitude: -79.3832,
    population: 6255000,
    timezone: 'America/Toronto'
  },
  {
    id: '16',
    name: 'Bangkok',
    country: 'Thailand',
    latitude: 13.7563,
    longitude: 100.5018,
    population: 10539000,
    timezone: 'Asia/Bangkok'
  },
  {
    id: '17',
    name: 'Auckland',
    country: 'New Zealand',
    latitude: -36.8509,
    longitude: 174.7645,
    population: 1657000,
    timezone: 'Pacific/Auckland'
  },
  {
    id: '18',
    name: 'Istanbul',
    country: 'Turkey',
    latitude: 41.0082,
    longitude: 28.9784,
    population: 15462000,
    timezone: 'Europe/Istanbul'
  },
  {
    id: '19',
    name: 'Dubai',
    country: 'United Arab Emirates',
    latitude: 25.2048,
    longitude: 55.2708,
    population: 3331000,
    timezone: 'Asia/Dubai'
  },
  {
    id: '20',
    name: 'Los Angeles',
    country: 'United States',
    latitude: 34.0522,
    longitude: -118.2437,
    population: 12750807,
    timezone: 'America/Los_Angeles'
  }
];

// In a real implementation, you would sort cities by timezone to create a
// realistic journey around the world, and include many more cities

// Function to get the cities - simulates an async data fetch
export const getCities = async (): Promise<City[]> => {
  // Sort cities by longitude to create a west-to-east journey
  return [...citiesData].sort((a, b) => a.longitude - b.longitude);
};

// Get a single city by ID
export const getCityById = async (id: string): Promise<City | undefined> => {
  return citiesData.find(city => city.id === id);
};