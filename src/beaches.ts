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
export const beaches = {
  tourmaline: {
    surflineId: '5842041f4e65fad6a77088c4',
    noaaId: '9410170',
  },
  blacks: {
    surflineId: '5842041f4e65fad6a770883b',
    noaaId: '9410170',
  },
  stinson: {
    surflineId: '5842041f4e65fad6a77089c1',
    noaaId: '9414290', // Actually San Francisco
  },
  sunsetCliffs: {
    surflineId: '5842041f4e65fad6a7708840',
    noaaId: '9410170',
  },
  montara: {
    surflineId: '5842041f4e65fad6a77089c1',
    noaaId: '9413450', // Actually Monterey
  },
};
