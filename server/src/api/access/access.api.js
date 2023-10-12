const express = require('express')
const router = express.Router()
const AccessController = require('../../controller/access.controller')
const asyncHandler = require('express-async-handler')
const {
	verifyTokenAuthenAccount,
	verifyToken,
} = require('../middleware/verifyToken')
const isAdmin = require('../middleware/isAdmin')

router.post('/login', asyncHandler(AccessController.login))

router.post(
	'/register',
	[verifyToken, isAdmin],
	asyncHandler(AccessController.register),
)

router.get(
	'/authen-account/:informationAccount',
	verifyTokenAuthenAccount,
	asyncHandler(AccessController.authenAccount),
)

module.exports = router
