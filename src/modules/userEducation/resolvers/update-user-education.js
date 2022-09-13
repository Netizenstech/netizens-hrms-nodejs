const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const update = async (_, args, ctx) => {
    try {
        const data = {
            "education_center_name": args.data.education_center_name,
            "course": args.data.course,
            "degree": args.data.degree,
            "joining_date": args.data.joining_date,
            "leaving_date": args.data.leaving_date ? args.data.leaving_date : null
        };
        const { models, req } = ctx;
        const {
            UserEducation: UserEducationModel,
        } = models;
        // const { user } = req;

        const UserEducationInstance = await UserEducationModel.findOne({ where: { user_education_id: args.data.user_education_id } });

        if (!UserEducationInstance) {
            throw new ApolloError(getMessage('USER_EDUCATION_NOT_FOUND'));
        }

        let updatedUserEducationDetail = await UserEducationModel.update(data, { where: { user_education_id: args.data.user_education_id }, returning: true });

        [, [updatedUserEducationDetail]] = updatedUserEducationDetail;

        updatedUserEducationDetail.message = getMessage('USER_EDUCATION_UPDATE_SUCCESS');

        return updatedUserEducationDetail;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING USER_EDUCATION>>>', error);
        return error;
    }
};

module.exports = update;
