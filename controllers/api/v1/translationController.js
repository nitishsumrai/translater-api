/* eslint-disable no-unused-vars */
const Sentence = require('../../../models/Translater_models/sentence')
const Translation = require('../../../models/Translater_models/translation')
const translate = require('@vitalets/google-translate-api')
const language = require('../../../helpers/language')

module.exports.translate = async (req, res) => {
  console.log(req.body)
  const text = req.body.text
  const lang = req.body.targetlanguage
  // get code of target language
  const langCode = language.getCode(lang)
  // if server can not translate send msg to user
  if (!langCode) {
    return res.status(200).json({
      message: `Sorry! Server can not translate given text to ${req.body.targetlanguage}`,
      data: {
        text: text,
        from: 'original language',
        to: 'target language'
      }
    })
  }
  try {
    const translated = await translate(text, { client: 'gtx', to: langCode })
    res.send(translated)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}
