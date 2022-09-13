/* eslint-disable camelcase */
const { Sequelize, where } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');
const { getMessage } = require('../../../utils/messages');

const updateMultipleEducation = async (_, args, { models }) => {
    try {
        const { filter } = args;
        const {
            UserEducation: UserEducationModel,
        } = models;
        var existEducationIds = [], newEducation = [],updatedExperience = [];
        args.data.educations.forEach(element => {
            if (!element.user_experience_id) {
                newEducation.push({
                    "user_id": args.data.user_id,
                    "education_center_name": element.education_center_name,
                    "course": element.course,
                    "degree": element.degree,
                    "joining_date": element.joining_date,
                    "leaving_date": element.leaving_date || null
                })
            } else {
                existEducationIds.push(element.user_education_id);
                updatedExperience.push(element);
            }
        });
        await UserEducationModel.destroy({ where: { user_education_id: { [sequelize.Sequelize.Op.notIn]: existEducationIds } } });

        if(updatedExperience.length){
            var i = 0;
            while(i < updatedExperience.length){
                UserEducationModel.update({
                    "education_center_name": updatedExperience[0].education_center_name,
                    "course": updatedExperience[0].course,
                    "degree": updatedExperience[0].degree,
                    "joining_date": updatedExperience[0].joining_date,
                    "leaving_date": updatedExperience[0].leaving_date || null
                },{where:{
                    user_education_id: updatedExperience[0].user_education_id
                }})
                i++;
            }
        }

        await UserEducationModel.bulkCreate(newEducation)

        return {
            status: 'SUCCESS',
            message: getMessage('USER_EDUCATION_UPDATE_SUCCESS'),
        };;
    } catch (error) {
        logger.error(error);
        return error;
    }
};

module.exports = updateMultipleEducation;
