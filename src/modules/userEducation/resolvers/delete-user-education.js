const { ApolloError } = require('apollo-server-express');
const moment = require("moment");

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteUserEducationModel = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            UserEducation: UserEducationModel,
        } = models;
        // const { user } = req;
        const UserEducationInstance = await UserEducationModel.findByPk(args.data.user_education_id);
        if (!UserEducationInstance) {
            throw new ApolloError(getMessage('USER_EDUCATION_NOT_FOUND'));
        }
        await UserEducationInstance.destroy();
        return { message: getMessage('USER_EDUCATION_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete USER_EDUCATION>>>', error);
        return error;
    }
};

module.exports = deleteUserEducationModel;
