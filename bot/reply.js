const REPLIES = {
  only_owner_deletes:     (owner) => { return `Only ${owner} can delete that event.`; },
  only_leader_schedules:  (role)  => { return `Scheduling new events is restricted to users with role ${role},`; },
  add_event_success:      (id)    => { return `Event ${id} has been added.`; },
  cancel_event_success:   (id)    => { return `Event ${id} has been deleted.`; },
  signup_success:         (id)    => { return `You have been added to the roster for event ${id}.`; },
  dropout_success:        (id)    => { return `You have dropped out of event ${id}.`; },
  show_event:             (e)     => { return `At ${rounded_date(e.start_time,hours,tz)}, ${e.name ? e.name : "event"} with ${e.owner} for ${e.duration}.`; },
  event_lookup_error:     (id)    => { return `Maybe ${id} isn't a valid event ID, or perhaps there's something else wrong.`; },

  confused: (err) => {
    log( `confused by ${String(err)}` );
    return "I'm sorry, I don't understand.";
  },

  todo: () => { return "This feature is not yet implemented."; },

  complaint: (err) => {
    log( `complaining at ${String(err)}` );
    return "I have a headache.";
  },

  confirm_cancel_event: (id) => {
    return `You asked me to delete the following event: ${id}. ` +
      `If you're really sure, say "${config.my_name} cancel ${id} yes I'm sure"`;
  },

  schedule_event_error: () => { return "I couldn't schedule your event for some reason."; },

  rounded_date: (date, increment, tz) => { // TODO
    return(this.say_date(date, tz));
  },

  say_date: (date, tz) => {
    try {
      // TODO limit precision to a reasonable default
      return String(date);
    } catch(err) {
      log("invalid date in say_date");
      return this.crazy_date();
    };
  },

  crazy_date:     ()      => { return "Flubuary the 42nd at thirteen o' clock" },
  help_todo:      ()      => { return "I haven't been taught how to help you with that." },
  help_schedule:  ()      => { return this.help_todo(); },
  help_cancel:    ()      => { return this.help_todo(); },
  help_list:      ()      => { return this.help_todo(); },
  help_signup:    ()      => { return this.help_todo(); },
  help_dropout:   ()      => { return this.help_todo(); },
  help_default:   (cmds)  => { return `The commands I know are: ${cmds.join(', ')}.  Try: ${config.my_name} help <command>.`; },
};

module.exports = REPLIES;
