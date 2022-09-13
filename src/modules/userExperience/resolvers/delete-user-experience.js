const { ApolloError } = require('apollo-server-express');
const moment = require("moment");

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteMediclaimDetailModel = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            UserExperience: UserExperienceModel,
        } = models;
        // const { user } = req;
        const UserExperienceInstance = await UserExperienceModel.findByPk(args.data.user_experience_id);
        if (!UserExperienceInstance) {
            throw new ApolloError(getMessage('USER_EXPERIENCE_NOT_FOUND'));
        }
        await UserExperienceInstance.destroy();
        return { message: getMessage('USER_EXPERIENCE_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete USER_EXPERIENCE>>>', error);
        return error;
    }
};

module.exports = deleteMediclaimDetailModel;
