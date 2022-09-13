const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const update = async (_, args, ctx) => {
    try {
        const data = {
            "document_name": args.data.document_name
        };
        const { models, req } = ctx;
        const {
            UserDocument: UserDocumentModel,
        } = models;
        // const { user } = req;

        const UserDocumentInstance = await UserDocumentModel.findOne({ where: { user_document_id: args.data.user_document_id } });

        if (!UserDocumentInstance) {
            throw new ApolloError(getMessage('USER_DOCUMENT_NOT_FOUND'));
        }

        let updatedUserDocument = await UserDocumentModel.update(data, { where: { user_document_id: args.data.user_document_id }, returning: true });

        [, [updatedUserDocument]] = updatedUserDocument;

        updatedUserDocument.message = getMessage('USER_DOCUMENT_UPDATE_SUCCESS');

        return updatedUserDocument;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING EMPLOYEE>>>', error);
        return error;
    }
};

module.exports = update;
