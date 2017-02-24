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

  show_event = function(e) { return `At ${rounded_date(e.start_time,hours,)}, ${e.name ? e.name : "event"} with ${e.owner} for ${e.duration}.`; }

  rounded_date: function(date,increment,tz { // TODO
    return(this.say_date(date,tz));
  },

  say_date: function(date,tz) {
    try {
      return String(date);
    } catch(err) {
      log("invalid date in say_date");
      return this.crazy_date();
    };
  },

  crazy_date: function() { return "Flubuary the 42nd at thirteen o' clock" };


};
