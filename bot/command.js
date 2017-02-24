var command = function() {
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
  help: function(msg) {
    help_topics = [schedule,signup,list,cancel,dropout]
    subcmd = msg.words.shift()

    return help_topics.includes(subcmd) ? eval(`this.reply.help_${subcmd}()`) : this.reply.help_default();
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
      return this.reply.only_leader_schedules();
    };

  },

  cancel: function(msg) {
    // next word should be the event id
    requested_id = msg.words.shift()
    try {
      calendar_event = eventbook.get_event(id);
    } catch(err) {
      log(err);
      return this.reply.invalid_event();
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
  },

  list: function(msg) {
    var event_list = [];
    var reply = []

    eventbook.list().forEach( e => event_list.push(e) );
    event_list.sort.forEach( e => reply.push(this.replies.show_event(e)) );
    return reply.join("\n");
  },

  signup: function(msg) {
    return this.todo();
  },

  dropout: function(msg) {
    return this.todo();
  },
};
