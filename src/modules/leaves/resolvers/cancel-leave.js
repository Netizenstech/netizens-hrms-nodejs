const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const takeLeave = async (_, args, ctx) => {
    try {
        // const { user } = args;
        const {
            Leaves: LeavesModel,
        } = ctx.models;

        const LeavesInstance = await LeavesModel.findOne({ where: { employee_id: args.data.employee_id, organization_id: args.data.organization_id } });

        if (!LeavesInstance) {
            throw new ApolloError(getMessage('LEAVE_NOT_FOUND'));
        }
        var data = {}
        if (args.data.leave_type == "Sick") {
            data = {
                available_leaves: LeavesInstance.available_leaves + args.data.no_of_day,
                sick_leaves: LeavesInstance.sick_leaves + args.data.no_of_day,
                total_leaves_taken: LeavesInstance.total_leaves_taken - args.data.no_of_day
            }
        } else if (args.data.leave_type == "Casual") {
            data = {
                available_leaves: LeavesInstance.available_leaves + args.data.no_of_day,
                casual_leaves: LeavesInstance.casual_leaves + args.data.no_of_day,
                total_leaves_taken: LeavesInstance.total_leaves_taken - args.data.no_of_day
            }
        }
        let updatedLeave = await LeavesModel.update(data, { where: { employee_id: args.data.employee_id, organization_id: args.data.organization_id }, returning: true });

        const response = {
            status: 'SUCCESS',
            message: getMessage('CANCEL_LEAVES'),
        };

        return response;

    } catch (error) {
        logger.error('ERROR FROM create LEAVES>>>', error);
        return error;
    }
};

module.exports = takeLeave;
