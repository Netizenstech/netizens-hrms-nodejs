/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const Documents = async (_, args, { models }) => {
  try {
    const { filter } = args;
    const {
      // eslint-disable-next-line no-unused-vars
      UserDocument: UserDocumentModel,
    } = models;
    var search = filter.search ? "%" + filter.search + "%" : "";
    var searchCondition = filter.search ? Sequelize.Op.iLike : Sequelize.Op.ne;
    var pageSize = filter.limit ? filter.limit : 10;
    var pageNo = (((filter.skip - 1) < 0) ? 0 : (filter.skip - 1)) * pageSize;

    var data = await UserDocumentModel.findAndCountAll({
      where: Sequelize.and(Sequelize.or({ document_name: { [searchCondition]: search } }), { user_id: args.filter.user_id }, { deleted_at: null }),
      limit: pageSize,
      offset: pageNo,
      order:[['updatedAt','desc']]
    });
    data = JSON.parse(JSON.stringify(data));
    return {
      data: data,
      Documents: data.rows,
      count: data.count,
    };
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = Documents;
