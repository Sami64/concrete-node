const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const OrderItem = sequelize.define("orderItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: DataTypes.INTEGER,
});

module.exports = OrderItem;
