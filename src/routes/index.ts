import { Type } from '@sinclair/typebox';
import { requestAccessToken } from '../events.js';
import { NowRequestHandler } from 'fastify-now';

export const GET: NowRequestHandler = async function (request) {
  const query = request.query as { code: string };
  try {
    await requestAccessToken(query.code);
    return { message: 'Authenticated' };
  } catch (error) {
    console.error(error)
    return { message: error };
  }
};

GET.opts = {
  schema: {
    response: {
      200: Type.Object({
        message: Type.String(),
      }),
    },
  },
};
