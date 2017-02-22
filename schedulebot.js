#!/usr/bin/nodejs --use_strict
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');

function log(msg) {
  console.log(Date.now() + ' - ' + msg);
};

function debug(msg) {
  if (config.debug) { log('DEBUG - ' + msg) };
};

var eventbook = {
  add_event: function(owner, description) { return 5; },
  cancel_event: function(event_id) {},
  signup: function(event_id, name) {},
  cancel_signup: function(owner, event_id) {},
  list: function() {},
};

var bot = {
  my_commands: [ 'help', 'schedule', 'cancel', 'list', 'signup' ],
  /* 
  / 
  / TODO: support modular registration of a new grammar
  /
  my_commands: [],

  command: function(name, func) {
    bot.my_commands.push(name);
    return function() {
      debug('reached ' + name); func;
    };
  },

  do_thing: command( 'do_thing', function(msg) {
      // do the thing to msg
  });
  */

  // Grammar nodes:

  parse: function(msg) {
    log('parsing: ' + msg.words );
    var keyword = config.alert_words ? msg.words.shift() : null;

    if ( !this.listening_to(msg.channel) ) {
      return null;
    } else if ( !this.for_me(keyword) ){
      return null;
    } else if ( msg.author == config.my_name) {
      return null
    } else {
      return this.reply_to(msg);
    };
  },

  listening_to: function(channel) {
    return config.active_channels.includes(channel) ? true : false;
  },

  for_me: function(keyword) {
    debug('function: for_me');
    debug('config.alert_words: ' + config.alert_words);
    debug('keyword: ' + keyword);
    
    var alert = function (word) { return config.alert_words.includes(word) ? true : false; };
    /*
    /
    / TODO: Fix this:
    /
    var alert = function (word) {
      config.alert_words.map( function(x) {return x.includes(word);} );
    };
    */

    if (config.alert_words) {
      return alert(keyword) ? true : false;
    } else {
      return true;
    };
  },

  reply_to: function(msg) {
    var answer = this.take_request(msg) 
    return answer ? answer : this.confused_reply();
  },

  take_request: function(msg) {
    if (msg) { 
      var cmd = msg.words.shift();
      log('invoking: ' + cmd);
      return this.my_commands.includes(cmd) ? eval(`this.${cmd}(msg)`) : null;
    } else {
      return null;
    };
  },

  // Replies:

  confused_reply: function() {
    log('unknown command')
    return "I'm sorry, I don't understand.";
  },

  internal_error: function(err) {
    log(err);
    return "I have a headache.";
  },

  help: function(msg) {
    return "This is a stub help function.";
  },

  schedule: function(msg, author) {
    try { return "Event added with ID " + eventbook.add_event(msg, author); }
    catch(err) { return internal_error(err); }
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

    debug('split content: ' + message.content.split(' '));

    var msg = {
      words: message.cleanContent.split(' '),
      author: message.author.username,
      channel: message.channel.name,
      from_coach: function() { message.author.hasRole(config.leader_role); },
      bot_mentioned: message.isMentioned(client.user),
    };

    debug('msg.words: ' + msg.words);

    log(`message received from ${msg.author} in ${msg.channel}`);

    var bot_reply = bot.parse(msg);
    
    if ( bot_reply ) { message.reply( bot_reply ) };
});

client.login(config.auth_token); // Make it go
