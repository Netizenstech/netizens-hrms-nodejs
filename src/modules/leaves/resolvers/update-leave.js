const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const update = async (_, args, ctx) => {
    try {
        const data = {
            "available_leaves": args.data.available_leaves,
            "sick_leaves": args.data.sick_leaves,
            "casual_leaves": args.data.casual_leaves,
            "total_leaves_taken": args.data.total_leaves_taken
        };
        const { models, req } = ctx;
        const {
            Leaves: LeavesModel,
        } = models;
        // const { user } = req;

        const LeavesInstance = await LeavesModel.findOne({ where: { leave_id: args.data.leave_id } });

        if (!LeavesInstance) {
            throw new ApolloError(getMessage('LEAVE_NOT_FOUND'));
        }

        let updatedLeave = await LeavesModel.update(data, { where: { leave_id: args.data.leave_id }, returning: true });

        [, [updatedLeave]] = updatedLeave;

        updatedLeave.message = getMessage('LEAVE_UPDATE_SUCCESS');

        return updatedLeave;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING LEAVE>>>', error);
        return error;
    }
};

module.exports = update;
