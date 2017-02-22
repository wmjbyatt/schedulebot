#!/usr/bin/nodejs --use_strict
const Discord = require("discord.js");
const client = new Discord.Client();

var config = require('./config.json');

/*
// config file contents:
{
  auth_token: 'REDACTED',
  active_channels: ['channel_name'],
  my_name: 'botname'
}
*/

/*
// TODO: Implement these.  They'll need data structures and somewhere to put them...

function eventbook() {
  add_event: function(owner, title, description) {};
  cancel_event: function(event_id) {};
  signup: function(event_id, name) {};
  cancel_signup: function(owner, event_id) {};
  list: function() {};
};
*/

function log(msg) {
  console.log(String(msg))
};

var bot = {
  my_commands: [ 'help', 'schedule', 'cancel', 'list', 'signup' ],

  parse: function( content, author, channel ) {
    var msg = content.split(' ');
    console.log(author);

    if ( this.listening_to(channel) && ( author != config.my_name )) {
      return this.reply_to( msg, author );
    } else {
      return null;
    }
  },

  listening_to: function(channel) {
    return config.active_channels.includes(channel) ? true : false;
  },

  reply_to: function( msg, speaker ) {
    var cmd = msg.shift();
    if ( this.my_commands.includes(cmd) ) {
      return eval(`this.${cmd}(msg,speaker)`)
    } else {
      return this.confused_reply();
    };
  },

  /*
  // If the above looks messy, it replaced this:

  this.reply_to = function(msg,speaker) {
    switch(keyword = phrase.shift()) {
      case 'help': return help(phrase);
      case 'schedule': return schedule(phrase);
      case 'cancel': return cancel(phrase);
      case 'list': return list(phrase);
      case 'signup': return signup(phrase);
      default: return confused_reply();
    }
  } 
  */

  confused_reply: function() {
    return "I'm sorry, I don't understand.";
  },

  help: function(msg) {
    return "This is a stub help function.";
  },

  schedule: function() {

  },

  cancel: function() {

  },

  list: function() {

  },

  signup: function() {

  },


}

// Now register callbacks to the discord client
  
client.on('ready', () => { log(`${config.my_name} online!`) });

client.on('message', function(message) {
    var content = message.content;
    var author = message.author.username;
    var channel = message.channel.name;

    var bot_reply = bot.parse( content, author, channel );
    
    if ( bot_reply ) { message.reply( bot_reply ) };
});

client.login(config.auth_token); // Make it go
