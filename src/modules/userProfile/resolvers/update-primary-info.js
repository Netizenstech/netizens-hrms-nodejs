const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const updatePrimaryDetail = async (_, args, ctx) => {
    try {
        const data = {
            "firstName": args.data.firstName,
            "lastName": args.data.lastName,
            "middle_name": args.data.middle_name,
            "display_name": args.data.display_name,
            "gender": args.data.gender,
            "blood_group": args.data.blood_group,
            "marital_status": args.data.marital_status,
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

        updatedUser.message = getMessage('USER_PRIMARY_INFO_UPDATE_SUCCESS');

        return updatedUser;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING USER>>>', error);
        return error;
    }
};

module.exports = updatePrimaryDetail;
