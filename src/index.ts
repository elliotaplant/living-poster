import { Env } from './types';
import { SURF_CONDITIONS_KV_KEY, updateConditions } from './updateConditions';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.includes('favicon')) {
      return new Response('Why are you looking for a favicon?');
    } else if (url.pathname.includes('update')) {
      await updateConditions(env.LIVING_POSTER);
      return new Response('Conditions updated');
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
        return new Response(JSON.stringify(subConditions), {
          headers: { 'content-type': 'application/json' },
        });
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
