// bot/command.js

var eventbook = require('./command/eventbook.js');
var eventbook = require('./reply.js');

var all_commands = [
  'help',
  'schedule',
  'cancel',
  'list',
  'signup',
  'show'
];

var help = function(msg) {
  help_topics = [schedule,signup,list,cancel,dropout];
  subcmd = msg.words.shift();
  return help_topics.includes(subcmd) ? eval(`reply.help_${subcmd}()`) : reply.help_default();
};

var schedule = function(msg) {
  if (msg.from_leader) {

    try {
      id = eventbook.add_event(msg.author,msg.words);
      return reply.add_event_success(id);
    } catch(err) {
      return reply.event_lookup_error(id);
    };

  } else {
    return reply.only_leader_schedules();
  };

};

var cancel = function(msg) {
  id = msg.words.shift();

  try {
    calendar_event = eventbook.get_event(id);
  } catch(err) {
    log(err);
    return reply.event_lookup_error(id);
  }

  if (calendar_event.owner != msg.author) {
    return owner_only(calendar_event.owner);
  } else if (words[0].match(/yes/i)) {
    return confirm_cancel(id);
  } else {
    try {
      eventbook.cancel(id);
      return reply.cancel_event_success(id);
    } catch(err) {
      return reply.complaint(err);
    };
  };
};

var list = function(msg) {
  var event_list = [];
  var formatted_list = [];

  eventbook.list().forEach( e => event_list.push(e) );
  event_list.sort.forEach( e => formatted_list.push(show(e.id)) );
  return formatted_list.join("\n");
};

var show = function(msg) {
  id = msg.words.shift();

  try {
    eventbook.get_event(id);
  } catch(err) {
    return reply.event_error(id);
  };

  return reply.show_event(id);
};

var signup = function(msg) {
  id = msg.words.shift();

  try {
    eventbook.add_attendee(id,msg.author);
    return reply.signup_success(id);
  } catch(err) {
    return reply.event_lookup_error(id);
  };
};

var dropout = function(msg) {
  id = msg.words.shift();

  try {
    eventbook.remove_attendee(id,msg.author);
    return reply.dropout_success(id);
  } catch(err) {
    return reply.event_lookup_error(id);
  };
};

all_commands.concat('all_commands').forEach(
  (x) => { eval(`module.exports.${x}=${x}`); }
);

