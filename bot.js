var bot = {
  require('bot/reply.js');
  require('bot/command.js');

  my_commands: [ 'help', 'schedule', 'cancel', 'list', 'signup' ],

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

    if (config.alert_words) {
      return this.alert_word(keyword) ? true : false;
    } else {
      return true;
    };
  },

  alert_word: function (word) { return config.alert_words.includes(word) ? true : false; },

  reply_to: function(msg) {
    var answer = this.take_request(msg) 
    return answer ? answer : this.reply.confused();
  },

  take_request: function(msg) {
    if (msg) { 
      var cmd = msg.words.shift();
      log('invoking: ' + cmd);
      return this.my_commands.includes(cmd) ? eval(`this.reply.${cmd}(msg)`) : null;
    } else {
      return null;
    };
  },

  internal_error: function(err) {
    log(err);
    return this.reply.complaint();
  },
};
