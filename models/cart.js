'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    isPaid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cart',
  });

  Cart.beforeCreate(instance=>{
    instance.isPaid = false
  })

  return Cart;
};