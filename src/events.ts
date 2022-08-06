import axios from "axios";
import { auth, Client } from "twitter-api-sdk";
import { SuperfulEvent } from "types/Event";

let newEvents: SuperfulEvent[] = [];

const authClient = new auth.OAuth2User({
  client_id: process.env.TWITTER_CLIENT_ID as string,
  client_secret: process.env.TWITTER_CLIENT_SECRET as string,
  callback: process.env.TWITTER_OAUTH_CALLBACK_URL as string,
  scopes: ["tweet.read", "tweet.write", "users.read"]
})

export const authUrl = authClient.generateAuthURL({ state: "yes", code_challenge: "superduperful", code_challenge_method: "plain" })

console.log(`Please use following URL to authorize notification account:

${authUrl}`);

export const client = new Client(authClient)

export const getAccessToken = async (authCode: string) => {
  console.log(`My auth code: ${authCode}`)
  await authClient.requestAccessToken(authCode);
}

export const tweetNewEvent = async (event: SuperfulEvent) => {
  if (authClient.token) {
    await client.tweets.createTweet({
      text: `🎉 New raffle is active! 🎉
  ${event.name} by ${event.project.name}
  
      https://www.superful.xyz/project/${event.project.slug}/${event.type}/${event.slug}`
    })
  }
}

export const checkEvents = async () => {
  const response = await axios.post<{ results: SuperfulEvent[] }>("https://www.superful.xyz/superful-api/v1/project/events", { page: 1 })

  for (const event of response.data.results) {
    if (newEvents.find((newEvent) => newEvent.id === event.id)) continue;
    tweetNewEvent(event);
  }
  newEvents = response.data.results;
  console.log(newEvents.length)
}

export const run = async () => {
  const response = await axios.post<{ results: SuperfulEvent[] }>("https://www.superful.xyz/superful-api/v1/project/events", { page: 1 })
  newEvents = response.data.results;
  setInterval(() => {
    checkEvents();
  }, 5 * 60 * 1000)
}
