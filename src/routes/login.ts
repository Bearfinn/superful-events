import { NowRequestHandler } from 'fastify-now';
import { authUrl } from '../events.js';

export const GET: NowRequestHandler = async function (request, response) {
  return response.redirect(authUrl)
};