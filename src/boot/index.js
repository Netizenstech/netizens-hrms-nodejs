const createDummyUsers = require('./create-dummy-users');

const bootFiles = async models => {
  await createDummyUsers(models);
};

module.exports = bootFiles;
