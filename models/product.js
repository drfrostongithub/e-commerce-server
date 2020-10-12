'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Name Cannot be Empty !`
        },
        notNull: {
          args: true,
          msg: `Name Cannot be Null !`
        }
      }
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Image URL Cannot be Empty !`
        },
        notNull: {
          args: true,
          msg: `Image URL Cannot be Null !`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric:{
          args: true,
          msg : `Cannot input beside number`
        },
        min: {
          args : [0],
          msg: `Price Cannot be lower than 0`
        },
        notEmpty: {
          args: true,
          msg: `Price Cannot be Empty !`
        },
        notNull: {
          args: true,
          msg: `Price Cannot be Null !`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric:{
          args: true,
          msg : `Cannot input beside number`
        },
        min: {
          args : [0],
          msg: `Stock Cannot be lower than 0`
        },
        notEmpty: {
          args: true,
          msg: `Stock Cannot be Empty !`
        },
        notNull: {
          args: true,
          msg: `Stock Cannot be Null !`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};