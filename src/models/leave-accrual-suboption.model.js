module.exports = (sequelize, DataTypes) => {
  const LeaveAccrualSuboption = sequelize.define(
    "LeaveAccrualSuboption",
    {
      leave_accrual_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      leave_accrual_annual_quota_happens_on: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      leave_accrual_annual_quota_happens_month: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      joining_month_start: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      joining_month_end: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      allocate_leave_days: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      exit_month_start: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      exit_month_end: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      allocate_leave_days_of_exit: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "LeaveAccrualSuboption",
      tableName: "leave_accrual_sub_option",
    }
  );
  LeaveAccrualSuboption.associate = function (models) {
    // associations can be defined here
    LeaveAccrualSuboption.belongsTo(models.LeavAccrual, {
      foreignKey: "leave_accrual_id",
      sourceKey: "leave_accrual_id",
    });
  };
  return LeaveAccrualSuboption;
};
