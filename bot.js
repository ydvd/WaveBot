const discord = require('discord.js');
const bot = new discord.Client();
var fs = require('fs');
// const auth = require('auth.json');

bot.on('ready', () => {
    console.log('Logged in as ' + bot.user.tag);
});

bot.on('message', msg => {
    if (msg.content === 'beep') {
        msg.channel.send('boop!');
    }
});



bot.login(JSON.parse(fs.readFileSync('auth.json')).token);

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