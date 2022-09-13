const { nanoid } = require('nanoid');
const logger = require('../../../logger');

const createUser = async (_, args, ctx) => {
  try {
    const { user } = args;
    const {
      User: UserModel,
      Employee: EmployeeModel,
      MediclaimDetail: MediclaimDetailModel,
      Organization: OrganizationModel,
      UserExperience: UserExperienceModel,
      UserEducation: UserEducationModel,
      UserLoanDetail: UserLoanDetailModel,
    } = ctx.models;


    // Get user info
    var userInstance = await UserModel.findOne({
      where: { user_id: args.data.user_id },
      include: [{
        model: UserLoanDetailModel,
        order: [['user_loan_id', 'DESC']]
      }, {
        model: UserEducationModel
      }, {
        model: UserExperienceModel
      }, {
        model: EmployeeModel,
        include: [{
          model: MediclaimDetailModel
        }]
      }]
    });
    userInstance = JSON.parse(JSON.stringify(userInstance));
    var experience = [], education = [], loan = {};
    if (userInstance.UserExperiences.length) {
      userInstance.UserExperiences.forEach(ele => {
        experience.push({
          user_experience_id: ele.user_experience_id,
          organization_name: ele.organization_name,
          location: ele.location,
          designation: ele.designation,
          joining_date: ele.joining_date,
          leaving_date: ele.leaving_date
        })
      })
    }

    if (userInstance.UserEducations.length) {
      userInstance.UserEducations.forEach(ele => {
        education.push({
          education_center_name: ele.education_center_name,
          course: ele.course,
          degree: ele.degree,
          joining_date: ele.joining_date,
          leaving_date: ele.leaving_date,
          user_education_id: ele.user_education_id
        });
      })
    }

    if (userInstance.UserLoanDetails.length) {
      // userInstance.UserEducations.forEach(ele => {
      loan = {
        loan_amount: userInstance.UserLoanDetails[0].loan_amount,
        loan_type: userInstance.UserLoanDetails[0].loan_type,
        monthly_repayment_amount: userInstance.UserLoanDetails[0].monthly_repayment_amount,
        rate_of_interest: userInstance.UserLoanDetails[0].rate_of_interest,
        repayment_period: userInstance.UserLoanDetails[0].repayment_period,
        repayment_start_date: userInstance.UserLoanDetails[0].repayment_start_date
      };
      // })
    }

    const response = {
      user_id: userInstance.user_id,
      profile_url: userInstance.profile_url,
      primaryDetail: {
        firstName: userInstance.firstName,
        middle_name: userInstance.middle_name,
        lastName: userInstance.lastName,
        display_name: userInstance.display_name,
        date_of_birth: userInstance.date_of_birth,
        gender: userInstance.gender,
        marital_status: userInstance.marital_status,
        blood_group: userInstance.blood_group,
      },
      contactDetail: {
        work_email: userInstance.work_email,
        email: userInstance.email,
        mobile_number: userInstance.mobile_number,
        work_phone: userInstance.work_phone,
        residence_phone: userInstance.residence_phone,
        address: userInstance.address,
        current_address: userInstance.current_address,
      },
      jobDetail: {
        designation: userInstance.Employees ? userInstance.Employees[0].designation : "",
        probation_detail: userInstance.Employees ? userInstance.Employees[0].probation_detail : 0,
        notice_period: userInstance.Employees ? userInstance.Employees[0].notice_period : 0,
        pay_grade: userInstance.Employees ? userInstance.Employees[0].pay_grade : 0,
        shift_start_time: userInstance.Employees ? userInstance.Employees[0].shift_start_time : "",
        shift_end_time: userInstance.Employees ? userInstance.Employees[0].shift_end_time : "",
      },
      experience: experience,
      education: education,
      loan: loan
    };

    return response;
  } catch (error) {
    logger.error('ERROR FROM create-user>>>', error);
    return error;
  }
};

module.exports = createUser;
