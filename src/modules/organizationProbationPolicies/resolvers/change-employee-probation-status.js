const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const updateEmployeeProbationStatus = async (_, args, ctx) => {
    try {
        
        const { models, req } = ctx;
        const {
            Employee: EmployeeModel,
        } = models;

        const EmployeeInstance = await EmployeeModel.findOne({ where: { employee_id: args.data.employee_id } });

        if (!EmployeeInstance) {
            throw new ApolloError(getMessage('EMPLOYEE_NOT_FOUND'));
        }
        const data = {
            probation_end_date: args.data.probation_end_date || EmployeeInstance.probation_end_date,
            probation_status: args.data.probation_status || EmployeeInstance.probation_status,
            performance_feedback: args.data.performance_feedback || EmployeeInstance.performance_feedback,
        };

        let updatedEmployee = await EmployeeModel.update(data, { where: { employee_id: args.data.employee_id }, returning: true });

        [, [updatedEmployee]] = updatedEmployee;

        updatedEmployee.message = getMessage('UPDATE_PROBATION_STATUS_SUCCESS');

        return updatedEmployee;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING EMPLOYEE_PROBATION_STATUS>>>', error);
        return error;
    }
};

module.exports = updateEmployeeProbationStatus;
