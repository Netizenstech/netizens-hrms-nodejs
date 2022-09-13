const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const update = async (_, args, ctx) => {
    try {
        const data = {
            "organization_name": args.data.organization_name,
            "designation": args.data.designation,
            "joining_date": args.data.joining_date,
            "leaving_date": args.data.leaving_date,
            "location": args.data.location ? args.data.location : ""
        };
        const { models, req } = ctx;
        const {
            UserExperience: UserExperienceModel,
        } = models;
        
        const UserExperienceInstance = await UserExperienceModel.findOne({ where: { user_experience_id: args.data.user_experience_id } });

        if (!UserExperienceInstance) {
            throw new ApolloError(getMessage('USER_EXPERIENCE__NOT_FOUND'));
        }

        let updatedUserExperienceDetail = await UserExperienceModel.update(data, { where: { user_experience_id: args.data.user_experience_id }, returning: true });

        [, [updatedUserExperienceDetail]] = updatedUserExperienceDetail;

        updatedUserExperienceDetail.message = getMessage('USER_EXPERIENCE_UPDATE_SUCCESS');

        return updatedUserExperienceDetail;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING USER_EXPERIENCE>>>', error);
        return error;
    }
};

module.exports = update;
