const JWT = require('jsonwebtoken')
const asynHandler = require('express-async-handler')
const { Authorization } = require('../../utils/error.response')
const { APP_SECRET } = require('../../config')
const { findUserById } = require('../../database/repository/user.repo')

const verifyTokenSocket = asynHandler((socket, next) => {
	const token = socket.handshake.auth?.token

	if (!token) return next(new Authorization('Socket Authorization'))

	JWT.verify(token, APP_SECRET, async (err, decoded) => {
		if (err) {
			if (err.message === 'JsonWebTokenError') {
				return next(new Authorization('Socket Authorization'))
			} else {
				return next(new BadRequest(err.message))
			}
		}

		const foundUser = await findUserById(decoded?.userId)
		if (!foundUser) return next(new BadRequest('User is not existing'))

		// pass the user for request
		socket.user = foundUser
		next()
	})
})

module.exports = verifyTokenSocket
