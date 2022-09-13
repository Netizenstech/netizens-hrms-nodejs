const { ApolloError } = require('apollo-server-core');
const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const logger = require('../../../logger');
const { generatePassword } = require('../../../utils/context');
const { getMessage } = require('../../../utils/messages');

const createOrganizationUser = async (_, args, ctx) => {
    try {
        const { user } = args;
        const {
            User: UserModel,
            Organization: OrganizationModel,
        } = ctx.models;

        const resetToken = nanoid();


        const createOrganizationDataObj = {
            "name": args.data.organization_name,
            "type": args.data.organization_type,
            "description": args.data.organization_description
        }


        const userCount = await UserModel.count({ where: { email: args.data.email } });

        if (userCount) {
            throw new ApolloError(getMessage('USER_EMAIL_EXISTS'), "409");
        }

        const OrganizationCount = await OrganizationModel.count({ where: { name: args.data.organization_name } });

        if (OrganizationCount) {
            throw new ApolloError(getMessage('ORGANIZATION_EXISTS'), "409");
        }

        const OrganizationInstance = await OrganizationModel.create(createOrganizationDataObj, { returning: true });

        const createDataObj = {
            firstName: args.data.firstName,
            lastName: args.data.lastName,
            mobile_number: args.data.mobile_number,
            email: args.data.email,
            password: args.data.password,
            date_of_birth: args.data.date_of_birth || null,
            address: args.data.address || "",
            gender: args.data.gender || "",
            blood_group: args.data.blood_group || "",
            display_name: args.data.display_name || "",
            middle_name: args.data.middle_name || "",
            marital_status: args.data.marital_status || "",
            work_email: args.data.work_email || "",
            work_phone: args.data.work_phone ? args.data.work_phone : "",
            residence_phone: args.data.residence_phone || "",
            current_address: args.data.current_address || "",
            profile_url: args.data.profile_url || "",
            resetToken,
            emailVerified: false,
            verificationToken: randomsting.generate(64),
            organization_id: OrganizationInstance.organization_id,
            role: 'User'
        };
        createDataObj.password = await generatePassword(createDataObj.password);

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

module.exports = createOrganizationUser;
