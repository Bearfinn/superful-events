import { NowRequestHandler } from "fastify-now";

export const GET: NowRequestHandler = async function (request) {
  console.log(request.query, request.params)
  return { hello: 'world' };
};