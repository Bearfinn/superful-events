import { NowRequestHandler } from 'fastify-now';
import { authUrl } from '../utils/auth.js';

export const GET: NowRequestHandler = async function (request, response) {
  return response.redirect(authUrl)
};