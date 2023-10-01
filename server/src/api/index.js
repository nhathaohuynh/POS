const express = require('express')
const router = express.Router()

router.use('/acess', require('./access/access.api'))

module.exports = router
