const Sequelize = require('sequelize')

const db = require('../../config/sequelize')

const Translation = db.define('translations', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  language: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Translation
