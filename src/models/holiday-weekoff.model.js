module.exports = (sequelize, DataTypes) => {
  const HolidayWeekOff = sequelize.define(
    "HolidayWeekOff",
    {
      holiday_weekoff_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      holiday_adjoining_leave_option: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      total_num_of_leaves: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      adjoining_leave_days: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      is_selected_holidays: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      not_consider_holiday_is_leave: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      week_off_adjoining_leave_option: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      total_num_of_leaves_for_week_off: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      adjoining_leave_days_for_week_off: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      is_selected_week_off: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      not_consider_week_off_is_leave: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      sandwich_policy_across_leave_types: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "HolidayWeekOff",
      tableName: "holiday_week_off",
    }
  );
  return HolidayWeekOff;
};
