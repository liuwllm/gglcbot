import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { CronJob } from 'cron';

const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


const gcpClient = authorize().then(listEvents);

function scheduleMessage(lcQuestion) {
    let job = new CronJob(
        '48 16 * * *', // cron expression that describes when the function below is executed
        function() {
            channel.send(msgToSend); //insert here what you want to do at the given time
        },
        null,
        true,
        'America/Los_Angeles' //insert your server time zone here
    );
}

client.once(Events.ClientReady, c => {
   console.log('Ready! Logged in as ', c.user.tag);
   scheduleMessage(element.title, element.readabledate);
});

// Log in to Discord with your client's token
client.login(token);

