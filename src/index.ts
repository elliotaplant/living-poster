import { JsonResponse } from './JsonResponse';
import { Env } from './types';
import { SURF_CONDITIONS_KV_KEY, updateConditions } from './updateConditions';
import { parseAsNum } from './utils';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.includes('favicon')) {
      return new Response('Why are you looking for a favicon?');
    } else if (url.pathname.includes('update')) {
      const conditions = await updateConditions(env.LIVING_POSTER);
      return new Response(`Conditions updated: ${JSON.stringify(conditions)}`);
    } else if (url.pathname.includes('telemetry')) {
      const posterId = url.searchParams.get('poster_id');
      const { results } = await env.DB.prepare(
        `SELECT 
          strftime('%Y-%m-%dT%H', created_at) as hour, 
          count(*) as count
        FROM telemetry 
        WHERE poster_id = ? 
        GROUP BY hour 
        ORDER BY hour DESC`
      )
        .bind(posterId)
        .all();

      return new JsonResponse(results, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    } else if (url.pathname.includes('battery')) {
      const posterId = url.searchParams.get('poster_id');
      const { results } = await env.DB.prepare(
        'SELECT created_at, battery, millis FROM telemetry WHERE poster_id = ?'
      )
        .bind(posterId)
        .all();

      return new JsonResponse(results, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Write telemetry data
    const posterId = url.searchParams.get('poster_id');
    const battery = url.searchParams.get('battery');
    const millis = url.searchParams.get('millis');

    try {
      await env.DB.prepare(
        'INSERT INTO telemetry (poster_id, uri, battery, millis) VALUES (?, ?, ?, ?)'
      )
        .bind(posterId, request.url, parseAsNum(battery), parseAsNum(millis))
        .all();
    } catch (e: any) {
      console.error(e);
      console.error(`Failed to write telemetry data: ${e?.message}`);
    }

    const conditionsJson = await env.LIVING_POSTER.get(SURF_CONDITIONS_KV_KEY);
    const beach = url.searchParams.get('beach');
    if (beach && conditionsJson) {
      const conditions = JSON.parse(conditionsJson);
      if (beach in conditions) {
        const subConditions = {
          time: Date.now(),
          conditions: conditions[beach],
        };
        return new JsonResponse(subConditions);
      }
    }

    return new Response(conditionsJson, {
      headers: { 'content-type': 'application/json' },
    });
  },

  async scheduled(_: ScheduledController, env: Env, ctx: ExtendableEvent) {
    ctx.waitUntil(updateConditions(env.LIVING_POSTER));
  },
};
