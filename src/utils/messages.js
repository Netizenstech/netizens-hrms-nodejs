const messages = {
  ROLE_NOT_FOUND: "Role not found!",
  ROLE_CREATE_SUCCESS: "Role created successfully!!",
  ROLE_DELETE_SUCCESS: "Role deleted successfully!!",
  ROLE_UPDATE_SUCCESS: "Role updated successfully!!",
  USER_NOT_FOUND: "User not found!",
  INVALID_INPUT: "Invalid input!",
  USER_CREATE_SUCCESS: "User created successfully!!",
  USER_DELETE_SUCCESS: "User deleted successfully!!",
  USER_UPDATE_SUCCESS: "Profile updated successfully!",
  USER_EMAIL_EXISTS: "E-mail address already exists!",
  USER_PRIMARY_INFO_UPDATE_SUCCESS: "User primary detail updated successfully!",
  USER_CONTACT_INFO_UPDATE_SUCCESS: "User contact detail updated successfully!",
  INACTIVE_USER: "User is in-active!",
  EMAIL_NOT_VERIFIED: "Email is not verified!",
  USER_PASSWORD_UPDATED: "Password updated successfully!",
  USER_VERIFY_SUCCESS: "User verified successfully!",
  USER_ACTIVATED_SUCCESS: "User activated successfully!",
  USER_DEACTIVATED_SUCCESS: "User de-activated successfully!",
  INVALID_DATA: "Please provide data!",
  USER_PROFILE_UPDATE_SUCCESS: "User profile uploaded successfully!",
  UNAUTHORIZED: "Expire Token!",

  // USER AUTH
  LOGIN_SUCCESSFULLY: "Logged-in successfully!",
  REFRESH_TOKEN: "Token refreshed successfully!",
  INVALID_TOKEN: "Invalid token!",
  NOT_LOGGEDIN: "Please login!",
  SESSION_EXPIRED: "Your Session has expired. Please login again!",
  INVALID_CREDENTIALS: "Password provided is incorrect!",
  TOKEN_EXPIRED: "Your Token has expired. Please login again!",

  // PROJECT
  PROJECT_EXISTS: "Project already exists!",
  PROJECT_CREATE_SUCCESS: "Project created successfully!!",
  PROJECT_NOT_FOUND: "Project not found!",
  PROJECT_UPDATE_SUCCESS: "Project updated successfully!",
  PROJECT_DELETE_SUCCESS: "Project deleted successfully!!",

  // TASK
  TASK_EXISTS: "Task already exists!",
  TASK_CREATE_SUCCESS: "Task created successfully!!",
  TASK_NOT_FOUND: "Task not found!",
  TASK_UPDATE_SUCCESS: "Task updated successfully!",
  TASK_DELETE_SUCCESS: "Task deleted successfully!!",

  // TEAM
  TEAM_EXISTS: "Team already exists!",
  TEAM_CREATE_SUCCESS: "Team created successfully!!",
  TEAM_NOT_FOUND: "Team not found!",
  TEAM_UPDATE_SUCCESS: "Team updated successfully!",
  TEAM_DELETE_SUCCESS: "Team deleted successfully!!",

  // ROLE
  ROLE_EXISTS: "Role already exists!",
  ROLE_CREATE_SUCCESS: "Role created successfully!!",
  ROLE_NOT_FOUND: "Role not found!",
  ROLE_UPDATE_SUCCESS: "Role updated successfully!",
  ROLE_DELETE_SUCCESS: "Role deleted successfully!!",

  // PERMISSION
  PERMISSION_EXISTS: "Permission already exists!",
  PERMISSION_CREATE_SUCCESS: "Permission created successfully!!",
  PERMISSION_NOT_FOUND: "Permission not found!",
  PERMISSION_UPDATE_SUCCESS: "Permission updated successfully!",
  PERMISSION_DELETE_SUCCESS: "Permission deleted successfully!!",

  // ORG
  ORG_EXISTS: "Organization already exists!",
  ORG_CREATE_SUCCESS: "Organization created successfully!!",
  ORG_NOT_FOUND: "Organization not found!",
  ORG_UPDATE_SUCCESS: "Organization updated successfully!",
  ORG_DELETE_SUCCESS: "Organization deleted successfully!!",
  ORGANIZATION_LOGO_UPLOAD_SUCCESS: "Organization logo upload successfully!!",
  ORGANIZATION_BACKGROUND_IMAGE_UPLOAD_SUCCESS:
    "Organization background image upload successfully!!",

  // LEAVE
  LEAVE_EXISTS: "Leave already exists!",
  LEAVE_CREATE_SUCCESS: "Leave created successfully!!",
  LEAVE_NOT_FOUND: "Leave not found!",
  LEAVE_UPDATE_SUCCESS: "Leave updated successfully!",
  LEAVE_DELETE_SUCCESS: "Leave deleted successfully!!",

  //LEAVE-APPROVAL
  LEAVE_PENDIND: "Pending",
  LEAVE_APPROVAL_SUCCESS: "Approved",
  LEAVE_PARTIAL_APPROVAL: "Patially Approved",
  LEAVE_APPROVAL_REJECTED: "Rejected",

  PROJECT_EXISTS: "Project already exists!",
  PROJECT_CREATE_SUCCESS: "Project created successfully!!",
  PROJECT_NOT_FOUND: "Project not found!",
  PROJECT_UPDATE_SUCCESS: "Project updated successfully!",
  PROJECT_DELETE_SUCCESS: "Project deleted successfully!!",

  ORGANIZATION_EXISTS: "Organization already exists!",
  ORGANIZATION_NOT_FOUND: "Organization not found!",
  ORGANIZATION_CREATE_SUCCESS: "Organization created successfully!!",
  ORGANIZATION_DELETE_SUCCESS: "Organization deleted successfully!!",
  ORGANIZATION_UPDATE_SUCCESS: "Organization updated successfully!!",

  EMPLOYEE_EXISTS: "Employee already exists!",
  EMPLOYEE_NOT_FOUND: "Employee not found!",
  EMPLOYEE_CREATE_SUCCESS: "Employee created successfully!!",
  EMPLOYEE_DELETE_SUCCESS: "Employee deleted successfully!!",
  EMPLOYEE_UPDATE_SUCCESS: "Employee updated successfully!!",

  MEDICLAIM_DETAIL_EXISTS: "Mediclaim detail already exists!",
  MEDICLAIM_DETAIL_NOT_FOUND: "Mediclaim detail not found!",
  MEDICLAIM_DETAIL_CREATE_SUCCESS: "Mediclaim detail created successfully!!",
  MEDICLAIM_DETAIL_DELETE_SUCCESS: "Mediclaim detail deleted successfully!!",
  MEDICLAIM_DETAIL_UPDATE_SUCCESS: "Mediclaim detail updated successfully!!",

  LEAVE_EXISTS: "Leave detail already exists!",
  LEAVE_NOT_AVAILABLE: "Leave not available!",
  LEAVE_NOT_FOUND: "Leave detail not found!",
  LEAVES_APPLY_SUCCESS: "Leave applied successfully!",
  CANCEL_LEAVES: "Leave cancel successfully!",
  LEAVES_CREATE_SUCCESS: "Leave created successfully!!",
  LEAVE_DELETE_SUCCESS: "Leave deleted successfully!!",
  LEAVE_UPDATE_SUCCESS: "Leave updated successfully!!",

  LEAVE_PENDING: "Leave Request is Pending",
  LEAVE_SUCCESS: "Leave Request is Approved",
  LEAVE_PARTIALLY_APPROVED: "Leave Request is Partially Approved",

  USER_EXPERIENCE_DETAIL_EXISTS: "User experience already exists!",
  USER_EXPERIENCE_NOT_FOUND: "User experience not found!",
  USER_EXPERIENCE_DETAIL_CREATE_SUCCESS:
    "User experience created successfully!!",
  USER_EXPERIENCE_DELETE_SUCCESS: "User experience deleted successfully!!",
  USER_EXPERIENCE_UPDATE_SUCCESS: "User experience updated successfully!!",

  USER_EDUCATION_DETAIL_EXISTS: "User education already exists!",
  USER_EDUCATION_NOT_FOUND: "User education not found!",
  USER_EDUCATION_DETAIL_CREATE_SUCCESS: "User education created successfully!!",
  USER_EDUCATION_DELETE_SUCCESS: "User education deleted successfully!!",
  USER_EDUCATION_UPDATE_SUCCESS: "User education updated successfully!!",

  USER_DOCUMENT_NOT_FOUND: "User document not found!",
  USER_DOCUMENT_CREATE_SUCCESS: "User document created successfully!!",
  USER_DOCUMENT_DELETE_SUCCESS: "User document deleted successfully!!",
  USER_DOCUMENT_UPDATE_SUCCESS: "User document updated successfully!!",

  // Organization LEAVE TYPE
  ORGANIZATION_LEAVE_TYPE_EXISTS: "Organization leave type already exists!",
  ORGANIZATION_LEAVE_TYPE_NOT_FOUND: "Organization leave type not found!",
  ORGANIZATION_LEAVE_TYPE_CREATE_SUCCESS:
    "Organization leave type created successfully!!",
  ORGANIZATION_LEAVE_TYPE_DELETE_SUCCESS:
    "Organization leave type deleted successfully!!",
  ORGANIZATION_LEAVE_TYPE_UPDATE_SUCCESS:
    "Organization leave type updated successfully!!",

  // Organization Shift Policy
  ORGANIZATION_SHIFT_POLICY_EXISTS: "Organization shift policy already exists!",
  ORGANIZATION_SHIFT_POLICY_NOT_FOUND: "Organization shift policy not found!",
  ORGANIZATION_SHIFT_POLICY_CREATE_SUCCESS:
    "Organization shift policy created successfully!!",
  ORGANIZATION_SHIFT_POLICY_DELETE_SUCCESS:
    "Organization shift policy deleted successfully!!",
  ORGANIZATION_SHIFT_POLICY_UPDATE_SUCCESS:
    "Organization shift policy updated successfully!!",

  // Organization Probation Policy
  ORGANIZATION_PROBATION_POLICY_EXISTS:
    "Organization probation policy already exists!",
  ORGANIZATION_PROBATION_POLICY_NOT_FOUND:
    "Organization probation policy not found!",
  ORGANIZATION_PROBATION_POLICY_CREATE_SUCCESS:
    "Organization probation policy created successfully!!",
  ORGANIZATION_PROBATION_POLICY_DELETE_SUCCESS:
    "Organization probation policy deleted successfully!!",
  ORGANIZATION_PROBATION_POLICY_UPDATE_SUCCESS:
    "Organization probation policy updated successfully!!",
  UPDATE_PROBATION_STATUS_SUCCESS:
    "Employee probation status updated successfully!!",

  // Organization Business Unit
  ORGANIZATION_BUSINESS_UNIT_HEAD_EXISTS:
    "Organization business unit head already exists!",
  ORGANIZATION_BUSINESS_UNIT_HEAD_NOT_FOUND:
    "Organization business unit head not found!",
  ORGANIZATION_BUSINESS_UNIT_HEAD_DELETE_SUCCESS:
    "Organization business unit head deleted successfully!!",
  ORGANIZATION_BUSINESS_UNIT_HEAD_UPDATE_SUCCESS:
    "Organization business unit head updated successfully!!",
  ORGANIZATION_BUSINESS_UNIT_HEAD_CREATE_SUCCESS:
    "Organization business unit head created successfully!!",
  ORGANIZATION_BUSINESS_UNIT_EXISTS:
    "Organization business unit already exists!",
  ORGANIZATION_BUSINESS_UNIT_NOT_FOUND: "Organization business unit not found!",
  ORGANIZATION_BUSINESS_UNIT_CREATE_SUCCESS:
    "Organization business unit created successfully!!",
  ORGANIZATION_BUSINESS_UNIT_DELETE_SUCCESS:
    "Organization business unit deleted successfully!!",
  ORGANIZATION_BUSINESS_UNIT_UPDATE_SUCCESS:
    "Organization business unit updated successfully!!",

  // Organization Department
  ORGANIZATION_DEPARTMENT_HEAD_EXISTS:
    "Organization department head already exists!",
  ORGANIZATION_DEPARTMENT_HEAD_NOT_FOUND:
    "Organization department head not found!",
  ORGANIZATION_DEPARTMENT_HEAD_DELETE_SUCCESS:
    "Organization department head deleted successfully!!",
  ORGANIZATION_DEPARTMENT_HEAD_UPDATE_SUCCESS:
    "Organization department head updated successfully!!",
  ORGANIZATION_DEPARTMENT_HEAD_CREATE_SUCCESS:
    "Organization department head created successfully!!",
  ORGANIZATION_DEPARTMENT_EXISTS: "Organization department already exists!",
  ORGANIZATION_DEPARTMENT_NOT_FOUND: "Organization department not found!",
  ORGANIZATION_DEPARTMENT_CREATE_SUCCESS:
    "Organization department created successfully!!",
  ORGANIZATION_DEPARTMENT_DELETE_SUCCESS:
    "Organization department deleted successfully!!",
  ORGANIZATION_DEPARTMENT_UPDATE_SUCCESS:
    "Organization department updated successfully!!",
  ORGANIZATION_DEPARTMENT_SETTING_UPDATE_SUCCESS:
    "Organization department setting updated successfully!!",

  // Organization location
  ORGANIZATION_LOCATION_HEAD_DELETE_SUCCESS:
    "Organization location head deleted successfully!!",
  ORGANIZATION_LOCATION_HEAD_UPDATE_SUCCESS:
    "Organization location head updated successfully!!",
  ORGANIZATION_LOCATION_HEAD_CREATE_SUCCESS:
    "Organization location head created successfully!!",
  ORGANIZATION_LOCATION_EXISTS: "Organization location already exists!",
  ORGANIZATION_LOCATION_NOT_FOUND: "Organization location not found!",
  ORGANIZATION_LOCATION_CREATE_SUCCESS:
    "Organization location created successfully!!",
  ORGANIZATION_LOCATION_DELETE_SUCCESS:
    "Organization location deleted successfully!!",
  ORGANIZATION_LOCATION_UPDATE_SUCCESS:
    "Organization location updated successfully!!",

  // Organization Job Title
  ORGANIZATION_JOB_TITLE_EXISTS: "Organization job title already exists!",
  ORGANIZATION_JOB_TITLE_NOT_FOUND: "Organization job title not found!",
  ORGANIZATION_JOB_TITLE_CREATE_SUCCESS:
    "Organization job title created successfully!!",
  ORGANIZATION_JOB_TITLE_DELETE_SUCCESS:
    "Organization job title deleted successfully!!",
  ORGANIZATION_JOB_TITLE_UPDATE_SUCCESS:
    "Organization job title updated successfully!!",

  // Organization Weekly Off
  ORGANIZATION_WEEKLY_OFF_EXISTS: "Organization weekly off already exists!",
  ORGANIZATION_WEEKLY_OFF_NOT_FOUND: "Organization weekly off not found!",
  ORGANIZATION_WEEKLY_OFF_CREATE_SUCCESS:
    "Organization weekly off created successfully!!",
  ORGANIZATION_WEEKLY_OFF_DELETE_SUCCESS:
    "Organization weekly off deleted successfully!!",
  ORGANIZATION_WEEKLY_OFF_UPDATE_SUCCESS:
    "Organization weekly off updated successfully!!",

  // Organization Holiday List
  ORGANIZATION_HOLIDAY_LIST_EXISTS: "Organization holiday list already exists!",
  ORGANIZATION_HOLIDAY_LIST_NOT_FOUND: "Organization holiday list not found!",
  ORGANIZATION_HOLIDAY_LIST_CREATE_SUCCESS:
    "Organization holiday list created successfully!!",
  ORGANIZATION_HOLIDAY_LIST_DELETE_SUCCESS:
    "Organization holiday list deleted successfully!!",
  ORGANIZATION_HOLIDAY_LIST_UPDATE_SUCCESS:
    "Organization holiday list updated successfully!!",

  // Organization Holidays
  ORGANIZATION_HOLIDAYS_EXISTS: "Organization holidays already exists!",
  ORGANIZATION_HOLIDAYS_NOT_FOUND: "Organization holidays  not found!",
  ORGANIZATION_HOLIDAYS_CREATE_SUCCESS:
    "Organization holidays created successfully!!",
  ORGANIZATION_HOLIDAYS_DELETE_SUCCESS:
    "Organization holidays deleted successfully!!",
  ORGANIZATION_HOLIDAYS_UPDATE_SUCCESS:
    "Organization holidays updated successfully!!",

  // Organization LEAVE Plan
  ORGANIZATION_LEAVE_PLAN_EXISTS: "Organization leave plan already exists!",
  ORGANIZATION_LEAVE_PLAN_NOT_FOUND: "Organization leave plan not found!",
  ORGANIZATION_LEAVE_PLAN_CREATE_SUCCESS:
    "Organization leave plan created successfully!!",
  ORGANIZATION_LEAVE_PLAN_DELETE_SUCCESS:
    "Organization leave plan deleted successfully!!",
  ORGANIZATION_LEAVE_PLAN_UPDATE_SUCCESS:
    "Organization leave plan updated successfully!!",
  ORGANIZATION_LEAVE_ASSIGNED_NOT_FOUND:
    "Organization leave assigned type not found!",
  ORGANIZATION_LEAVE_TYPE_ASSIGNED_CREATE_SUCCESS:
    "Organization leave type assigned successfully!!",
  ORGANIZATION_LEAVE_ASSIGNED_UPDATE_SUCCESS:
    "Organization leave assigned type updated successfully!!",
  ORGANIZATION_LEAVE_ASSIGNED_DELETE_SUCCESS:
    "Organization leave assigned type deleted successfully!!",
  ORGANIZATION_LEAVE_PLAN_CLONE_SUCCESS:
    "Organization leave plan clone successfully!!",

  // Attendance Scheme
  ORGANIZATION_ATTENDANCE_SCHEME_EXISTS:
    "Organization attendance scheme already exists!",
  ORGANIZATION_ATTENDANCE_SCHEME_NOT_FOUND:
    "Organization attendance scheme not found!",
  ORGANIZATION_ATTENDANCE_SCHEME_CREATE_SUCCESS:
    "Organization attendance scheme created successfully!!",
  ORGANIZATION_ATTENDANCE_SCHEME_UPDATE_SUCCESS:
    "Organization attendance scheme updated successfully!!",
};
const getMessage = (key) => {
  if (messages[key]) {
    return messages[key];
  }
  return "Message Key not Found!!";
};

module.exports = { getMessage };
