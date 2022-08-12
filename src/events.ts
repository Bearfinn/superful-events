import axios from 'axios';
import { auth, Client } from 'twitter-api-sdk';
import { SuperfulEvent, SuperfulEventOverview } from 'types/Event';

let newEvents: SuperfulEvent[] = [];

const authClient = new auth.OAuth2User({
  client_id: process.env.TWITTER_CLIENT_ID as string,
  client_secret: process.env.TWITTER_CLIENT_SECRET as string,
  callback: process.env.TWITTER_OAUTH_CALLBACK_URL as string,
  scopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
});

export const authUrl = authClient.generateAuthURL({
  state: 'yes',
  code_challenge_method: 's256',
});

console.log(`Please use following URL to authorize notification account:

${authUrl}`);

export const client = new Client(authClient);

export const requestAccessToken = async (authCode: string) => {
  console.log(`My auth code: ${authCode}`);
  await authClient.requestAccessToken(authCode);
};

export const tweetNewEvent = async (eventShort: SuperfulEvent) => {
  if (!authClient.token) {
    console.error('Not authenticated yet. Tweet not sent.');
    return;
  }

  const response = await axios.get(
    `https://www.superful.xyz/superful-api/v1/project/${eventShort.project.slug}?event_slug=${eventShort.slug}`,
  );
  const eventOverview: SuperfulEventOverview = response.data;
  console.log(eventOverview);
  const event = eventOverview.events[0];
  const project = eventOverview.project;
  const requireDiscord = event.discord_requirements.required;
  const requireTwitter = event.twitter_requirements;
  await client.tweets.createTweet({
    text: `🎉 New raffle is active! 🎉
${event.name} ❤️ by ${project.name} @${project.twitter_username}

${requireDiscord ? '👾 Join Project Discord' : '✅ No Discord required'}
${
  requireTwitter.length > 0
    ? `🕊 Follow ${requireTwitter.map((account) => `@${account}`).join(', ')}`
    : '✅ No Twitter required'
}

    https://www.superful.xyz/project/${project.slug}/${event.type}/${event.slug}`,
  });
};

export const checkEvents = async () => {
  const response = await axios.post<{ results: SuperfulEvent[] }>(
    'https://www.superful.xyz/superful-api/v1/project/events',
    { page: 1 },
  );

  for (const event of response.data.results) {
    if (newEvents.find((newEvent) => newEvent.id === event.id)) continue;
    tweetNewEvent(event);
  }
  newEvents = response.data.results;
  console.log(newEvents.length);
};

export const run = async () => {
  const response = await axios.post<{ results: SuperfulEvent[] }>(
    'https://www.superful.xyz/superful-api/v1/project/events',
    { page: 1 },
  );
  newEvents = response.data.results;
  checkEvents();
  setInterval(() => {
    checkEvents();
  }, 5 * 60 * 1000);
};
