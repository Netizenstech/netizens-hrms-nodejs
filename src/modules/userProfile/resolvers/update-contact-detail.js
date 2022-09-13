const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const updateContactDetail = async (_, args, ctx) => {
    try {
        const data = {
            work_email: args.data.work_email,
            email: args.data.email,
            mobile_number: args.data.mobile_number,
            work_phone: args.data.work_phone,
            residence_phone: args.data.residence_phone,
            address: args.data.address,
            current_address: args.data.current_address
        };
        const { models, req } = ctx;
        const {
            User: UserModel,
        } = models;
        // const { user } = req;

        const userInstance = await UserModel.findByPk(args.data.user_id);

        if (!userInstance) {
            throw new ApolloError(getMessage('USER_NOT_FOUND'));
        }

        let updatedUser = await UserModel.update(data, { where: { user_id: args.data.user_id }, returning: true });

        [, [updatedUser]] = updatedUser;

        updatedUser.message = getMessage('USER_CONTACT_INFO_UPDATE_SUCCESS');

        return updatedUser;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING USER>>>', error);
        return error;
    }
};

module.exports = updateContactDetail;
