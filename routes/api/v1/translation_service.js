const express = require('express')
const router = express.Router()

const translationController = require('../../../controllers/api/v1/translationController')

router.post('/', translationController.translate)

module.exports = router
