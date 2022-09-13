const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const updateEmployeeDepartment = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            Employee: EmployeeModel,
        } = models;

        let updatedEmployee = await EmployeeModel.update({ organization_department_id: args.data.organization_department_id }, { where: { employee_no: { [Sequelize.Sequelize.Op.in]: args.data.employee_numbers }, organization_id: args.data.organization_id }, returning: true });
        var notUpdatedIds = [], updated = [];
        updatedEmployee[1].forEach(element => {
            if (args.data.employee_numbers.includes(element.employee_no)) {
                updated.push(element.employee_no)
            }
        });
        notUpdatedIds = args.data.employee_numbers.filter(function (obj) {
            return updated.indexOf(obj) == -1
        });
        return {
            message: getMessage('EMPLOYEE_UPDATE_SUCCESS'),
            notUpdatedIds: notUpdatedIds
        };
    } catch (error) {
        logger.error('ERROR WHILE UPDATING EMPLOYEE>>>', error);
        // return error;
        throw new ApolloError(error.message, "500");
    }
};

module.exports = updateEmployeeDepartment;
