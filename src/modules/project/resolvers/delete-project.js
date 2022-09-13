const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteProject = async (_, args, ctx) => {
    try {
        const data = {
            deleted_at: moment(new Date()).format('YYYY-MM-DD h:mm:ss Z')
        };
        const { models, req } = ctx;
        const {
            Project: ProjectModel,
        } = models;
        
        const ProjectInstance = await ProjectModel.findByPk(args.data.project_id);
        if (!ProjectInstance) {
            throw new ApolloError(getMessage('PROJECT_NOT_FOUND'));
        }
        await ProjectInstance.destroy();
        return { message: getMessage('PROJECT_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete PROJECT>>>', error);
        return error;
    }
};

module.exports = deleteProject;
