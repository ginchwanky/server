'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class UserEvent extends Model { }
  UserEvent.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    EventId: {
      type: DataTypes.INTEGER
    },
    statusApplicant: {
      type: DataTypes.BOOLEAN
    },
    statusPayment: {
      type: DataTypes.BOOLEAN
    },
    payment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `payment can not be empty`
        },
        notNull: {
          args: true,
          msg: `payment can not be null`
        },
        min: {
          args: 1,
          msg: `minimum payment is 1`
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Date can't be empty, please fill the due_date`
        },
        notNull: {
          args: true,
          msg: `Date is still null`
        },
        futureDate(value) {
          const dateUser = new Date(value)
          if (dateUser < new Date()) {
            throw new Error(`choose future date`)
          }
        }
      }
    },
  }, {
    sequelize
  });
  UserEvent.associate = function (models) {
    // associations can be defined here
    UserEvent.belongsTo(models.User)
    UserEvent.belongsTo(models.Event)
  };
  return UserEvent;
};