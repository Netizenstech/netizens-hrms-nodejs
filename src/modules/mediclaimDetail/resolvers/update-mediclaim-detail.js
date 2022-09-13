const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const update = async (_, args, ctx) => {
    try {
        const data = {
            "policy_no": args.data.policy_no,
            "mediclaim_amount": args.data.mediclaim_amount,
            "date_of_commencement": args.data.date_of_commencement,
            "mobile_no": args.data.mobile_no,
            "last_premium_due_date": args.data.last_premium_due_date,
            "mediclaim_amount": args.data.mediclaim_amount,
        };
        const { models, req } = ctx;
        const {
            MediclaimDetail: MediclaimDetailModel,
        } = models;
        // const { user } = req;

        const MediclaimDetailInstance = await MediclaimDetailModel.findOne({ where: { mediclaim_detail_id: args.data.mediclaim_detail_id } });

        if (!MediclaimDetailInstance) {
            throw new ApolloError(getMessage('MEDICLAIM_DETAIL__NOT_FOUND'));
        }

        let updatedMediclaimDetail = await MediclaimDetailModel.update(data, { where: { mediclaim_detail_id: args.data.mediclaim_detail_id }, returning: true });

        [, [updatedMediclaimDetail]] = updatedMediclaimDetail;

        updatedMediclaimDetail.message = getMessage('MEDICLAIM_DETAIL_UPDATE_SUCCESS');

        return updatedMediclaimDetail;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING MEDICLAIM_DETAIL>>>', error);
        return error;
    }
};

module.exports = update;
