const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const update = async (_, args, ctx) => {
    try {
        const data = {
            "email": args.data.email,
            "firstName": args.data.firstName,
            "lastName": args.data.lastName,
            "display_name": args.data.display_name ? args.data.display_name : "",
            "date_of_birth": args.data.date_of_birth,
            "address": args.data.address,
            "mobile_number": args.data.mobile_number,
            "gender": args.data.gender,
            "blood_group": args.data.blood_group,
            "middle_name": args.data.middle_name,
            "marital_status": args.data.marital_status,
            "work_email": args.data.work_email ? args.data.work_email : "",
            "work_phone": args.data.work_phone ? args.data.work_phone : "",
            "residence_phone": args.data.residence_phone ? args.data.residence_phone : "",
            "current_address": args.data.current_address ? args.data.current_address : "",
        };
        const { models, req } = ctx;
        const {
            User: UserModel,
        } = models;
        // const { user } = req;

        const userInstance = await UserModel.findByPk(args.data.user_id);

        if (!userInstance) {
            throw new ApolloError(getMessage('USER_NOT_FOUND'));
        }

        let updatedUser = await UserModel.update(data, { where: { user_id: args.data.user_id }, returning: true });

        [, [updatedUser]] = updatedUser;

        updatedUser.message = getMessage('USER_UPDATE_SUCCESS');

        return updatedUser;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING USER>>>', error);
        return error;
    }

  //   let updatedUser = await UserModel.update(data, { where: { id: args.data.id }, returning: true });

  //   [, [updatedUser]] = updatedUser;

  //   updatedUser.message = getMessage('USER_UPDATE_SUCCESS');

  //   return updatedUser;
  // } catch (error) {
  //   logger.error('ERROR WHILE UPDATING USER>>>', error);
  //   return error;
  // }
};

module.exports = update;
