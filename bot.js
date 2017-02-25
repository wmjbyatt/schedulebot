// bot.js

/*
/ Our only exposed method. Decide whether to speak, then speak.
*/
var hear = function(msg) {
  log('parsing: ' + msg.words );
  var keyword = config.alert_words ? msg.words.shift() : null;

  if ( should_reply_to(msg,keyword) ) { return reply_to(msg); };
};

// Internal methods

var reply = require('./bot/reply.js');
var command = require('./bot/command.js');

var should_reply_to = function (msg,keyword) {
  return active_in_channel(msg.channel) && for_me(keyword) && (msg.author != config.my_name);
};

var active_in_channel = function(channel) {
  return config.active_channels.includes(channel) ? true : false;
};

var for_me = function(keyword) {
  return config.alert_words ? is_alert_word(keyword) : true;
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
