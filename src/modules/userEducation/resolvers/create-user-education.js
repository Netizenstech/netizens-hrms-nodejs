const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createEducationDetail = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      UserEducation: UserEducationModel,
    } = ctx.models;

    const createDataObj = {
      "user_id": args.data.user_id,
      "education_center_name": args.data.education_center_name,
      "course": args.data.course,
      "degree": args.data.degree,
      "joining_date":args.data.joining_date,
      "leaving_date":args.data.leaving_date ? args.data.leaving_date : null
    }

    const UserEducationCount = await UserEducationModel.count({ where: { user_id: args.data.user_id, education_center_name: args.data.education_center_name } });

    if (UserEducationCount) {
      throw new Error(getMessage('USER_EDUCATION_DETAIL_EXISTS'));
    }

    const UserEducationInstance = await UserEducationModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('USER_EDUCATION_DETAIL_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM create USER_EDUCATION>>>', error);
    return error;
  }
};

module.exports = createEducationDetail;
