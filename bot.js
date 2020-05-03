const discord = require('discord.js');
var fs = require('fs');
const client = new discord.Client();

const channel_ids = {
    wavetest : {
        text : {
            general : '669115660772573187',
            bot : '669116268053266433'
        },
        voice : {
            general : '669115660772573188',
            dungeon : '669115787025317919',
            raid : '669115809901314059'
        }
    },
    abyss_tavern : {
        text : {
            guild_chat : '689166130656706744',
            officer_general : '699695930441597068'
        },
        voice : {
            social_raid : '648227986285264919',
            raid : '567035577980157972'
        }
    }
};

var activeTextListeners = [
    channel_ids.wavetest.text.general,
    channel_ids.wavetest.text.bot,
    channel_ids.abyss_tavern.text.officer_general
];
var activeTextOutputs = [
    channel_ids.wavetest.text.bot /* ,
    channel_ids.abyss_tavern.text.officer_general */
];
var activeVoiceListeners = [
    channel_ids.wavetest.voice.raid,
    channel_ids.abyss_tavern.voice.social_raid,
    channel_ids.abyss_tavern.voice.raid
];

client.login(JSON.parse(fs.readFileSync('auth.json')).token);

/** When ready to start */
client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag);
});

/** Updates on messages in text channels */
client.on('message', msg => {
    
    // Filtering out irrelevant messages
    if(!activeTextListeners.includes(msg.channel.id)) {
        return; // Not in a watched channel
    }
    if(msg.content.substr(0, 4) != '!wb ') {
        return; // Not using !wb prefix
    }
    
    // Replying to messages
    console.log('Being called! Replying');
    let message = msg.content.substr(4);

    if (message == 'beep') {
        msg.channel.send('boop');
    }
    if (message == 'beep!') {
        msg.reply('boop!');
    }

    if(message == 'ego') {
        msg.channel.send('Ego meter currently at: 100%');
    }

    if(message == 'repo') {
        msg.reply('Check out the repository here: http://github.com/ydvd/WaveBot')
    }
});

/** Updates on joining/leaving voice channels */
client.on('voiceStateUpdate', (oldMember, newMember) => {

    console.log('Someone changed channel status! Channel ID: ' + oldMember.channelID + ' | ' + newMember.channelID);

    if (oldMember.channelID == null && newUserChannel != null) {
        // User joins channel
    }
    else if (oldMember.channelID != null && newMember.channelID == null) {
        // User leaves channel
        if(activeVoiceListeners.includes(oldMember.channelID)) {
            client.channels.fetch(channel_ids.wavetest.text.bot)
                .then(ch => ch.send(
                    new Date(Date.now()).toLocaleString() + ' : **' +
                    oldMember.member.displayName + '** left **' + oldMember.channel.name + '**'));
        }
    }
    else {
        // Something else (mute/deafen/etc change)
        if (oldMember.channelID != newMember.channelID) { // Changed channel
            if(activeVoiceListeners.includes(oldMember.channelID)) {
                client.channels.fetch(channel_ids.wavetest.text.bot)
                    .then(ch => ch.send(
                        new Date(Date.now()).toLocaleString() + ' : **' + 
                        oldMember.member.displayName + '** moved from **' + oldMember.channel.name + 
                        '** to **' + newMember.channel.name + '**'));
            }
        }
    }
});
