const express = require('express')
const router = express.Router()

router.use('/access', require('./access/access.api'))

module.exports = router
