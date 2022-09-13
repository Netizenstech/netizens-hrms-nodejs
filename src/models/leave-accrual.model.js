module.exports = (sequelize, DataTypes) => {
  const LeaveAccrual = sequelize.define(
    "LeavAccrual",
    {
      leave_accrual_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      how_emp_leave_calculated: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      all_leaves_credited_as_joins: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      is_earned_on_regular_intervals: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      what_if_emp_joins_mid_of_year: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      leave_accrual_prorate_based_on_joining: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      leave_is_credited_based_on_month: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      no_change_in_annual_quota: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      what_if_emp_exits_mid_year: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      leave_prorate_based_on_emp_exit_date: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      leave_updated_when_emp_exit: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      no_change_in_annual_quota_exit: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "LeaveAccrual",
      tableName: "leave_accrual",
    }
  );
  LeaveAccrual.associate = function (models) {
    // associations can be defined here
    LeaveAccrual.hasMany(models.LeaveAccrualSuboption, {
      foreignKey: "leave_accrual_id",
      sourceKey: "leave_accrual_id",
    });
  };
  return LeaveAccrual;
};
