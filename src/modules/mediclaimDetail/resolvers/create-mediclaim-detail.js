const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createMediclaimDetail = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      MediclaimDetail: MediclaimDetailModel,
    } = ctx.models;

    const createDataObj = {
      "employee_id": args.data.employee_id,
      "organization_id": args.data.organization_id,
      "policy_no": args.data.policy_no,
      "mediclaim_amount": args.data.mediclaim_amount,
      "date_of_commencement": args.data.date_of_commencement,
      "mobile_no": args.data.mobile_no,
      "last_premium_due_date": args.data.last_premium_due_date,
      "mediclaim_amount": args.data.mediclaim_amount,
    }

    const MediclaimDetailModelCount = await MediclaimDetailModel.count({ where: { employee_id: args.data.employee_id, organization_id: args.data.organization_id } });

    if (MediclaimDetailModelCount) {
      throw new Error(getMessage('MEDICLAIM_DETAIL_EXISTS'));
    }

    const MediclaimDetailInstance = await MediclaimDetailModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('MEDICLAIM_DETAIL_CREATE_SUCCESS'),
    };

    return response;

  } catch (error) {
    logger.error('ERROR FROM create Mediclaim detail>>>', error);
    return error;
  }
};

module.exports = createMediclaimDetail;
