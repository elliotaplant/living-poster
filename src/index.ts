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
      await updateConditions(env.LIVING_POSTER);
      return new Response('Conditions updated');
    } else if (url.pathname.includes('heartbeats')) {
      const posterId = url.searchParams.get('poster_id');
      const { results } = await env.DB.prepare(
        'SELECT * FROM telemetry WHERE poster_id = ?'
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

    try {
      await env.DB.prepare(
        'INSERT INTO telemetry (poster_id, uri, battery) VALUES (?, ?, ?)'
      )
        .bind(posterId, request.url, parseAsNum(battery))
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
