const { ApolloError } = require('apollo-server-express');
const moment = require("moment");

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteMediclaimDetailModel = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            MediclaimDetail: MediclaimDetailModel,
        } = models;
        const MediclaimDetailInstance = await MediclaimDetailModel.findByPk(args.data.mediclaim_detail_id);
        if (!MediclaimDetailInstance) {
            throw new ApolloError(getMessage('MEDICLAIM_DETAIL_NOT_FOUND'));
        }
        await MediclaimDetailInstance.destroy();
        return { message: getMessage('MEDICLAIM_DETAIL_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete MEDICLAIM_DETAIL>>>', error);
        return error;
    }
};

module.exports = deleteMediclaimDetailModel;
