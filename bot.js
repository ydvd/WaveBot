const discord = require('discord.js');
var fs = require('fs');
const client = new discord.Client();

//#region channel_ids
const CH_WT_TEXT_GENERAL_ID = '669115660772573187';
const CH_WT_TEXT_BOT_ID = '669116268053266433';
const CH_WT_VOICE_GENERAL_ID = '669115660772573188';
const CH_WT_VOICE_DUNGEON_ID = '669115787025317919';
const CH_WT_VOICE_RAID_ID = '669115809901314059';

const CH_ABY_TEXT_OFFICER_GENERAL_ID = '699695930441597068';
const CH_ABY_VOICE_SOCIALRAID_ID = '648227986285264919';
const CH_ABY_VOICE_RAID_ID = '567035577980157972';
//#endregion

var activeListeners = [
    CH_WT_VOICE_RAID_ID
];

client.login(JSON.parse(fs.readFileSync('auth.json')).token);

/** When ready to start */
client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag);
});

/** Updates on messages in text channels */
client.on('message', msg => {
    // Only reply when called
    if(msg.content.substr(0, 4) != '!wb ') {
        return;
    }
    // else {

        console.log('Being called! Replying');
        let message = msg.content.substr(4);

        if (message == 'beep') {
            msg.channel.send('boop!');
        }
    
        if(message == 'ego') {
            msg.channel.send('Ego meter currently at: 100%');
        }
    
        if(message == 'repo') {
            msg.channel.send('Check out the repository here: http://github.com/ydvd/WaveBot')
        }
    
    // }
});

/** Updates on joining/leaving voice channels */
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;

    if(oldUserChannel === undefined && newUserChannel !== undefined) {

        // User Joins a voice channel
        console.log('Someone joins a voice channel!');
   
     } else if(newUserChannel === undefined){
            
        console.log('Someone leaves a voice channel!');
        // console.log(oldMember.member.displayName);
        console.log(oldMember.voiceChannel)

        // User leaves a voice channel
   
        if(activeListeners.includes(oldMember.channel.id)) {
            client.channels.fetch(CH_WT_TEXT_BOT_ID)
                .then(ch => ch.send(oldMember.member.displayName + ' left voice channel ' + oldMember.channel.name));
        }
     }

});


