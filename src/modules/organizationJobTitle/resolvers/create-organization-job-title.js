const { ApolloError } = require('apollo-server-core');
const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createOrganizationJobTitle = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      OrganizationJobTitle: OrganizationJobTitleModel,
    } = ctx.models;

    const createDataObj = {
      "organization_id": args.data.organization_id,
      "job_title": args.data.job_title,
      "description": args.data.description || ""
    }

    const OrganizationJobTitleCount = await OrganizationJobTitleModel.count({ where: { job_title: args.data.job_title, organization_id: args.data.organization_id } });

    if (OrganizationJobTitleCount) {
      throw new ApolloError(getMessage('ORGANIZATION_JOB_TITLE_EXISTS'), "409");
    }

    const OrganizationJobTitleInstance = await OrganizationJobTitleModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_JOB_TITLE_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM ORGANIZATION_JOB_TITLE>>>', error);
    throw new ApolloError(error.message, '500');
  }
};

module.exports = createOrganizationJobTitle;
