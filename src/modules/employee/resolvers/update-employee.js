const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const update = async (_, args, ctx) => {
    try {
        const data = {
            "user_id": args.data.user_id,
            "role_id": args.data.role_id,
            "organization_id": args.data.organization_id,
            "designation": args.data.designation,
            "salary": args.data.salary,
            "joining_date": args.data.joining_date,
            "leaving_date": null,
            "employee_no": 0,
            "department": args.data.department,
            "reporting_manager": args.data.reporting_manager,
            "probation_detail": args.data.probation_detail || 0,
            "notice_period": args.data.notice_period || 0,
            "pay_grade": args.data.pay_grade || 0,
            "shift_start_time": args.data.shift_start_time || "",
            "shift_end_time": args.data.shift_end_time || ""
        };
        const { models, req } = ctx;
        const {
            Employee: EmployeeModel,
        } = models;
        // const { user } = req;

        const EmployeeInstance = await EmployeeModel.findOne({ where: { employee_id: args.data.employee_id } });

        if (!EmployeeInstance) {
            throw new ApolloError(getMessage('EMPLOYEE_NOT_FOUND'));
        }

        let updatedEmployee = await EmployeeModel.update(data, { where: { employee_id: args.data.employee_id }, returning: true });

        [, [updatedEmployee]] = updatedEmployee;

        updatedEmployee.message = getMessage('EMPLOYEE_UPDATE_SUCCESS');

        return updatedEmployee;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING EMPLOYEE>>>', error);
        return error;
    }
};

module.exports = update;
