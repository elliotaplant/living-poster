import { Env } from './types';
import { updateConditions } from './updateConditions';

export default {
  async fetch(
    request: Request,
    env: ExtendableEvent,
    ctx: ExecutionContext
  ): Promise<Response> {
    if (request.url.includes('favicon')) {
      return new Response('hey');
    }
    await updateConditions();
    return new Response('Hello World!');
  },

  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExtendableEvent
  ) {
    ctx.waitUntil(updateConditions());
  },
};
