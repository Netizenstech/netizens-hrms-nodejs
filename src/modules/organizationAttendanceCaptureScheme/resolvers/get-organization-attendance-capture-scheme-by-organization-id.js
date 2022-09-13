/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const getOrganizationAttendanceCaptureScheme = async (_, args, { models }) => {
    try {
        const {
            // eslint-disable-next-line no-unused-vars
            OrganizationAttendanceCaptureScheme: OrganizationAttendanceCaptureSchemeModel,
        } = models;

        // Search 
        var search = args.data.search ? "%" + args.data.search + "%" : "";
        var searchCondition = args.data.search ? Sequelize.Op.iLike : Sequelize.Op.ne;
        var data = await OrganizationAttendanceCaptureSchemeModel.findAll({
            where: Sequelize.and({ attendance_capture_scheme: { [searchCondition]: search } },{ organization_id: args.data.organization_id }, { deleted_at: null }),
            include: [{
                require: false,
                model: models.OrganizationAttendanceWFH,
              }]
        });
        return data;
    } catch (error) {
        logger.error(error);
        return error;
    }
};

module.exports = getOrganizationAttendanceCaptureScheme;
