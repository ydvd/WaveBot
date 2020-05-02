const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag}!');
});

client.on('message', msg => {
    if (msg.content === 'beep') {
        msg.channel.send('boop!');
    }
});

client.login('NjY5MTE2NTAxMzk1MjQzMDEw.Xq2ORw.8nBvSns2AzLvzCnpsWfkQUp6LlY');

/*
//Create Client instance with bot token
const bot = new eris.Client('my_token');

// When connected and ready, log to console
bot.on('ready', () => 
{
    console.log('Connected and ready.');
});

// every message, check if bot is mentioned
bot.on('messageCreate', async (msg) => 
{
    const mentioned = msg.mentions.find(mentionedUser => mentionedUser.id === bot.user.id);

    if(mentioned)
    {
        try
        {
            await msg.channel.createMessage('Present!');
        } catch (err)
        {
            console.warn('Failed to respond!');
            Console.warn(err);
        }
    }
});

bot.on('error', err =>
{
    console.warn(err);
});

bot.connect();

*/