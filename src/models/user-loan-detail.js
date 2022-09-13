/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserLoanDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserLoanDetail.init({
        user_loan_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        user_id:{
            type: DataTypes.UUID,
            allowNull: true,
        },
        loan_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        loan_amount:{
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        monthly_repayment_amount: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        repayment_period: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        rate_of_interest:{
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        repayment_start_date:{
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'UserLoanDetail',
        tableName: 'user_loan_detail',
    });

    UserLoanDetail.associate = models => {
        UserLoanDetail.belongsTo(models.User, {
            foreignKey: 'user_id',
            sourceKey: 'user_id',
        });
    };

    return UserLoanDetail;
};
