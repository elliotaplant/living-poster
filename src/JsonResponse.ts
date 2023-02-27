export class JsonResponse extends Response {
  constructor(bodyInit: any, maybeInit: ResponseInit = {}) {
    super(JSON.stringify(bodyInit), {
      ...maybeInit,
      headers: {
        'content-type': 'application/json',
        ...(maybeInit?.headers || {}),
      },
    });
  }
}
