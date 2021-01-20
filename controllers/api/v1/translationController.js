/* eslint-disable no-unused-vars */
const Sentence = require('../../../models/Translater_models/sentence')
const Translation = require('../../../models/Translater_models/translation')
const translate = require('@vitalets/google-translate-api')
const language = require('../../../helpers/language')

module.exports.translate = async (req, res) => {
  // await Sentence.bulkCreate([{ text: 'love', language: 'english' }, { text: 'hate', language: 'english' }], { returning: true })
  const text = req.body.text
  const translationLanguage = req.body.targetlanguage
  let originalLanguage
  let translatedText
  let langCodeOfGivenText
  // get code of target language
  const langCodeOfTargetText = language.getCode(translationLanguage)
  // if server can not translate send regret msg to user
  if (!langCodeOfTargetText) {
    return res.status(200).json({
      message: `Sorry! Server can not translate given text to ${req.body.targetlanguage}`,
      data: {
        text: text
      }
    })
  }

  try {
    // check if sentence was already asked before by Searching it in Sentence Table
    let sentence = await Sentence.findOne({
      where: {
        text: text
      }
    })
    let translated
    // if sentence was asked before
    if (sentence !== null) {
      // search if its translation is already saved
      translated = await Translation.findOne({ where: { sentenceId: sentence.id, language: langCodeOfTargetText } })
    }
    // if translation is present
    if (translated) {
      // Send the tranlated Text as well as Traget Language and Original Language to user in json
      translatedText = translated.dataValues.text
      originalLanguage = language.getLanguage(sentence.language)
      return res.status(200).json({
        message: `Given text is translated to ${req.body.targetlanguage}`,
        data: {
          text: translatedText,
          from: originalLanguage,
          to: translationLanguage,
          date: Date.now()
        }
      })
    } else {
      // use Google Api to fetch Transaltion
      translated = await translate(text, { client: 'gtx', to: langCodeOfTargetText })
      translatedText = translated.text
      // Get the Original Language Of the Given Text
      originalLanguage = language.getLanguage(translated.from.language.iso)
      langCodeOfGivenText = translated.from.language.iso
    }
    // Send the tranlated Text as well as Traget Language and Original Language to user in json
    res.status(200).json({
      message: `Given text is translated to ${req.body.targetlanguage}`,
      data: {
        text: translatedText,
        from: originalLanguage,
        to: translationLanguage,
        date: Date.now()
      }
    })
    // if sentence is not present add it in table or first time asked by user
    if (!sentence) {
      sentence = await Sentence.create({ text: text, language: langCodeOfGivenText })
    }
    // get Sister languages of Traget Language
    const sisterLanguages = language.getSisterLanguages(langCodeOfTargetText)
    sisterLanguages.forEach(async (lang) => {
      try {
        // use Google Api to fetch Transaltion
        const curTranslated = await translate(text, { client: 'gtx', to: lang })
        // add translations in Translation Table (Each Translation Tupple will have one to one realtionship with Given Sentence )
        await sentence.createTranslation({ text: curTranslated.text, language: lang })
      } catch (error) {
        console.log('Error in Tranlating given Text:', error)
      }
    })
    return
  } catch (error) {
    // if error occur send msg to user
    console.log(error)
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}
