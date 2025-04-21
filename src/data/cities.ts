import { City } from '../types';
// City data with timezone information

// Populate cities with accurate timezone information
const citiesData: City[] = [
  // UTC+14:00 Cities
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
  
  // UTC+13:00 Cities
  {
    id: '2',
    name: 'Apia', 
    country: 'Samoa',
    latitude: -13.8333,
    longitude: -171.7667,
    population: 39813,
    timezone: 'UTC+13:00',
    timezoneOffsetMinutes: -13 * 60
  },
  {
    id: '3',
    name: 'Nukuʻalofa',
    country: 'Tonga',
    latitude: -21.1394,
    longitude: -175.2179,
    population: 24571,
    timezone: 'UTC+13:00',
    timezoneOffsetMinutes: -13 * 60
  },
  
  // UTC+12:00 Cities
  {
    id: '4',
    name: 'Auckland',
    country: 'New Zealand',
    latitude: -36.8509,
    longitude: 174.7645,
    population: 1657000,
    timezone: 'UTC+12:00',
    timezoneOffsetMinutes: -12 * 60
  },
  {
    id: '5',
    name: 'Wellington',
    country: 'New Zealand',
    latitude: -41.2865,
    longitude: 174.7762,
    population: 412500,
    timezone: 'UTC+12:00',
    timezoneOffsetMinutes: -12 * 60
  },
  {
    id: '6',
    name: 'Suva',
    country: 'Fiji',
    latitude: -18.1416,
    longitude: 178.4419,
    population: 93970,
    timezone: 'UTC+12:00',
    timezoneOffsetMinutes: -12 * 60
  },
  
  // UTC+11:00 Cities
  {
    id: '7',
    name: 'Noumea',
    country: 'New Caledonia',
    latitude: -22.2758,
    longitude: 166.458,
    population: 94285,
    timezone: 'UTC+11:00',
    timezoneOffsetMinutes: -11 * 60
  },
  {
    id: '8',
    name: 'Honiara',
    country: 'Solomon Islands',
    latitude: -9.4456,
    longitude: 159.9729,
    population: 84520,
    timezone: 'UTC+11:00',
    timezoneOffsetMinutes: -11 * 60
  },
  
  // UTC+10:00 Cities
  {
    id: '9',
    name: 'Sydney',
    country: 'Australia',
    latitude: -33.8688,
    longitude: 151.2093,
    population: 5312000,
    timezone: 'UTC+10:00',
    timezoneOffsetMinutes: -10 * 60
  },
  {
    id: '10',
    name: 'Melbourne',
    country: 'Australia',
    latitude: -37.8136,
    longitude: 144.9631,
    population: 5078000,
    timezone: 'UTC+10:00',
    timezoneOffsetMinutes: -10 * 60
  },
  {
    id: '11',
    name: 'Brisbane',
    country: 'Australia',
    latitude: -27.4698,
    longitude: 153.0251,
    population: 2560700,
    timezone: 'UTC+10:00',
    timezoneOffsetMinutes: -10 * 60
  },
  {
    id: '12',
    name: 'Port Moresby',
    country: 'Papua New Guinea',
    latitude: -9.4438,
    longitude: 147.1803,
    population: 364125,
    timezone: 'UTC+10:00',
    timezoneOffsetMinutes: -10 * 60
  },
  
  // UTC+09:00 Cities
  {
    id: '13',
    name: 'Tokyo',
    country: 'Japan',
    latitude: 35.6762,
    longitude: 139.6503,
    population: 37435191,
    timezone: 'UTC+09:00',
    timezoneOffsetMinutes: -9 * 60
  },
  {
    id: '14',
    name: 'Osaka',
    country: 'Japan',
    latitude: 34.6937,
    longitude: 135.5023,
    population: 19222665,
    timezone: 'UTC+09:00',
    timezoneOffsetMinutes: -9 * 60
  },
  {
    id: '15',
    name: 'Seoul',
    country: 'South Korea',
    latitude: 37.5665,
    longitude: 126.978,
    population: 9776000,
    timezone: 'UTC+09:00',
    timezoneOffsetMinutes: -9 * 60
  },
  {
    id: '16',
    name: 'Pyongyang',
    country: 'North Korea',
    latitude: 39.0392,
    longitude: 125.7625,
    population: 3255000,
    timezone: 'UTC+09:00',
    timezoneOffsetMinutes: -9 * 60
  },
  
  // UTC+08:00 Cities
  {
    id: '17',
    name: 'Beijing',
    country: 'China',
    latitude: 39.9042,
    longitude: 116.4074,
    population: 21540000,
    timezone: 'UTC+08:00',
    timezoneOffsetMinutes: -8 * 60
  },
  {
    id: '18',
    name: 'Shanghai',
    country: 'China',
    latitude: 31.2304,
    longitude: 121.4737,
    population: 26320000,
    timezone: 'UTC+08:00',
    timezoneOffsetMinutes: -8 * 60
  },
  {
    id: '19',
    name: 'Hong Kong',
    country: 'China',
    latitude: 22.3193,
    longitude: 114.1694,
    population: 7482500,
    timezone: 'UTC+08:00',
    timezoneOffsetMinutes: -8 * 60
  },
  {
    id: '20',
    name: 'Taipei',
    country: 'Taiwan',
    latitude: 25.033,
    longitude: 121.5654,
    population: 2646204,
    timezone: 'UTC+08:00',
    timezoneOffsetMinutes: -8 * 60
  },
  {
    id: '21',
    name: 'Singapore',
    country: 'Singapore',
    latitude: 1.3521,
    longitude: 103.8198,
    population: 5850000,
    timezone: 'UTC+08:00',
    timezoneOffsetMinutes: -8 * 60
  },
  {
    id: '22',
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    latitude: 3.139,
    longitude: 101.6869,
    population: 7200000,
    timezone: 'UTC+08:00',
    timezoneOffsetMinutes: -8 * 60
  },
  {
    id: '23',
    name: 'Perth',
    country: 'Australia',
    latitude: -31.9523,
    longitude: 115.8613,
    population: 2059000,
    timezone: 'UTC+08:00',
    timezoneOffsetMinutes: -8 * 60
  },
  
  // UTC+07:00 Cities
  {
    id: '24',
    name: 'Bangkok',
    country: 'Thailand',
    latitude: 13.7563,
    longitude: 100.5018,
    population: 10539000,
    timezone: 'UTC+07:00',
    timezoneOffsetMinutes: -7 * 60
  },
  {
    id: '25',
    name: 'Jakarta',
    country: 'Indonesia',
    latitude: -6.2088,
    longitude: 106.8456,
    population: 10562000,
    timezone: 'UTC+07:00',
    timezoneOffsetMinutes: -7 * 60
  },
  {
    id: '26',
    name: 'Hanoi',
    country: 'Vietnam',
    latitude: 21.0285,
    longitude: 105.8542,
    population: 7781631,
    timezone: 'UTC+07:00',
    timezoneOffsetMinutes: -7 * 60
  },
  {
    id: '27',
    name: 'Ho Chi Minh City',
    country: 'Vietnam',
    latitude: 10.8231,
    longitude: 106.6297,
    population: 8837544,
    timezone: 'UTC+07:00',
    timezoneOffsetMinutes: -7 * 60
  },
  
  // UTC+06:00 and UTC+06:30 Cities
  {
    id: '28',
    name: 'Dhaka',
    country: 'Bangladesh',
    latitude: 23.8103,
    longitude: 90.4125,
    population: 21006000,
    timezone: 'UTC+06:00',
    timezoneOffsetMinutes: -6 * 60
  },
  {
    id: '29',
    name: 'Almaty',
    country: 'Kazakhstan',
    latitude: 43.2551,
    longitude: 76.9126,
    population: 1977011,
    timezone: 'UTC+06:00',
    timezoneOffsetMinutes: -6 * 60
  },
  {
    id: '30',
    name: 'Yangon',
    country: 'Myanmar',
    latitude: 16.8661,
    longitude: 96.1951,
    population: 5160000,
    timezone: 'UTC+06:30',
    timezoneOffsetMinutes: -6 * 60 - 30
  },
  
  // UTC+05:00 and UTC+05:30 Cities
  {
    id: '31',
    name: 'Mumbai',
    country: 'India',
    latitude: 19.076,
    longitude: 72.8777,
    population: 20411274,
    timezone: 'UTC+05:30',
    timezoneOffsetMinutes: -5 * 60 - 30
  },
  {
    id: '32',
    name: 'Delhi',
    country: 'India',
    latitude: 28.7041,
    longitude: 77.1025,
    population: 29399141,
    timezone: 'UTC+05:30',
    timezoneOffsetMinutes: -5 * 60 - 30
  },
  {
    id: '33',
    name: 'Bangalore',
    country: 'India',
    latitude: 12.9716,
    longitude: 77.5946,
    population: 8443675,
    timezone: 'UTC+05:30',
    timezoneOffsetMinutes: -5 * 60 - 30
  },
  {
    id: '34',
    name: 'Chennai',
    country: 'India',
    latitude: 13.0827,
    longitude: 80.2707,
    population: 10711000,
    timezone: 'UTC+05:30',
    timezoneOffsetMinutes: -5 * 60 - 30
  },
  {
    id: '35',
    name: 'Colombo',
    country: 'Sri Lanka',
    latitude: 6.9271,
    longitude: 79.8612,
    population: 752993,
    timezone: 'UTC+05:30',
    timezoneOffsetMinutes: -5 * 60 - 30
  },
  {
    id: '36',
    name: 'Karachi',
    country: 'Pakistan',
    latitude: 24.8607,
    longitude: 67.0011,
    population: 16093786,
    timezone: 'UTC+05:00',
    timezoneOffsetMinutes: -5 * 60
  },
  {
    id: '37',
    name: 'Tashkent',
    country: 'Uzbekistan',
    latitude: 41.2995,
    longitude: 69.2401,
    population: 2485900,
    timezone: 'UTC+05:00',
    timezoneOffsetMinutes: -5 * 60
  },
  
  // UTC+04:00 Cities
  {
    id: '38',
    name: 'Dubai',
    country: 'United Arab Emirates',
    latitude: 25.2048,
    longitude: 55.2708,
    population: 3331000,
    timezone: 'UTC+04:00',
    timezoneOffsetMinutes: -4 * 60
  },
  {
    id: '39',
    name: 'Abu Dhabi',
    country: 'United Arab Emirates',
    latitude: 24.4539,
    longitude: 54.3773,
    population: 1807000,
    timezone: 'UTC+04:00',
    timezoneOffsetMinutes: -4 * 60
  },
  {
    id: '40',
    name: 'Muscat',
    country: 'Oman',
    latitude: 23.5880,
    longitude: 58.3829,
    population: 1720000,
    timezone: 'UTC+04:00',
    timezoneOffsetMinutes: -4 * 60
  },
  {
    id: '41',
    name: 'Baku',
    country: 'Azerbaijan',
    latitude: 40.4093,
    longitude: 49.8671,
    population: 2300000,
    timezone: 'UTC+04:00',
    timezoneOffsetMinutes: -4 * 60
  },
  
  // UTC+03:00 Cities
  {
    id: '42',
    name: 'Moscow',
    country: 'Russia',
    latitude: 55.7558,
    longitude: 37.6173,
    population: 12537954,
    timezone: 'UTC+03:00',
    timezoneOffsetMinutes: -3 * 60
  },
  {
    id: '43',
    name: 'St. Petersburg',
    country: 'Russia',
    latitude: 59.9343,
    longitude: 30.3351,
    population: 5383000,
    timezone: 'UTC+03:00',
    timezoneOffsetMinutes: -3 * 60
  },
  {
    id: '44',
    name: 'Riyadh',
    country: 'Saudi Arabia',
    latitude: 24.7136,
    longitude: 46.6753,
    population: 7676654,
    timezone: 'UTC+03:00',
    timezoneOffsetMinutes: -3 * 60
  },
  {
    id: '45',
    name: 'Mecca',
    country: 'Saudi Arabia',
    latitude: 21.3891,
    longitude: 39.8579,
    population: 2042000,
    timezone: 'UTC+03:00',
    timezoneOffsetMinutes: -3 * 60
  },
  {
    id: '46',
    name: 'Baghdad',
    country: 'Iraq',
    latitude: 33.3152,
    longitude: 44.3661,
    population: 7144000,
    timezone: 'UTC+03:00',
    timezoneOffsetMinutes: -3 * 60
  },
  {
    id: '47',
    name: 'Doha',
    country: 'Qatar',
    latitude: 25.2854,
    longitude: 51.5310,
    population: 1450000,
    timezone: 'UTC+03:00',
    timezoneOffsetMinutes: -3 * 60
  },
  {
    id: '48',
    name: 'Kuwait City',
    country: 'Kuwait',
    latitude: 29.3759,
    longitude: 47.9774,
    population: 4275000,
    timezone: 'UTC+03:00',
    timezoneOffsetMinutes: -3 * 60
  },
  {
    id: '49',
    name: 'Nairobi',
    country: 'Kenya',
    latitude: -1.2921,
    longitude: 36.8219,
    population: 4735000,
    timezone: 'UTC+03:00',
    timezoneOffsetMinutes: -3 * 60
  },
  {
    id: '50',
    name: 'Addis Ababa',
    country: 'Ethiopia',
    latitude: 9.0320,
    longitude: 38.7469,
    population: 3604000,
    timezone: 'UTC+03:00',
    timezoneOffsetMinutes: -3 * 60
  },
  
  // UTC+02:00 Cities
  {
    id: '51',
    name: 'Cairo',
    country: 'Egypt',
    latitude: 30.0444,
    longitude: 31.2357,
    population: 20901000,
    timezone: 'UTC+02:00',
    timezoneOffsetMinutes: -2 * 60
  },
  {
    id: '52',
    name: 'Alexandria',
    country: 'Egypt',
    latitude: 31.2001,
    longitude: 29.9187,
    population: 5200000,
    timezone: 'UTC+02:00',
    timezoneOffsetMinutes: -2 * 60
  },
  {
    id: '53',
    name: 'Istanbul',
    country: 'Turkey',
    latitude: 41.0082,
    longitude: 28.9784,
    population: 15462000,
    timezone: 'UTC+03:00', // Turkey uses UTC+03:00
    timezoneOffsetMinutes: -3 * 60
  },
  {
    id: '54',
    name: 'Ankara',
    country: 'Turkey',
    latitude: 39.9334,
    longitude: 32.8597,
    population: 5503985,
    timezone: 'UTC+03:00',
    timezoneOffsetMinutes: -3 * 60
  },
  {
    id: '55',
    name: 'Athens',
    country: 'Greece',
    latitude: 37.9838,
    longitude: 23.7275,
    population: 3153000,
    timezone: 'UTC+02:00',
    timezoneOffsetMinutes: -2 * 60
  },
  {
    id: '56',
    name: 'Bucharest',
    country: 'Romania',
    latitude: 44.4268,
    longitude: 26.1025,
    population: 1883425,
    timezone: 'UTC+02:00',
    timezoneOffsetMinutes: -2 * 60
  },
  {
    id: '57',
    name: 'Kiev',
    country: 'Ukraine',
    latitude: 50.4501,
    longitude: 30.5234,
    population: 2967000,
    timezone: 'UTC+02:00',
    timezoneOffsetMinutes: -2 * 60
  },
  {
    id: '58',
    name: 'Johannesburg',
    country: 'South Africa',
    latitude: -26.2023,
    longitude: 28.0436,
    population: 5927000,
    timezone: 'UTC+02:00',
    timezoneOffsetMinutes: -2 * 60
  },
  {
    id: '59',
    name: 'Cape Town',
    country: 'South Africa',
    latitude: -33.9249,
    longitude: 18.4241,
    population: 4618731,
    timezone: 'UTC+02:00',
    timezoneOffsetMinutes: -2 * 60
  },
  
  // UTC+01:00 Cities
  {
    id: '60',
    name: 'Paris',
    country: 'France',
    latitude: 48.8566,
    longitude: 2.3522,
    population: 11017000,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '61',
    name: 'Rome',
    country: 'Italy',
    latitude: 41.9028,
    longitude: 12.4964,
    population: 4342212,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '62',
    name: 'Madrid',
    country: 'Spain',
    latitude: 40.4168,
    longitude: -3.7038,
    population: 6642000,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '63',
    name: 'Barcelona',
    country: 'Spain',
    latitude: 41.3851,
    longitude: 2.1734,
    population: 5575000,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '64',
    name: 'Berlin',
    country: 'Germany',
    latitude: 52.5200,
    longitude: 13.4050,
    population: 3664088,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '65',
    name: 'Munich',
    country: 'Germany',
    latitude: 48.1351,
    longitude: 11.5820,
    population: 1471000,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '66',
    name: 'Amsterdam',
    country: 'Netherlands',
    latitude: 52.3676,
    longitude: 4.9041,
    population: 1149000,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '67',
    name: 'Brussels',
    country: 'Belgium',
    latitude: 50.8503,
    longitude: 4.3517,
    population: 1208542,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '68',
    name: 'Vienna',
    country: 'Austria',
    latitude: 48.2082,
    longitude: 16.3738,
    population: 1911191,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '69',
    name: 'Warsaw',
    country: 'Poland',
    latitude: 52.2297,
    longitude: 21.0122,
    population: 1793000,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '70',
    name: 'Stockholm',
    country: 'Sweden',
    latitude: 59.3293,
    longitude: 18.0686,
    population: 1632798,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '71',
    name: 'Oslo',
    country: 'Norway',
    latitude: 59.9139,
    longitude: 10.7522,
    population: 1019513,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '72',
    name: 'Copenhagen',
    country: 'Denmark',
    latitude: 55.6761,
    longitude: 12.5683,
    population: 1330993,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '73',
    name: 'Prague',
    country: 'Czech Republic',
    latitude: 50.0755,
    longitude: 14.4378,
    population: 1324277,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '74',
    name: 'Algiers',
    country: 'Algeria',
    latitude: 36.7372,
    longitude: 3.0865,
    population: 3915811,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  {
    id: '75',
    name: 'Lagos',
    country: 'Nigeria',
    latitude: 6.5244,
    longitude: 3.3792,
    population: 14368000,
    timezone: 'UTC+01:00',
    timezoneOffsetMinutes: -1 * 60
  },
  
  // UTC+00:00 Cities
  {
    id: '76',
    name: 'London',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
    population: 9046000,
    timezone: 'UTC+00:00',
    timezoneOffsetMinutes: 0
  },
  {
    id: '77',
    name: 'Manchester',
    country: 'United Kingdom',
    latitude: 53.4808,
    longitude: -2.2426,
    population: 553230,
    timezone: 'UTC+00:00',
    timezoneOffsetMinutes: 0
  },
  {
    id: '78',
    name: 'Dublin',
    country: 'Ireland',
    latitude: 53.3498,
    longitude: -6.2603,
    population: 1173000,
    timezone: 'UTC+00:00',
    timezoneOffsetMinutes: 0
  },
  {
    id: '79',
    name: 'Lisbon',
    country: 'Portugal',
    latitude: 38.7223,
    longitude: -9.1393,
    population: 506000,
    timezone: 'UTC+00:00',
    timezoneOffsetMinutes: 0
  },
  {
    id: '80',
    name: 'Casablanca',
    country: 'Morocco',
    latitude: 33.5731,
    longitude: -7.5898,
    population: 3359818,
    timezone: 'UTC+00:00',
    timezoneOffsetMinutes: 0
  },
  {
    id: '81',
    name: 'Accra',
    country: 'Ghana',
    latitude: 5.6037,
    longitude: -0.1870,
    population: 2291352,
    timezone: 'UTC+00:00',
    timezoneOffsetMinutes: 0
  },
  {
    id: '82',
    name: 'Reykjavik',
    country: 'Iceland',
    latitude: 64.1466,
    longitude: -21.9426,
    population: 131136,
    timezone: 'UTC+00:00',
    timezoneOffsetMinutes: 0
  },
  
  // UTC-01:00 Cities
  {
    id: '83',
    name: 'Praia',
    country: 'Cape Verde',
    latitude: 14.9177,
    longitude: -23.5092,
    population: 159050,
    timezone: 'UTC-01:00',
    timezoneOffsetMinutes: 1 * 60
  },
  
  // UTC-02:00 Cities
  {
    id: '84',
    name: 'Nuuk',
    country: 'Greenland',
    latitude: 64.1814,
    longitude: -51.6941,
    population: 18326,
    timezone: 'UTC-02:00',
    timezoneOffsetMinutes: 2 * 60
  },
  
  // UTC-03:00 Cities
  {
    id: '85',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    latitude: -22.9068,
    longitude: -43.1729,
    population: 13458075,
    timezone: 'UTC-03:00',
    timezoneOffsetMinutes: 3 * 60
  },
  {
    id: '86',
    name: 'São Paulo',
    country: 'Brazil',
    latitude: -23.5505,
    longitude: -46.6333,
    population: 22046000,
    timezone: 'UTC-03:00',
    timezoneOffsetMinutes: 3 * 60
  },
  {
    id: '87',
    name: 'Buenos Aires',
    country: 'Argentina',
    latitude: -34.6037,
    longitude: -58.3816,
    population: 15057273,
    timezone: 'UTC-03:00',
    timezoneOffsetMinutes: 3 * 60
  },
  {
    id: '88',
    name: 'Santiago',
    country: 'Chile',
    latitude: -33.4489,
    longitude: -70.6693,
    population: 6769000,
    timezone: 'UTC-03:00', // Chile uses UTC-03:00 (summer time during Easter period)
    timezoneOffsetMinutes: 3 * 60
  },
  {
    id: '89',
    name: 'Montevideo',
    country: 'Uruguay',
    latitude: -34.9011,
    longitude: -56.1915,
    population: 1381000,
    timezone: 'UTC-03:00',
    timezoneOffsetMinutes: 3 * 60
  },
  {
    id: '90',
    name: 'St. John\'s',
    country: 'Canada',
    latitude: 47.5615,
    longitude: -52.7126,
    population: 108860,
    timezone: 'UTC-03:30', // Newfoundland Time
    timezoneOffsetMinutes: 3 * 60 + 30
  },
  
  // UTC-04:00 Cities
  {
    id: '91',
    name: 'Halifax',
    country: 'Canada',
    latitude: 44.6488,
    longitude: -63.5752,
    population: 403131,
    timezone: 'UTC-04:00', // Atlantic Time
    timezoneOffsetMinutes: 4 * 60
  },
  {
    id: '92',
    name: 'La Paz',
    country: 'Bolivia',
    latitude: -16.4897,
    longitude: -68.1193,
    population: 815000,
    timezone: 'UTC-04:00',
    timezoneOffsetMinutes: 4 * 60
  },
  {
    id: '93',
    name: 'Caracas',
    country: 'Venezuela',
    latitude: 10.4806,
    longitude: -66.9036,
    population: 2245744,
    timezone: 'UTC-04:00',
    timezoneOffsetMinutes: 4 * 60
  },
  {
    id: '94',
    name: 'Santo Domingo',
    country: 'Dominican Republic',
    latitude: 18.4861,
    longitude: -69.9312,
    population: 2945353,
    timezone: 'UTC-04:00',
    timezoneOffsetMinutes: 4 * 60
  },
  
  // UTC-05:00 Cities
  {
    id: '95',
    name: 'New York City',
    country: 'United States',
    latitude: 40.7128,
    longitude: -74.006,
    population: 18804000,
    timezone: 'UTC-05:00', // Eastern Time
    timezoneOffsetMinutes: 5 * 60
  },
  {
    id: '96',
    name: 'Washington, D.C.',
    country: 'United States',
    latitude: 38.9072,
    longitude: -77.0369,
    population: 702455,
    timezone: 'UTC-05:00',
    timezoneOffsetMinutes: 5 * 60
  },
  {
    id: '97',
    name: 'Toronto',
    country: 'Canada',
    latitude: 43.6532,
    longitude: -79.3832,
    population: 6255000,
    timezone: 'UTC-05:00',
    timezoneOffsetMinutes: 5 * 60
  },
  {
    id: '98',
    name: 'Montreal',
    country: 'Canada',
    latitude: 45.5017,
    longitude: -73.5673,
    population: 4221000,
    timezone: 'UTC-05:00',
    timezoneOffsetMinutes: 5 * 60
  },
  {
    id: '99',
    name: 'Havana',
    country: 'Cuba',
    latitude: 23.1136,
    longitude: -82.3666,
    population: 2130000,
    timezone: 'UTC-05:00',
    timezoneOffsetMinutes: 5 * 60
  },
  {
    id: '100',
    name: 'Lima',
    country: 'Peru',
    latitude: -12.0464,
    longitude: -77.0428,
    population: 10555000,
    timezone: 'UTC-05:00',
    timezoneOffsetMinutes: 5 * 60
  },
  {
    id: '101',
    name: 'Bogotá',
    country: 'Colombia',
    latitude: 4.7110,
    longitude: -74.0721,
    population: 10700000,
    timezone: 'UTC-05:00',
    timezoneOffsetMinutes: 5 * 60
  },
  {
    id: '102',
    name: 'Quito',
    country: 'Ecuador',
    latitude: -0.1807,
    longitude: -78.4678,
    population: 2011388,
    timezone: 'UTC-05:00',
    timezoneOffsetMinutes: 5 * 60
  },
  
  // UTC-06:00 Cities
  {
    id: '103',
    name: 'Chicago',
    country: 'United States',
    latitude: 41.8781,
    longitude: -87.6298,
    population: 9533000,
    timezone: 'UTC-06:00', // Central Time
    timezoneOffsetMinutes: 6 * 60
  },
  {
    id: '104',
    name: 'Mexico City',
    country: 'Mexico',
    latitude: 19.4326,
    longitude: -99.1332,
    population: 21581000,
    timezone: 'UTC-06:00',
    timezoneOffsetMinutes: 6 * 60
  },
  {
    id: '105',
    name: 'Guatemala City',
    country: 'Guatemala',
    latitude: 14.6349,
    longitude: -90.5069,
    population: 2450212,
    timezone: 'UTC-06:00',
    timezoneOffsetMinutes: 6 * 60
  },
  {
    id: '106',
    name: 'Managua',
    country: 'Nicaragua',
    latitude: 12.1149,
    longitude: -86.2362,
    population: 1053000,
    timezone: 'UTC-06:00',
    timezoneOffsetMinutes: 6 * 60
  },
  {
    id: '107',
    name: 'San Salvador',
    country: 'El Salvador',
    latitude: 13.6929,
    longitude: -89.2182,
    population: 1098000,
    timezone: 'UTC-06:00',
    timezoneOffsetMinutes: 6 * 60
  },
  {
    id: '108',
    name: 'Dallas',
    country: 'United States',
    latitude: 32.7767,
    longitude: -96.7970,
    population: 7637387,
    timezone: 'UTC-06:00',
    timezoneOffsetMinutes: 6 * 60
  },
  {
    id: '109',
    name: 'Winnipeg',
    country: 'Canada',
    latitude: 49.8954,
    longitude: -97.1385,
    population: 778489,
    timezone: 'UTC-06:00',
    timezoneOffsetMinutes: 6 * 60
  },
  
  // UTC-07:00 Cities
  {
    id: '110',
    name: 'Denver',
    country: 'United States',
    latitude: 39.7392,
    longitude: -104.9903,
    population: 2876000,
    timezone: 'UTC-07:00', // Mountain Time
    timezoneOffsetMinutes: 7 * 60
  },
  {
    id: '111',
    name: 'Phoenix',
    country: 'United States',
    latitude: 33.4484,
    longitude: -112.0740,
    population: 4945000,
    timezone: 'UTC-07:00',
    timezoneOffsetMinutes: 7 * 60
  },
  {
    id: '112',
    name: 'Calgary',
    country: 'Canada',
    latitude: 51.0447,
    longitude: -114.0719,
    population: 1547484,
    timezone: 'UTC-07:00',
    timezoneOffsetMinutes: 7 * 60
  },
  {
    id: '113',
    name: 'Edmonton',
    country: 'Canada',
    latitude: 53.5461,
    longitude: -113.4938,
    population: 1461182,
    timezone: 'UTC-07:00',
    timezoneOffsetMinutes: 7 * 60
  },
  
  // UTC-08:00 Cities
  {
    id: '114',
    name: 'Los Angeles',
    country: 'United States',
    latitude: 34.0522,
    longitude: -118.2437,
    population: 12750807,
    timezone: 'UTC-08:00', // Pacific Time
    timezoneOffsetMinutes: 8 * 60
  },
  {
    id: '115',
    name: 'San Francisco',
    country: 'United States',
    latitude: 37.7749,
    longitude: -122.4194,
    population: 4727000,
    timezone: 'UTC-08:00',
    timezoneOffsetMinutes: 8 * 60
  },
  {
    id: '116',
    name: 'Seattle',
    country: 'United States',
    latitude: 47.6062,
    longitude: -122.3321,
    population: 3799000,
    timezone: 'UTC-08:00',
    timezoneOffsetMinutes: 8 * 60
  },
  {
    id: '117',
    name: 'Las Vegas',
    country: 'United States',
    latitude: 36.1699,
    longitude: -115.1398,
    population: 2772000,
    timezone: 'UTC-08:00',
    timezoneOffsetMinutes: 8 * 60
  },
  {
    id: '118',
    name: 'Vancouver',
    country: 'Canada',
    latitude: 49.2827,
    longitude: -123.1207,
    population: 2658000,
    timezone: 'UTC-08:00',
    timezoneOffsetMinutes: 8 * 60
  },
  {
    id: '119',
    name: 'Tijuana',
    country: 'Mexico',
    latitude: 32.5149,
    longitude: -117.0382,
    population: 1902390,
    timezone: 'UTC-08:00',
    timezoneOffsetMinutes: 8 * 60
  },
  
  // UTC-09:00 Cities
  {
    id: '120',
    name: 'Anchorage',
    country: 'United States',
    latitude: 61.2181,
    longitude: -149.9003,
    population: 288000,
    timezone: 'UTC-09:00', // Alaska Time
    timezoneOffsetMinutes: 9 * 60
  },
  
  // UTC-10:00 Cities
  {
    id: '121',
    name: 'Honolulu',
    country: 'United States',
    latitude: 21.3069,
    longitude: -157.8583,
    population: 953207,
    timezone: 'UTC-10:00', // Hawaii Time
    timezoneOffsetMinutes: 10 * 60
  },
  {
    id: '122',
    name: 'Papeete',
    country: 'French Polynesia',
    latitude: -17.5334,
    longitude: -149.5667,
    population: 136771,
    timezone: 'UTC-10:00',
    timezoneOffsetMinutes: 10 * 60
  },
  
  // UTC-11:00 Cities  
  {
    id: '123',
    name: 'Pago Pago',
    country: 'American Samoa',
    latitude: -14.2756,
    longitude: -170.7020,
    population: 3656,
    timezone: 'UTC-11:00',
    timezoneOffsetMinutes: 11 * 60
  },
  
  // UTC-12:00 Cities (westernmost timezone)  
  {
    id: '124',
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