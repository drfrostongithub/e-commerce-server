'use strict';
const {
  Model
} = require('sequelize');

const bcryptjs = require(`bcryptjs`)

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Email Musn't empty!`
        },
        isEmail: {
          args: true,
          msg: `Must be email!`
        },
        notNull: {
          args: true,
          msg: `Email Musn't empty!`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Pass can't be empty !`
        }
      },
      notNull:{
        args: true,
        msg:`Pass can't be empty`
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(instance=>{

    let salt = bcryptjs.genSaltSync(10)
    let hash = bcryptjs.hashSync(instance.password, salt)

    instance.password = hash
    instance.role = `customer`
  })

  return User;
};