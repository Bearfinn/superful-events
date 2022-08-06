import { Type } from '@sinclair/typebox';
import { NowRequestHandler } from 'fastify-now';
import { sleepSecs } from 'twitter-api-v2/dist/v1/media-helpers.v1.js';
import { client } from '../events.js';

export const GET: NowRequestHandler = async function () {
  try {
    const tweets = await client.tweets.usersIdTweets("1555753370224570369", {
      max_results: 100,
    })
    let i = 0;
    for (const tweet of tweets.data || []) {
      client.tweets.deleteTweetById(tweet.id)
      await sleepSecs(1);
      console.log(`deleted ${++i} tweets`);
    }
    return { message: 'Delete request submitted.' };
  } catch (error) {
    console.error(error)
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
