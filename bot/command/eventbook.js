// eventbook.js
[
  'add_event',
  'get_event',
  'cancel_event',
  'add_attendee',
  'remove_attendee',
  'list'
].forEach(
  (f) => { return eval(`module.exports.${f}=${f}`); }
);

var add_event = function(owner, description) { return 5; };

var get_event = function(id) {
  return {
    id: '',
    name: '',
    owner: '',
    start_time: '',
    duration: '',
    attendees: []
  };
};

var cancel_event = function(event_id) { return true; };

var add_attendee = function(event_id, name) { return true; };

var remove_attendee = function(event_id, name) { return true; };

var list = function() {
  return [
    { },
    { },
    { }
  ];
};
