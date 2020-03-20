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
        }
      }
    }
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