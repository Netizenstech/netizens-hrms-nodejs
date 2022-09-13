const CONFIG = require('../../../../config/config');

const postData = require('./post-data');

const sendEmail = async (data = {}) => {
  try {
    const reqData = {
      fromEmailName: data.fromName || CONFIG.emailServer.fromName,
      fromEmailAddress: data.fromEmail || CONFIG.emailServer.fromEmail,
      toEmailAddresses: data.toEmailAddresses,
      templateKey: data.templateKey,
      data: [data.data]
    };
    const response = await postData(`${CONFIG.emailServer.host}/email/send`, reqData);
    return response;
  } catch (e) {
    return e;
  }
};
// for testing uncomment the below line
// sendEmail();
module.exports = sendEmail;
