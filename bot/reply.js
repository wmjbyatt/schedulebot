// bot/reply.js

var todo = function() { return "This feature is not yet implemented."; };

var confused = function(err) {
  log( `confused by ${String(err)}` );
  return "I'm sorry, I don't understand.";
};

var complaint = function(err) {
  log( `complaining at ${String(err)}` );
  return "I have a headache.";
};


var confirm_cancel_event = function(id) {
  return `You asked me to delete the following event: ${id}. ` +
    `If you're really sure, say "${config.my_name} cancel ${id} yes I'm sure"`;
};

var only_owner_deletes = function(owner) { return `Only ${owner} can delete that event.`; };

var only_leader_schedules = function(role) { return `Scheduling new events is restricted to users with role ${role},`; };

var add_event_success = function(id) { return `Event ${id} has been added.`; };

var cancel_event_success = function(id) { return `Event ${id} has been deleted.`; };

var signup_success = function(id) { return `You have been added to the roster for event ${id}.`; };

var dropout_success = function(id) { return `You have dropped out of event ${id}.`; };

var show_event = function(e) { return `At ${rounded_date(e.start_time,hours,tz)}, ${e.name ? e.name : "event"} with ${e.owner} for ${e.duration}.`; };

var event_lookup_error = function(id) { return `Maybe ${id} isn't a valid event ID, or perhaps there's something else wrong.`; };

var schedule_event_error = function() { return "I couldn't schedule your event for some reason."; };

var rounded_date = function(date,increment,tz) { // TODO
  return(say_date(date,tz));
};

var say_date = function(date,tz) {
  try {
    // TODO limit precision to a reasonable default
    return String(date);
  } catch(err) {
    log("invalid date in say_date");
    return crazy_date();
  };
};

var crazy_date = function() { return "Flubuary the 42nd at thirteen o' clock" };

var help_todo = function() { return "I haven't been taught how to help you with that." };

var help_schedule = function() { return help_todo(); };

var help_cancel = function() { return help_todo(); };

var help_list = function() { return help_todo(); };

var help_signup = function() { return help_todo(); };

var help_dropout = function() { return help_todo(); };

var help_default = function(cmds) { return `The commands I know are: ${cmds.join(', ')}.  Try: ${config.my_name} help <command>.`; };

/*
// Fuck you, nodejs.
*/
[
  'confused',
  'todo',
  'complaint',
  'confirm_cancel_event',
  'only_owner_deletes',
  'add_event_success',
  'cancel_event_success',
  'signup_success',
  'dropout_success',
  'show_event',
  'event_lookup_error',
  'schedule_event_error',
  'rounded_date',
  'say_date',
  'crazy_date',
  'help_todo',
  'help_cancel',
  'help_list',
  'help_signup',
  'help_dropout',
  'help_default'
].forEach(
  (f) => { eval(`module.exports.${f}=${f}`); }
);
