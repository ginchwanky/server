'use strict';
const { hashPassword } = require('../helpers/hashPassword')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }
  User.init({
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `email can not be empty`
        },
        notNull: {
          args: true,
          msg: `email can not be null`
        },
        isEmail: {
          args: true,
          msg: `invalid email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `password can not be empty`
        },
        notNull: {
          args: true,
          msg: `password can not be null`
        },
        len: {
          args: [4],
          msg: `minimum password length is 4`
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `age can not be empty`
        },
        notNull: {
          args: true,
          msg: `age can not be null`
        },
        len: {
          args: [2],
          msg: `minimum age length is 2`
        },
        min: {
          args: 1,
          msg: `minimum age is 1`
        }
      }
    },
    gender: {
      type: DataTypes.STRING
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `bio can not be empty`
        },
        notNull: {
          args: true,
          msg: `bio can not be null`
        }
      }
    },
    profilePicture: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
    // User.hasMany(models.Event)
    User.belongsToMany(models.Event, { through: models.UserEvent })
  };
  return User;
};