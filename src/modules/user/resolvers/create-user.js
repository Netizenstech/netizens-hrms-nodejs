const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const logger = require('../../../logger');
const { generatePassword } = require('../../../utils/context');
const { getMessage } = require('../../../utils/messages');

const createUser = async (_, args, ctx) => {
  try {
    const { user } = args;
    const {
      User: UserModel
    } = ctx.models;

    const resetToken = nanoid();
    const createDataObj = {
      ...user,
      display_name:args.user.display_name ? args.user.display_name : "" ,
      middle_name:args.user.middle_name,
      marital_status:args.user.marital_status,
      work_email: args.user.work_email ? args.user.work_email : "",
      work_phone: args.user.work_phone ? args.user.work_phone : "",
      residence_phone: args.user.residence_phone ? args.user.residence_phone : "",
      current_address: args.user.current_address ? args.user.current_address : "",
      profile_url: args.user.profile_url || "",
      resetToken,
      emailVerified: false,
      verificationToken: randomsting.generate(64),
      role: 'USER'
    };

    createDataObj.password = await generatePassword(user.password);
    const userCount = await UserModel.count({ where: { email: createDataObj.email } });

    if (userCount) {
      throw new Error(getMessage('USER_EMAIL_EXISTS'));
    }

    await UserModel.create(createDataObj, { returning: true });
    // const userInstance = await UserModel.create(createDataObj, { returning: true });

    // SEND MAIL
    // await sendMail({
    //   toEmailAddresses: [userInstance.email],
    //   templateKey: 'USER_VERIFICATION', // USER_VERIFICATION
    //   data: {
    //     firstName: userInstance.firstName,
    //     url: `${CONFIG.appUrl}/auth/new?uid=${userInstance.id}&token=${userInstance.verificationToken}`,
    //   },
    // });

    const response = {
      status: 'SUCCESS',
      message: getMessage('USER_CREATE_SUCCESS')
    };

    return response;
  } catch (error) {
    logger.error('ERROR FROM create-user>>>', error);
    return error;
  }
};

module.exports = createUser;
