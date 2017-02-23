#!/usr/bin/nodejs --use_strict
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');

function log(msg) {
  console.log(Date.now() + ' - ' + msg);
};

function debug(msg) {
  if (config.debug) {log('DEBUG - ' + msg)};
};

var eventbook = {
  add_event: function(owner, description) { return 5; },

  get_event: function(id) {
    return {
      id: '',
      name: '',
      owner: '',
      start_time: '',
      duration: '',
      attendees: []
    };
  },

  cancel_event: function(event_id) { return true; },

  add_attendee: function(event_id, name) { return true; },

  remove_attendee: function(event_id, name) { return true; },

  list: function() {
    return [
      { },
      { },
      { }
    ];
  },
};

var bot = {
  my_commands: [ 'help', 'schedule', 'cancel', 'list', 'signup' ],
  /* 
  / 
  / TODO: support modular registration of new commands
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

  // commands

  help: function(msg) {
    subcmd = msg.words.shift()
    
    switch(subcmd) {
      case schedule:
         
      case cancel:

      case list:

      case signup:

      default: 
        return `The commands I know are schedule, signup, list, cancel, and help.  Try: ${config.my_name} help <command>.` ;
    } 

  },

  schedule: function(msg) {
    if (msg.from_coach) {
      try { return `Event added with ID ${eventbook.add_event( msg.author, msg.words )}` }
      catch(err) { return this.internal_error(err); }
    } else {
      return `Scheduling new events is restricted to users with role ${config.leader_role}.`
    };
  },

  cancel: function(msg) {
    // next word should be the event id
    requested_id = msg.words.shift()
    try {
      calendar_event = eventbook.get_event(id);
    } catch(err) {
      log(err);
      return `Either ${requested_id} isn't a valid event ID, or there's something wrong with my brain.`;
    }
    

    if (calendar_event.owner != msg.author) {
      return `Only ${calendar_event.owner} can delete that event.` 
    } else if (words[0].match(/yes/i)) {
      return `You asked me to delete the following event: ${this.show_event(calendar_event.id)}. ` +
        `If you're really sure, say "${config.my_name} cancel ${requested_id} yes I'm sure"`;
    } else {
       
    }

    return this.todo;
  },

  list: function(msg) {
    return this.todo;
  },

  signup: function(msg) {
    return this.todo;
  },

  todo: "This feature is not yet implemented."
}

// Now register callbacks to the discord client
  
client.on('ready', () => { log(`${config.my_name} online!`) });

client.on('message', function(message) {

    debug('split content: ' + message.content.split(' '));

    var msg = {
      words: message.cleanContent.split(' '),
      author: message.author.username,
      channel: message.channel.name,
      from_coach: true, // message.author.hasRole(config.leader_role),
      bot_mentioned: message.isMentioned(client.user),
    };

    log(`message received from ${msg.author} in ${msg.channel}`);

    var bot_reply = bot.parse(msg);
    
    if ( bot_reply ) { message.reply( bot_reply ) };
});

client.login(config.auth_token); // Make it go
