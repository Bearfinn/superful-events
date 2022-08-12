import { NowRequestHandler } from "fastify-now";

export const GET: NowRequestHandler = async function () {
  return { status: 'healthy' };
};