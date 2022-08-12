import { auth, Client } from 'twitter-api-sdk';
import { message } from './formatting.js';

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

export const generateAuthURL = () => {
  console.log(
    message(`

      Please use the following URL to authorize notification account:
      ${authUrl}

    `),
  );
};

export const twitterClient = new Client(authClient);

export const requestAccessToken = async (authCode: string) => {
  console.log(`My auth code: ${authCode}`);
  await authClient.requestAccessToken(authCode);
};

export const isAuthenticated = !authClient.token;
