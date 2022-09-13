const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createMediclaimDetail = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      UserExperience: UserExperienceModel,
    } = ctx.models;

    const createDataObj = {
      "user_id": args.data.user_id,
      "organization_name": args.data.organization_name,
      "designation": args.data.designation,
      "joining_date": args.data.joining_date,
      "leaving_date": args.data.leaving_date,
      "location": args.data.location ? args.data.location : ""
    }

    const UserExperienceModelCount = await UserExperienceModel.count({ where: { user_id: args.data.user_id, organization_name: args.data.organization_name } });

    if (UserExperienceModelCount) {
      throw new Error(getMessage('USER_EXPERIENCE_DETAIL_EXISTS'));
    }

    const UserExperienceInstance = await UserExperienceModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('USER_EXPERIENCE_DETAIL_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM create USER_EXPERIENCE>>>', error);
    return error;
  }
};

module.exports = createMediclaimDetail;
