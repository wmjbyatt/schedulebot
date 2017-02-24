// bot.js

/*
/ Our only exposed method. Decide whether to speak, then speak.
*/
var hear = function(msg) {
  log('parsing: ' + msg.words );
  var keyword = config.alert_words ? msg.words.shift() : null;

  if ( !listening_to(msg.channel) ) {
    return null;
  } else if ( !for_me(keyword) ){
    return null;
  } else if ( msg.author == config.my_name) {
    return null
  } else {
    return reply_to(msg);
  };
};

// Internal methods

var reply = require('./bot/reply.js');
var command = require('./bot/command.js');

var listening_to = function(channel) {
  return config.active_channels.includes(channel) ? true : false;
};

var for_me = function(keyword) {
  if (config.alert_words) {
    return is_alert_word(keyword);
  } else {
    return true;
  };
};

var is_alert_word = function (word) { return config.alert_words.includes(word); };

var reply_to = function(msg) {
  var answer = take_request(msg) 
  return answer ? answer : reply.confused();
};

var take_request = function(msg) {
  if (msg) { 
    var cmd = msg.words.shift();
    log('invoking: ' + cmd);
    return command.all_commands.includes(cmd) ? eval(`command.${cmd}(msg)`) : null;
  } else {
    return null;
  };
};

module.exports.hear = hear;
