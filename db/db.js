const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DB, 
  process.env.MYSQL_USER, 
  process.env.MYSQL_PASSWORD, 
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST
  }
)

module.exports = sequelize