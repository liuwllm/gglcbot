import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { CronJob } from 'cron';
import fs from 'fs';

const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
    ] 
});

function scheduleMessage(lcQuestions) {
    let job = new CronJob(
        '0 0 7 * * *', // cron expression that describes when the function below is executed
        function() {
            let num = 0;
            let questionNo = 0;

            const numData = fs.readFileSync('count.txt', 'utf8');

            num = parseInt(numData, 10);
            num += 1;
            questionNo = parseInt(order[num])

            fs.writeFileSync('count.txt', num.toString(), 'utf8');

            const channelId = process.env.LC_CHANNEL_ID;
            const channel = client.channels.cache.get(channelId);

            const lcQuestion = lcQuestions[questionNo]

            const msgToSend = `<@&${process.env.LC_ROLE_ID}>\nLC Question of the Day:\n\*\*Question\:\*\* ${lcQuestion.name}\n\*\*Difficulty:\*\* ${lcQuestion.difficulty}\n\*\*Link:\*\* ${lcQuestion.link}`;
            channel.send(msgToSend).then((msg) => msg.pin());
        },
        null,
        true,
        'America/Toronto' //insert your server time zone here
    );
}

const lcQuestions = JSON.parse(fs.readFileSync('lcdb.json', 'utf8'));
console.log(lcQuestions);

const order = JSON.parse(fs.readFileSync('numbers.json', 'utf8'));
console.log(order);

client.once(Events.ClientReady, c => {
    console.log('Ready! Logged in as', c.user.tag);
    scheduleMessage(lcQuestions);
});

// Log in to Discord with your client's token
client.login(token);

