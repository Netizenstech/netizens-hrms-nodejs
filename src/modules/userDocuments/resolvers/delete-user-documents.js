const { ApolloError } = require('apollo-server-express');
const moment = require("moment");

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteDocumentModel = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            UserDocument: UserDocumentModel,
        } = models;
        // const { user } = req;
        const UserDocumentInstance = await UserDocumentModel.findByPk(args.data.user_document_id);
        if (!UserDocumentInstance) {
            throw new ApolloError(getMessage('USER_DOCUMENT_NOT_FOUND'));
        }
        await UserDocumentInstance.destroy();
        return { message: getMessage('USER_DOCUMENT_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete user document>>>', error);
        return error;
    }
};

module.exports = deleteDocumentModel;
