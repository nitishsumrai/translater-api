const express = require('express')
const router = express.Router()

router.use('/translate', require('./translation_service.js'))

module.exports = router
