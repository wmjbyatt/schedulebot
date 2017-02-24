var reply = function {

  confused: function() { return "I'm sorry, I don't understand."; },

  todo: function() { return "This feature is not yet implemented."; },

  complaint: function() { return "I have a headache."; }

  confirm_cancel_event: function(id) {
    return `You asked me to delete the following event: ${id}. ` +
      `If you're really sure, say "${config.my_name} cancel ${id} yes I'm sure"`;
  };

  only_owner_deletes: function(owner) { return `Only ${owner} can delete that event.`; };

  only_leader_schedules: function(role) { return `Scheduling new events is restricted to users with role ${role},`; };

  add_event_success: function(id) { return `Event ${id} has been added.`; };

  cancel_event_success: function(id) { return `Event ${id} has been deleted.`; };

  signup_success: function(id) { return `You have been added to the roster for event ${id}.`; };

  dropout_success: function(id) { return `You have dropped out of event ${id}.`; };

  show_event = function(e) { return `At ${rounded_date(e.start_time,hours,)}, ${e.name ? e.name : "event"} with ${e.owner} for ${e.duration}.`; }

  event_lookup_error = function(id) { return `Maybe ${requested_id} isn't a valid event ID, or perhaps there's something else wrong.`; };

  rounded_date: function(date,increment,tz { // TODO
    return(this.say_date(date,tz));
  },

  say_date: function(date,tz) {
    try {
      // TODO limit precision to a reasonable default
      return String(date);
    } catch(err) {
      log("invalid date in say_date");
      return this.crazy_date();
    };
  },

  crazy_date: function() { return "Flubuary the 42nd at thirteen o' clock" };

  help_schedule: function() { return this.todo(); };

  help_cancel: function() { return this.todo(); };

  help_list: function() { return this.todo(); };

  help_signup: function() { return this.todo(); };

  help_dropout: function() { return this.todo(); };

  help_default: function(cmds) { return `The commands I know are: ${cmds.join(', ')}.  Try: ${config.my_name} help <command>.`; };

};
