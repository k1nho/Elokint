const moment = require("moment");

function formatMessage(username, msg, elokintAuto) {
  let userMessage = msg;
  if (elokintAuto !== "") {
    userMessage = msg + " " + elokintAuto;
  }
  return {
    username: username,
    message: userMessage,
    date: moment().format("h:mm a"),
  };
}

module.exports = formatMessage;
