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
    log('parsing: ' + msg);

    return this.should_hold_tongue(author,channel) ? null : this.reply_to( msg, author);
  },

  listening_to: function( channel ) {
    log('reached listening_to')
    return config.active_channels.includes(channel) ? true : false;
  },

  should_hold_tongue: function( author, channel ) {
    log('reached should_hold_tongue')
    return this.listening_to(channel) && ( author != config.my_name ) ? false : true;
  },

  take_request: function( cmd ) {
    log('reached take_request')
    return this.my_commands.includes( cmd ) ? eval(`this.${cmd}(msg,speaker)`) : null;
  },

  reply_to: function( msg, speaker ) {
    var cmd = msg.shift();
    log('replying to command: ' + cmd);

    var answer = this.take_request( msg, speaker ) 

    return answer ? answer : this.confused_reply();
  },

  confused_reply: function() {
    log('unknown command')
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

    log(`message received from ${author} in ${channel}`);

    var bot_reply = bot.parse( content, author, channel );
    
    if ( bot_reply ) { message.reply( bot_reply ) };
});

client.login(config.auth_token); // Make it go
