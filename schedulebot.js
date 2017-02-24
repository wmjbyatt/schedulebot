#!/usr/bin/nodejs --use_strict
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');

// import tree
require('./eventbook.js');
require('./bot.js');

var log = function(msg,lvl) {
  log_levels: ['INFO','DEBUG'];
  get_level: function (n) { return this.log_levels[n]; };
  format_entry: function(msg,lvl) {return `${Date.now()} - ${this.get_level(lvl)} - ${msg}`;};

  console.log(log_entry(msg,lvl));
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
