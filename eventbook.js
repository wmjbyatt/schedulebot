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
