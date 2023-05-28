import { beaches } from './beaches';

const SURFLINE_BASE_URL = 'https://services.surfline.com/kbyg/spots/forecasts';
const WATER_TMP =
  'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=latest&product=water_temperature&' +
  'datum=STND&time_zone=lst&units=english&application=surf_poster&format=json&station=';
export const SURF_CONDITIONS_KV_KEY = 'SURF_CONDITIONS';

export interface BeachConditions {
  surfHeight: number;
  windSpeed: number;
  waterTemp: number;
}

async function getSurflineCondition(
  condition: 'wave' | 'wind',
  surflineId: string
) {
  const surflineResponse = await fetch(
    `${SURFLINE_BASE_URL}/${condition}?sds=true&spotId=${surflineId}`
  );
  const { headers } = surflineResponse;
  const contentType = headers.get('content-type') || '';
  let jsonForecastList = '{}';
  if (contentType.includes('application/json')) {
    jsonForecastList = JSON.stringify(await surflineResponse.json());
  }

  const forecastList: any = JSON.parse(jsonForecastList);

  for (const forecast of forecastList.data[condition]) {
    if (forecast.timestamp - Date.now() / 1000 > 0) {
      return forecast;
    }
  }

  throw new Error(`Unable to find surfline forecast for beach ${surflineId}`);
}

async function getNoaaWaterTemp(noaaId: string) {
  const noaaResponse = await fetch(WATER_TMP + noaaId);

  // Change the response headers because NOAA's response is not application/json so the .json method doesn't like it
  const withUpdatedHeaders = new Response(noaaResponse.body, {
    ...noaaResponse,
    headers: new Headers({
      ...noaaResponse.headers,
      'content-type': 'application/json',
    }),
  });

  const parsedNoaaResponse: any = await withUpdatedHeaders.json();
  console.log(
    'parsedNoaaResponse',
    JSON.stringify(parsedNoaaResponse, null, 2)
  );
  return Number(parsedNoaaResponse.data[0].v);
}

async function getSurfConditions() {
  const beachConditions: { [beachName: string]: BeachConditions } = {};

  for (const [beachName, { surflineId, noaaId }] of Object.entries(beaches)) {
    beachConditions[beachName] = { surfHeight: 0, windSpeed: 0, waterTemp: 0 };

    // Get wave height and wind speed from surfline
    console.log(beachName, surflineId);
    const { surf } = await getSurflineCondition('wave', surflineId);
    beachConditions[beachName].surfHeight = (surf.max + surf.min) / 2;

    const { speed, gust } = await getSurflineCondition('wind', surflineId);
    beachConditions[beachName].windSpeed = (speed + gust) / 2;

    // Get water temp from noah
    beachConditions[beachName].waterTemp = await getNoaaWaterTemp(noaaId);
  }

  return beachConditions;
}

export async function updateConditions(kv: KVNamespace) {
  const surfConditions = await getSurfConditions();
  console.log('Conditions:', JSON.stringify(surfConditions));
  await kv.put(SURF_CONDITIONS_KV_KEY, JSON.stringify(surfConditions, null, 2));
  return surfConditions;
}
