const userModel = require('../database/model/user.model')
const {
	checkUserByEmail,
	findUserByEmail,
	findUserByIdAndUpdatePasword,
	findUserById,
} = require('../database/repository/user.repo')
const { unselectFields } = require('../utils')
const { BadRequest, Conflict, Forbidden } = require('../utils/error.response')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generate.jwt')
const { URL_SERVER } = require('../config')
const sendMail = require('../utils/sendMail')
// the time expires of access token
const EXPIRES_ATK = '3days'

class AccessService {
	async login({ username, password }) {
		const email = username + '@gmail.com'
		const userExists = await findUserByEmail(email.toLowerCase())

		//  check user already exists
		if (!userExists) throw new BadRequest('Account is not eixisting')

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

	async register({ email, role }) {
		// check if user exist
		const userExists = await checkUserByEmail(email)

		if (userExists) throw new Conflict('Email already in use. ')

		const data = {
			email,
			role,
		}

		const timeActiveAccount = 5 * 60 * 1000

		const tokenUser = generateToken(data, timeActiveAccount)

		const html = `Please click in link to authenticate account 
		<a href='${URL_SERVER}/access/authen-account/${tokenUser}'>Click Here</a>`

		const options = {
			html,
			to: email,
			subject: 'Authentication acoount',
		}

		sendMail(options)

		return {}
	}

	async authenAccount({ email, role }) {
		// create user document and save it db
		const username = email.split('@')[0]

		await userModel.create({
			username,
			email: email,
			password: username,
			role,
		})
		return {}
	}

	async createAdmin() {
		const emailAdmin = 'admin@gmail.com'
		const role = 'admin'
		const username = 'admin'
		const userExists = await checkUserByEmail(emailAdmin)

		if (userExists) throw new Conflict('Admin have already created.')

		const user = await userModel.create({
			username,
			email: emailAdmin,
			password: username,
			role,
		})

		const userFields = unselectFields(user, [
			'password',
			'createdAt',
			'updatedAt',
		])
		return {
			admin: {
				...userFields,
			},
		}
	}

	async changePassword({ newPassword, comfirmPassword, userId }) {
		const isMatchPasword = newPassword === comfirmPassword

		if (!isMatchPasword)
			throw new BadRequest('Invalid password. Please try again')

		const salt = bcrypt.genSaltSync(10)
		const hashPassword = await bcrypt.hash(newPassword, salt)

		await findUserByIdAndUpdatePasword(userId, hashPassword)

		return {}
	}

	async getCurrentEmployee(userId) {
		return {
			employee: await findUserById(userId),
		}
	}
}

module.exports = new AccessService()
