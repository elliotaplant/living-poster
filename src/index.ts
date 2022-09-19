import { Env } from './types';
import { updateConditions } from './updateConditions';

export default {
  async fetch(request: Request): Promise<Response> {
    console.log('request', request);
    return new Response('Hello World!');
  },

  async scheduled(event: ScheduledEvent, env: Env, ctx: ExtendableEvent) {
    ctx.waitUntil(updateConditions());
  },
};
