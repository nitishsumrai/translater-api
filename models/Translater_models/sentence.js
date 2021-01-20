const Sequelize = require('sequelize')

const db = require('../../config/sequelize')

const Sentence = db.define('sentences', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false
    // unique: true
  },
  language: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Sentence
