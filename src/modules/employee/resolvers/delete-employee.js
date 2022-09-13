const { ApolloError } = require('apollo-server-express');
const moment = require("moment");

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteEmployeeModel = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            Employee: EmployeeModel,
        } = models;
        // const { user } = req;
        const EmployeeInstance = await EmployeeModel.findByPk(args.data.employee_id);
        if (!EmployeeInstance) {
            throw new ApolloError(getMessage('EMPLOYEE_NOT_FOUND'));
        }
        await EmployeeInstance.destroy();
        return { message: getMessage('EMPLOYEE_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete Employee>>>', error);
        return error;
    }
};

module.exports = deleteEmployeeModel;
