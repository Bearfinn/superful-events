// Require the necessary discord.js classes
import { Client, GatewayIntentBits, TextChannel } from 'discord.js'
const token = "MTAwNDk1NTMzODE4Mjc3MDc3OQ.G3ouLF.wCQknQvR1gmwsN5aZHblv1WrP7Ss2L8gBI98vA"

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);

console.log("Discord");

client.on("webhookUpdate", (listener) => {
  const url = "https://discord.com/api/oauth2/authorize?client_id=1004955338182770779&permissions=536870912&redirect_uri=http%3A%2F%2Flocalhost%3A5050%2Fcallback-discord&response_type=code&scope=webhook.incoming%20bot"
})

client.on("interactionCreate", async () => {
  const channel = client.channels.cache.get("1005420595934142464")

  channel?.createWebhook({
    name: 'Some-username',
    avatar: 'https://i.imgur.com/AfFp7pu.png',
  })
    .then(webhook => console.log(`Created webhook ${webhook}`))
    .catch(console.error);
});


