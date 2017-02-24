#!/usr/bin/nodejs --use_strict
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');

// import tree
require('./eventbook.js');
require('./bot.js');

function log(msg,loglevel) {
  var levels = {
    0: 'INFO',
    1: 'DEBUG',
  };

  console.log(`${Date.now()} - ${this.levels.loglevel} - ${msg}`);
};
  
client.on('ready', () => { log(`${config.my_name} online!`) });

client.on('message', function(message) {
  var msg = {
      words: message.cleanContent.split(' '),
      author: message.author.username,
      channel: message.channel.name,
      from_leader: true, // message.author.hasRole(config.leader_role),
      bot_mentioned: message.isMentioned(client.user),
    };

    log(`message received from ${msg.author} in ${msg.channel}`);

    var bot_reply = bot.parse(msg);
    
    if ( bot_reply ) { message.reply( bot_reply ) };
});

client.login(config.auth_token); // Make it go
