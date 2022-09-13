const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const update = async (_, args, ctx) => {
    try {
        const data = {
            title: args.data.title,
            description: args.data.description,
        };
        const { models, req } = ctx;
        const {
            Project: ProjectModel,
        } = models;
        // const { user } = req;

        const ProjectInstance = await ProjectModel.findOne({ where: { project_id: args.data.project_id } });

        if (!ProjectInstance) {
            throw new ApolloError(getMessage('PROJECT_NOT_FOUND'));
        }

        let updatedProject = await ProjectModel.update(data, { where: { project_id: args.data.project_id }, returning: true });

    [, [updatedProject]] = updatedProject;

    updatedProject.message = getMessage('USER_UPDATE_SUCCESS');

    return updatedProject;
  } catch (error) {
    logger.error('ERROR WHILE UPDATING PROJECT>>>', error);
    return error;
  }
};

module.exports = update;
