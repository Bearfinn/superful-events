import axios from "axios";
import { tweetNewEvent } from "../events.js";
import { NowRequestHandler } from "fastify-now";
import { SuperfulEvent } from "types/Event";

export const GET: NowRequestHandler = async function (request) {
  const response = await axios.post<{ results: SuperfulEvent[] }>("https://www.superful.xyz/superful-api/v1/project/events", { page: 1 })
  const newEvents = response.data.results;
  tweetNewEvent(newEvents[0]);
  return { hello: 'world' };
};