const { nanoid } = require('nanoid');
const randomsting = require('randomstring');
const moment = require('moment');
const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');
const { generatePassword } = require('../../../utils/context');
const { getMessage } = require('../../../utils/messages');

const createUser = async (_, args, ctx) => {
  try {
    const { user } = args;
    const {
      User: UserModel,
      Employee: EmployeeModel,
      MediclaimDetail: MediclaimDetailModel,
      Leaves: LeavesModel,
    } = ctx.models;


    // Get user info
    var userInstance = await UserModel.findByPk(args.data.user_id);
    userInstance = JSON.parse(JSON.stringify(userInstance));

    var EmployeeInstances = await EmployeeModel.findAll({
      where: { user_id: args.data.user_id },
      order: [["employee_no", "DESC"]],
    })
    if (!userInstance) {
      throw new ApolloError(getMessage('USER_NOT_FOUND'));
    }
    var employeeInfo = {}, mediclaimDetail = {}, leaveDetail = {};

    if (EmployeeInstances.length) {
      EmployeeInstances = JSON.parse(JSON.stringify(EmployeeInstances));
      const mediclaimDetailInstance = await MediclaimDetailModel.findOne({ where: { employee_id: EmployeeInstances[0].employee_id, organization_id: EmployeeInstances[0].organization_id } });
      mediclaimDetail.policy_no = mediclaimDetailInstance ? mediclaimDetailInstance.policy_no : ""
      mediclaimDetail.mediclaim_amount = mediclaimDetailInstance ? mediclaimDetailInstance.mediclaim_amount : 0
      mediclaimDetail.date_of_commencement = mediclaimDetailInstance ? mediclaimDetailInstance.date_of_commencement : ""
      mediclaimDetail.mobile_no = mediclaimDetailInstance ? mediclaimDetailInstance.mobile_no : ""
      mediclaimDetail.last_premium_due_date = mediclaimDetailInstance ? mediclaimDetailInstance.last_premium_due_date : ""


      const LeaveDetailInstance = await LeavesModel.findOne({ where: { employee_id: EmployeeInstances[0].employee_id, organization_id: EmployeeInstances[0].organization_id } });
      leaveDetail.available_leaves = LeaveDetailInstance ? LeaveDetailInstance.available_leaves : 0
      leaveDetail.sick_leaves = LeaveDetailInstance ? LeaveDetailInstance.sick_leaves : 0
      leaveDetail.casual_leaves = LeaveDetailInstance ? LeaveDetailInstance.casual_leaves : 0
      leaveDetail.total_leaves_taken = LeaveDetailInstance ? LeaveDetailInstance.total_leaves_taken : 0

      var start_date = moment(new Date(EmployeeInstances[EmployeeInstances.length - 1].joining_date)).format("YYYY-MM-DD");
      var end_date = EmployeeInstances[0].leaving_date ? moment(EmployeeInstances[0].leaving_date).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD");
      var total_experience = moment(new Date(end_date)).diff(moment(new Date(start_date)), 'years');
      employeeInfo.employee_no = EmployeeInstances[0].employee_no
      employeeInfo.department = EmployeeInstances[0].department
      employeeInfo.designation = EmployeeInstances[0].designation
      employeeInfo.total_experience = total_experience
      employeeInfo.joining_date = EmployeeInstances[0].joining_date
      employeeInfo.reporting_manager = EmployeeInstances[0].reporting_manager

      userInstance.employeeInfo = employeeInfo;
      userInstance.mediclaimDetail = mediclaimDetail;
      userInstance.leaveDetail = leaveDetail;
    }



    const response = userInstance;

    return response;
  } catch (error) {
    logger.error('ERROR FROM create-user>>>', error);
    return error;
  }
};

module.exports = createUser;
