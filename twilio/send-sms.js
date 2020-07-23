const config = require('config');
const client = require('twilio')(
  config.get('TWILIO_ACCOUNT_SID'),
  config.get('TWILIO_AUTH_TOKEN')
);

/**
 * Send a SMS Message
 * @param {string} body - The sms message body
 */

async function sendMessage(body, phone) {
  try {
    const message = await client.messages.create({
      to: phone,
      from: config.get('PHONE_NUMBER'),
      body,
    });
    return message;
  } catch (error) {
    return message;
  }
}

module.exports = { sendMessage };
