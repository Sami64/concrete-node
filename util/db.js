const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_concrete", "devuser", "@Meanboy6464", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
