const express = require('express')
const router = express.Router()
const AccessController = require('../../controller/access.controller')
const asyncHandler = require('express-async-handler')

router.post('/login', asyncHandler(AccessController.login))

router.post('/register', asyncHandler(AccessController.register))

module.exports = router
