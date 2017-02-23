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
    return this.complaint();
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
    if (msg.from_leader) {

      try {
        id = eventbook.add_event(msg.author,msg.words);
        this.success(id);
      } catch(err) {
        return this.internal_error(err);
      };

    } else {
      return this.leader_only();
    };

    var leader_only = function(role) {
      return `Scheduling new events is restricted to users with role ${role}.`;
    };

    var success = function(id) {
      return `Event added with ID ${id}.`
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
      return this.owner_only(calendar_event.owner);
    } else if (words[0].match(/yes/i)) {
      return this.confirm_cancel(id);
    } else {
      
      try {
        eventbook.cancel(requested_id);
        return this.success(requested_id);
      } catch(err) {
        return this.internal_error(err);
      }

    };

    var owner_only = function(owner) {
      return `Only ${owner} can delete that event.`;
    };

    var confirm_cancel = function(id) {
      return `You asked me to delete the following event: ${id}. ` +
        `If you're really sure, say "${config.my_name} cancel ${id} yes I'm sure"`;
    };

    var success = function(id) {
      return `Event ${id} has been deleted.`;
    };
  },

  list: function(msg) {
    return this.todo();
  },

  signup: function(msg) {
    return this.todo();
  },

  dropout: function(msg) {
    return this.todo();
  },

  todo: function() { return "This feature is not yet implemented."; },
  complaint: function() { return "I have a headache."; }
};
