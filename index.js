const express = require('express')
const app = express()
const port = 8000

const db = require('./config/sequelize')
const Sentence = require('./models/Translater_models/sentence')
const Translation = require('./models/Translater_models/translation')

app.use(express.urlencoded({ extended: true }))
app.use('/', require('./routes'))

db.sync()
  .then(() => {
    app.listen(port, function (err) {
      if (err) {
        console.log(`Error in running the server: ${err}`)
      }
      console.log(`Server is running on port: ${port}`)
    })
  })
  .catch((error) => {
    console.log('Error in db:', error)
  })

// Sentence and Translation has one to many relationship so
// if Sentence gets deleted ,its all Translation will be deleted as well
Translation.belongsTo(Sentence, { constraints: true, onDelete: 'CASCADE' })
Sentence.hasMany(Translation)
