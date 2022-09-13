/* eslint-disable camelcase */
const { Sequelize, where } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');
const { getMessage } = require('../../../utils/messages');

const updateMultipleExperience = async (_, args, { models }) => {
    try {
        const { filter } = args;
        const {
            UserExperience: UserExperienceModel,
        } = models;
        var existExperienceIds = [], newExperience = [], updatedRecords = [];
        args.data.experiences.forEach(element => {
            if (!element.user_experience_id) {
                newExperience.push({
                    "user_id": args.data.user_id,
                    "organization_name": element.organization_name,
                    "designation": element.designation,
                    "joining_date": element.joining_date,
                    "leaving_date": element.leaving_date || null,
                    "location": element.location ? element.location : ""
                })
            } else {
                existExperienceIds.push(element.user_experience_id);
                updatedRecords.push(element);
            }
        });
        var UserExperienceInstance = await UserExperienceModel.destroy({ where: { user_experience_id: { [sequelize.Sequelize.Op.notIn]: existExperienceIds } } });
        if (updatedRecords.length) {
            var i = 0;
            while (i < updatedRecords.length) {
                await UserExperienceModel.update({
                    "organization_name": updatedRecords[i].organization_name,
                    "designation": updatedRecords[i].designation,
                    "joining_date": updatedRecords[i].joining_date,
                    "leaving_date": updatedRecords[i].leaving_date || null,
                    "location": updatedRecords[i].location || ""
                }, {
                    where: { user_experience_id: updatedRecords[i].user_experience_id }
                })
                i++;
            }
            // await UserExperienceInstance.destroy();
        }

        await UserExperienceModel.bulkCreate(newExperience);

        return {
            status: 'SUCCESS',
            message: getMessage('USER_EXPERIENCE_UPDATE_SUCCESS'),
        };
    } catch (error) {
        logger.error(error);
        return error;
    }
};

module.exports = updateMultipleExperience;
