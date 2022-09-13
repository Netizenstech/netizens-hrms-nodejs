const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const {Sequelize} = require('../../../models');
const updateOrganizationBusinessUnit = async (_, args, ctx) => {
    try {
        const data = {
            business_unit_name: args.data.business_unit_name,
            business_unit_email: args.data.business_unit_email || "",
            description: args.data.description || ""
        };
        const { models, req } = ctx;
        const {
            OrganizationBusinessUnit: OrganizationBusinessUnitModel,
        } = models;

        const OrganizationBusinessUnitInstance = await OrganizationBusinessUnitModel.findOne({ where: { organization_business_unit_id: args.data.organization_business_unit_id } });

        if (!OrganizationBusinessUnitInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_BUSINESS_UNIT_NOT_FOUND'));
        }
        const OrganizationBusinessUnitInstance2 = await OrganizationBusinessUnitModel.findOne({ where: { organization_id: OrganizationBusinessUnitInstance.organization_id, business_unit_name: args.data.business_unit_name } });
        if (OrganizationBusinessUnitInstance2) {
            throw new ApolloError(getMessage('ORGANIZATION_BUSINESS_UNIT_EXISTS'));
        }
        let updatedOrganizationBusinessUnit = await OrganizationBusinessUnitModel.update(data, { where: { organization_business_unit_id: args.data.organization_business_unit_id }, returning: true });

        [, [updatedOrganizationBusinessUnit]] = updatedOrganizationBusinessUnit;

        updatedOrganizationBusinessUnit.message = getMessage('ORGANIZATION_BUSINESS_UNIT_UPDATE_SUCCESS');

        return updatedOrganizationBusinessUnit;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_BUSINESS_UNIT>>>', error);
        return error;
    }
};

module.exports = updateOrganizationBusinessUnit;
