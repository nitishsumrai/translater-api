const Sequelize = require('sequelize')

const DB = 'translater'
const USERNAME = 'root'
const PASSWORD = '12345'

const sequelize = new Sequelize(DB, USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  pool: {
    min: 0,
    max: 2
  }
})

module.exports = sequelize
