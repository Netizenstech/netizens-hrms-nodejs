/* eslint-disable no-await-in-loop */
const logger = require('../logger');
const { generatePassword } = require('../utils/context');

const userData = require('./data/dummy-users');

const createDummyUsers = async (models) => {
  try {
    const { User: UserModel } = models;
    try {
      const users = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const userObj of userData) {
        const hashedPassword = generatePassword(userObj.password);
        userObj.password = hashedPassword;
        const count = await UserModel.count({
          where: { email: userObj.email },
        });
        if (!count) {
          users.push(userObj);
        }
      }

      if (users.length) {
        await UserModel.bulkCreate(users);
      }
    } catch (error) {
      logger.error('ERROR WHILE CREATING users >>>', error);
      throw error;
    }
  } catch (error) {
    logger.error('ERROR WHILE CREATING users >>>', error);
    throw error;
  }
};

module.exports = createDummyUsers;
