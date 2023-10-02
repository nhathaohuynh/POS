const userModel = require('../database/model/user.model')
const {
	checkUserByEmail,
	findUserByEmail,
} = require('../database/repository/user.repo')
const { unselectFields } = require('../utils')
const { BadRequest, Conflict } = require('../utils/error.response')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generate.jwt')
// the time expires of access token
const EXPIRES_ATK = '3days'

class AccessService {
	async login({ email, password }) {
		const userExists = await findUserByEmail(email.toLowerCase())

		//  check user already exists
		if (!userExists) throw new BadRequest('Email is not eixisting')

		// compare the password
		const isMatchPassword = await bcrypt.compare(password, userExists.password)

		// if don't match password return common error
		if (!isMatchPassword)
			throw new BadRequest('Invalid credentials. Please try again')

		// unselect field password for client
		const userFields = unselectFields(userExists, [
			'password',
			'createdAt',
			'updatedAt',
		])

		// generate token
		const payload = {
			userId: userExists._id,
			email,
		}
		const accessToken = generateToken(payload, EXPIRES_ATK)

		return {
			accessToken,
			user: {
				...userFields,
			},
		}
	}
}

module.exports = new AccessService()
