const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createDocument = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      UserDocument: UserDocumentModel,
    } = ctx.models;
    
    const createDataObj = {
      "user_id": args.data.user_id,
      "document_name": args.data.document_name,
      "document_url": args.data.document_url,
      "size": args.data.size
    }
    const UserDocumentInstance = await UserDocumentModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('USER_DOCUMENT_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM create user document >>>', error);
    return error;
  }
};

module.exports = createDocument;
