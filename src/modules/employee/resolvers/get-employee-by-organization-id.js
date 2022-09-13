/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const organization = async (_, args, { models }) => {
    try {
        const { filter } = args;
        const {
            // eslint-disable-next-line no-unused-vars
            Employee: EmployeeModel,
        } = models;

        var search = args.data.search ? "%" + args.data.search + "%" : "";
        var searchCondition = args.data.search ? Sequelize.Op.iLike : Sequelize.Op.ne;
        var data = await EmployeeModel.findAll({
            where: Sequelize.and({ organization_id: args.data.organization_id }, { deleted_at: null }),
            include: [{
                require: true,
                model: models.User,
                where: Sequelize.and(Sequelize.or({ firstName: { [searchCondition]: search } }, { display_name: { [searchCondition]: search } }, { lastName: { [searchCondition]: search } }), { deleted_at: null }),
            }]
        });
        data = JSON.parse(JSON.stringify(data))
        return data;
    } catch (error) {
        logger.error(error);
        return error;
    }
};

module.exports = organization;
