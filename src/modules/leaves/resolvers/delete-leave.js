const { ApolloError } = require('apollo-server-express');
const moment = require("moment");

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteEmployeeModel = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            Leaves: LeavesModel,
        } = models;
        // const { user } = req;
        const LeavesModelInstance = await LeavesModel.findByPk(args.data.employee_id);
        if (!LeavesModelInstance) {
            throw new ApolloError(getMessage('LEAVE_NOT_FOUND'));
        }
        await LeavesModelInstance.destroy();
        return { message: getMessage('LEAVE_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete LEAVE>>>', error);
        return error;
    }
};

module.exports = deleteEmployeeModel;
