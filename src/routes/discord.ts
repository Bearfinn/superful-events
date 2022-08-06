import { Type } from '@sinclair/typebox';
import { NowRequestHandler } from 'fastify-now';

export const GET: NowRequestHandler = async function () {
  return { hello: 'world' };
};

GET.opts = {
  schema: {
    response: {
      200: Type.Object({
        hello: Type.String(),
      }),
    },
  },
};
