const discord = require('discord.js');
var fs = require('fs');
const client = new discord.Client();

const channel_ids = {
    wavetest : {
        text : {
            general :           '669115660772573187',
            bot :               '669116268053266433'
        },
        voice : {
            general :           '669115660772573188',
            dungeon :           '669115787025317919',
            raid :              '669115809901314059'
        }
    },
    abyss_tavern : {
        text : {
            guild_chat :        '689166130656706744',
            officer_general :   '699695930441597068',
            officer_bot :       '708400727529095181'
        },
        voice : {
            social_raid :       '648227986285264919',
            raid :              '567035577980157972'
        }
    }
};

const follower_uid = 151376963339157504;

const states = {
    OVERWATCH: 'overwatch',
    FOLLOW: 'follow',
    DISABLED: 'disabled'
};

var state = states.OVERWATCH;

var activeTextListeners = [
    channel_ids.wavetest.text.general,
    channel_ids.wavetest.text.bot,
    channel_ids.abyss_tavern.text.officer_general,
    channel_ids.abyss_tavern.text.officer_bot
];
var activeTextOutputs = [
    channel_ids.wavetest.text.bot /* ,
    channel_ids.abyss_tavern.text.officer_general */
];
var activeVoiceListeners = [
    channel_ids.wavetest.voice.dungeon,
    channel_ids.wavetest.voice.raid,
    channel_ids.abyss_tavern.voice.social_raid,
    channel_ids.abyss_tavern.voice.raid
];

try {
    client.login(JSON.parse(fs.readFileSync('auth.json')).token);
    
} catch (error) {
    console.error('Could not connect to Discord!');    
}

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

    // State update
    if (message.substr(0, 4) == 'mode') {
        changeState(msg, message.substr(5));     
    }

    if(message == 'status') {
        msg.reply(
            'printing current status: \n' + 
            'Mode: ' + state
        );
    }

    if (message == 'beep') {
        msg.channel.send('boop');
    }
    if (message == 'beep!') {
        msg.reply('boop!');
    }

    if (message == 'ego') {
        msg.channel.send('Ego meter currently at: 100%');
    }

    if (message == 'join') {
        client.channels.fetch(channel_ids.wavetest.voice.raid)
            .then(raidchannel => raidchannel.join());
    }

    if(message == 'leave') {
        client.channels.fetch(channel_ids.wavetest.voice.raid)
            .then(raidchannel => raidchannel.leave());
    }

    if (message == 'repo') {
        msg.reply('Check out the repository here: http://github.com/ydvd/WaveBot')
    }

    if (message == 'hello there' || message == 'Hello there!' ) {
        let name;
        msg.member.nickname != null ? 
            name = msg.member.nickname : 
            name = msg.member.user.username; 

        let lastChar = name.substr(name.length - 1);
        isVowel(lastChar) ? suffix = 'nobi!' : suffix = 'obi!';

        msg.channel.send('General ' + name + suffix); 
    }

});

/** Updates on joining/leaving voice channels */
client.on('voiceStateUpdate', (oldMember, newMember) => {

    console.log('Someone changed channel status! Channel ID: ' + oldMember.channelID + ' | ' + newMember.channelID);

    if (oldMember.channelID == null && oldMember.channelID != null) {
        // User joins channel
    }
    else if (oldMember.channelID != null && newMember.channelID == null) {
        // User leaves channel
        if ( (state == states.OVERWATCH && activeVoiceListeners.includes(oldMember.channelID)) ||
             (state == states.FOLLOW    && false /* Should look for my connected channel */ )) {
            for(let chid of activeTextOutputs) {
                client.channels.fetch(chid)
                    .then(ch => ch.send(
                        new Date(Date.now()).toLocaleString() + ' : **' +
                        oldMember.member.displayName + '** left **' + oldMember.channel.name + '**'));
            }
        }
    }
    else {
        // Something else (mute/deafen/etc change)
        if (oldMember.channelID != newMember.channelID) { // Changed channel, only listening to leaving members (following lines)
            if ( (state == states.OVERWATCH && activeVoiceListeners.includes(oldMember.channelID)) || 
                 (state == states.FOLLOW    && false /* Should look for my connected channel */ )) {
                for(let chid of activeTextOutputs) {
                    client.channels.fetch(chid)
                        .then(ch => ch.send(
                            new Date(Date.now()).toLocaleString() + ' : **' + 
                            oldMember.member.displayName + '** moved from **' + oldMember.channel.name + 
                            '** to **' + newMember.channel.name + '**'));
                }
            }
        }
    }
});

function changeState(msg, newState) {
    let success = false;

    switch(newState) {
        case 'disabled':
            state = states.DISABLED;
            success = true;
            break;
        case 'overwatch':
            state = states.OVERWATCH;
            success = true;
            break;
        case 'follow':
            state = states.FOLLOW;
            success = true;
            break;
        default:
            state = states.OVERWATCH;
            break;
    }
    
    if (success) {
        console.log('State changed to ' + state);
        msg.reply('Mode changed to ' + state);
    }
    else {
        console.log('State change error: ' + newState + ' is not a valid state');
        msg.reply(newState + ' is not a valid mode.')
    }
}

function isVowel(c) {
    c = c.charCodeAt(c);
    var magicNumber = 2198524575;
    c = (c > 96) ? (c-32) : c;
    if( c < 65 || c == 75 || c > 90) 
        return false;
    var div = magicNumber / c;
    var diff = div - Math.floor(div);
    if( diff == 0 )
        return true;
    return false;
}