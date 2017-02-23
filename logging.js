function log(msg) {
  console.log(Date.now() + ' - ' + msg);
};

function debug(msg) {
  if (config.debug) {log('DEBUG - ' + msg)};
};
