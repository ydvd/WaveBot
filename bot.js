const discord = require('discord.js');
var fs = require('fs');
const client = new discord.Client();

const CH_TEXT_GENERAL_ID = '669115660772573187';
const CH_TEXT_BOT_ID = '669116268053266433';
const CH_VOICE_GENERAL_ID = '669115660772573188';
const CH_VOICE_DUNGEON_ID = '669115787025317919';
const CH_VOICE_RAID_ID = '669115809901314059';

client.login(JSON.parse(fs.readFileSync('auth.json')).token);

/** When ready to start */
client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag);
});

/** Updates on messages in text channels */
client.on('message', msg => {
    // Only reply when called
    if(msg.content.substr(0, 1) != '!') {
        console.log("Irrelevant message, ignore");
        return;
    }
    else {

        console.log('Being called! Replying');
        let message = msg.content.substr(1);

        if (message == 'beep') {
            msg.channel.send('boop!');
        }
    
        if(message == 'ego') {
            msg.channel.send('Ego meter currently at: 100%');
        }
    
        if(message == 'git') {
            msg.channel.send('Check out the repository here: http://github.com/ydvd/WaveBot')
        }
    
    }
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
        console.log(oldMember.member.displayName);
        // User leaves a voice channel
   
        client.channels.fetch(CH_TEXT_BOT_ID)
            .then(ch => ch.send(oldMember.member.displayName + ' left voice channel ' + oldMember.channel.name));

     }

});


