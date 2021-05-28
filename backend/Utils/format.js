const moment = require("moment");

function formatMessage(username, msg) {
  return {
    username,
    message: msg,
    date: moment().format("h:mm a"),
  };
}

module.exports = formatMessage;
