import { Type } from '@sinclair/typebox';
import { getAccessToken } from '../events.js';
import { NowRequestHandler } from 'fastify-now';

export const GET: NowRequestHandler = async function (request) {
  const query = request.query as { code: string };
  getAccessToken(query.code);
  return { message: 'Authenticated' };
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
