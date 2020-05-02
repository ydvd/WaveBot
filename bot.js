const discord = require('discord.js');
var fs = require('fs');
const bot = new discord.Client();
// const auth = require('auth.json');

bot.on('ready', () => {
    console.log('Logged in as ' + bot.user.tag);
});

bot.on('message', msg => {
    // Only reply when called
    if(msg.content.substr(0, 4) != '!wb ') {
        console.log("Irrelevant message, ignore");
        return;
    }
    else {
        console.log('Being called! Replying');
        let message = msg.content.substr(4);

        if (message == 'beep') {
            msg.channel.send('boop!');
        }
    }
});

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;

    if(oldUserChannel === undefined && newUserChannel !== undefined) {

        // User Joins a voice channel
        console.log('Someone joins a voice channel!');
   
     } else if(newUserChannel === undefined){
            
        console.log('Someone leaves a voice channel!');
        console.log(oldMember.member.displayName);
       // User leaves a voice channel
   
     }

});


bot.login(JSON.parse(fs.readFileSync('auth.json')).token);
