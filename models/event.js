'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Event extends Model { }
  Event.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `name can not be empty`
        },
        notNull: {
          args: true,
          msg: `name can not be null`
        }
      }
    },
    location: {
      type: DataTypes.STRING
    },
    statusEvent: {
      type: DataTypes.STRING
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `description can not be empty`
        },
        notNull: {
          args: true,
          msg: `description can not be null`
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
    numOfRent: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: `minimum person is 1`
        }
      }
    }
  }, {
    sequelize
  });
  Event.associate = function (models) {
    // associations can be defined here
    // Event.hasMany(models.User)
    Event.belongsToMany(models.User, { through: models.UserEvent })
  };
  return Event;
};