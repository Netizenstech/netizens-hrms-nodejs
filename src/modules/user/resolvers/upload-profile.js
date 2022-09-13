const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const update = async (_, args, ctx) => {
    try {
        const data  = {
            profile_url: args.data.profile_url
        };
        const { models, req } = ctx;
        const {
            User: UserModel
        } = models;
        const { user } = req;

        const userInstance = await UserModel.findOne({ where: { user_id: user.user_id } });

        if (!userInstance) {
            throw new ApolloError(getMessage('USER_NOT_FOUND'));
        }

        let updatedUser = await UserModel.update(data, { where: { user_id: user.user_id }, returning: true });

        [, [updatedUser]] = updatedUser;

        updatedUser.message = getMessage('USER_PROFILE_UPDATE_SUCCESS');

        return updatedUser;
    } catch (error) {
        logger.error('ERROR WHILE USER_PROFILE_UPDATE>>>', error);
        return error;
    }
};

module.exports = update;
