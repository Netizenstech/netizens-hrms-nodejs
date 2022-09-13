const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');
const { generatePassword } = require('../../../utils/context');
const sendMail = require('../../../utils/emails/methods/send-email');
const { getMessage } = require('../../../utils/messages');

const createUser = async (_, args, ctx) => {
  try {
    const { user } = args;
    const {
      User: UserModel,
    } = ctx.models;


    const userInstance = await UserModel.findByPk(args.data.user_id);
    if (!userInstance) {
      throw new ApolloError(getMessage('USER_NOT_FOUND'));
    }
    const response = userInstance;

    return response;
  } catch (error) {
    logger.error('ERROR FROM create-user>>>', error);
    return error;
  }
};

module.exports = createUser;
