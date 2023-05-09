require('dotenv').config();

module.exports = {
  ONAGE_SMS_API_KEY: process.env.ONAGE_SMS_API_KEY,
  VONAGE_SMS_API_SECRET: process.env.VONAGE_SMS_API_SECRET,
  VONAGE_SMS_API_OUR_NUMBER: process.env.VONAGE_SMS_API_OUR_NUMBER,
};
