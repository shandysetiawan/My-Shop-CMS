'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize

  const Model = Sequelize.Model

  class Product extends Model { }

  Product.init({
    name: { type: DataTypes.STRING, allowNull: false, validate: { notNull: { msg: "Name must not empty!" }, notEmpty: { msg: "Name must not empty!" } } },
    image_url: DataTypes.STRING,
    price: { type: DataTypes.INTEGER, validate: { min: { args: [[0]], msg: "Price must not minus" } } },
    stock: { type: DataTypes.INTEGER, validate: { min: { args: [[0]], msg: "Stock must not minus" } } },
    UserId: DataTypes.INTEGER
  }, { sequelize });
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.User)
  };
  return Product;
};