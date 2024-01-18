/**
 * Surfline ID:
 * Go to https://www.surfline.com/
 * Search for your beach
 * Open the Network tab in the developer console
 * Filter by Fetch/XHR
 * Filter for requests with the prefix
 *  "https://services.surfline.com/kbyg/spots/forecasts/wave"
 * Get the "spotId" query param
 *
 * NOAA ID:
 * Go to https://tidesandcurrents.noaa.gov/map
 * Search for a buoy near the beach
 * Find the ID in the URL
 */

type Condition = 'wave' | 'wind' | 'water-temp' | 'tide';

export const beaches: {
  [key: string]: {
    surflineId: string;
    noaaId: string;
    conditions: Condition[];
  };
} = {
  tourmaline: {
    surflineId: '5842041f4e65fad6a77088c4',
    noaaId: '9410170',
    conditions: ['wave', 'wind', 'water-temp'],
  },
  blacks: {
    surflineId: '5842041f4e65fad6a770883b',
    noaaId: '9410170',
    conditions: ['wave', 'wind', 'water-temp'],
  },
  stinson: {
    surflineId: '5842041f4e65fad6a77089c1',
    noaaId: '9414750', // Alameda, CA
    conditions: ['wave', 'wind', 'water-temp'],
  },
  sunsetCliffs: {
    surflineId: '5842041f4e65fad6a7708840',
    noaaId: '9410170',
    conditions: ['wave', 'wind', 'water-temp'],
  },
  montara: {
    surflineId: '5842041f4e65fad6a77089c1',
    noaaId: '9413450', // Actually Monterey
    conditions: ['wave', 'wind', 'water-temp'],
  },
  chesapeake: {
    surflineId: '5842041f4e65fad6a7708a28', // Fisherman's Island
    noaaId: '8577330', // Solomon's Island
    conditions: ['tide', 'wind', 'water-temp'],
  },
  oceanBeach: {
    surflineId: '5842041f4e65fad6a770883f',
    noaaId: '9414750', // Alameda, CA
    conditions: ['wave', 'wind', 'water-temp'],
  },
};
