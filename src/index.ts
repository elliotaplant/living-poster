import { Env } from './types';
import { SURF_CONDITIONS_KV_KEY, updateConditions } from './updateConditions';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.url.includes('favicon')) {
      return new Response('Why are you looking for a favicon?');
    } else if (request.url.includes('update')) {
      await updateConditions(env.LIVING_POSTER);
      return new Response('Conditions updated');
    }

    const surfConditions = await env.LIVING_POSTER.get(SURF_CONDITIONS_KV_KEY);

    return new Response(surfConditions, {
      headers: { 'content-type': 'application/json' },
    });
  },

  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExtendableEvent
  ) {
    ctx.waitUntil(updateConditions(env.LIVING_POSTER));
  },
};
