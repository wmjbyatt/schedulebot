#!/usr/bin/nodejs --use-strict
const Discord = require('discord.js');
const client = new Discord.Client();

global.config = require('./config.json');

global.log = function(msg) {
  console.log(Date.now() + ' - ' + msg);
};

global.debug = function(msg) {
  if (config.debug) {log('DEBUG - ' + msg)};
};

var bot = require('./bot.js');

/*
var log = function(msg,lvl) {
  log_levels: ['INFO','DEBUG'];
  get_level: function (n) { return this.log_levels[n]; };
  format_entry: function(msg,lvl) {return `${Date.now()} - ${this.get_level(lvl)} - ${msg}`;};

  console.log(log_entry(msg,lvl));
};
*/

log('test log');
  
client.on('ready', () => { log(`${config.my_name} online!`) });

client.on('message', function(message) {
  var msg = {
      words: message.cleanContent.split(' '),
      author: message.author.username,
      channel: message.channel.name,
      from_leader: true, // message.author.hasRole(config.leader_role),
      bot_mentioned: message.isMentioned(client.user),
    };

    debug(`message received from ${msg.author} in ${msg.channel}`);

    var reply = bot.hear(msg);
    
    if (reply) {
      log(`replying to ${msg.author} in ${msg.channel}`);
      message.reply(reply);
    };
});

client.login(config.auth_token); // Make it go
