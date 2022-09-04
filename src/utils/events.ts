import axios from 'axios';

import { SuperfulEvent, SuperfulEventOverview } from 'types/Event';
import { twitterClient, isAuthenticated, authClient } from './auth.js';
import { message } from './formatting.js';

export let monitoredEvents: SuperfulEvent[] = [];

export const getEventOverview = async (eventShort: SuperfulEvent) => {
  const response = await axios.get(
    `https://www.superful.xyz/superful-api/v1/project/${eventShort.project.slug}?event_slug=${eventShort.slug}`,
  );

  const eventOverview: SuperfulEventOverview = response.data;
  return eventOverview;
};

export const getServerIdFromInviteCode = async (inviteCode?: string) => {
  try {
    if (!inviteCode) return null;
    const response = await axios.get(`https://discordapp.com/api/invite/${inviteCode}`);
    return response.data.guild.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const handleNewEvent = async (eventShort: SuperfulEvent) => {
  console.log("Event detected: ", eventShort.name)
  if (!isAuthenticated) {
    console.error('Not authenticated yet. Tweet not sent.');
    return;
  }

  const eventOverview = await getEventOverview(eventShort);
  const { events, project } = eventOverview;
  const event = events[0];

  const requireDiscord = event.discord_requirements.required;
  const requireTwitter = event.twitter_requirements;

  // const projectInviteCode = project.discord_invite_code;
  // const eventServerId = event.discord_requirements.requirements?.[0]?.server_id
  // const projectServerId = await getServerIdFromInviteCode(projectInviteCode);

  // This event is hosted by their own Discord only
  // const isProjectOwnDiscord = !!(eventServerId && projectServerId && eventServerId === projectServerId);

  if (!requireDiscord) {
    try {
      if (authClient.isAccessTokenExpired()) {
        await authClient.refreshAccessToken()
      }
      await twitterClient.tweets.createTweet({
        text: message(`
          🎉 New raffle is active! 🎉
          ${event.name} by ${project.name} @${project.twitter_username}
    
          ${
            requireDiscord
              ? `👾 Join Project Discord https://discord.gg/${event.discord_requirements.requirements[0].server_invite_code}`
              : '✅ No Discord required'
          }
          ${
            requireTwitter.length > 0
              ? `🕊 Follow ${requireTwitter.map((account) => `@${account}`).join(', ')}`
              : '✅ No Twitter required'
          }
    
          https://www.superful.xyz/project/${project.slug}/${event.type}/${event.slug}
        `),
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export const checkEvents = async () => {
  const response = await axios.post<{ results: SuperfulEvent[] }>(
    'https://www.superful.xyz/superful-api/v1/project/events',
    { page: 1 },
  );

  for (const newEvent of response.data.results) {
    if (monitoredEvents.find((event) => event.id === newEvent.id)) continue;
    handleNewEvent(newEvent);
  }

  monitoredEvents = response.data.results;
};

export const monitorEvents = async () => {
  console.log('Monitoring events...');
  const response = await axios.post<{ results: SuperfulEvent[] }>(
    'https://www.superful.xyz/superful-api/v1/project/events',
    { page: 1 },
  );
  monitoredEvents = response.data.results;
  console.log(`Found ${response.data.results.length} active events.`);

  await checkEvents();
  setInterval(() => {
    checkEvents();
  }, 5 * 60 * 1000);
};
