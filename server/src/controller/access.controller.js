const { OkResponse, CreatedResponse } = require('../utils/success.response')
const AccessService = require('../service/access.services')
const { loginSchema, registerSchema } = require('../validation/index')
const { BadRequest } = require('../utils/error.response')
const { URL_CLIENT } = require('../config')

class AccessController {
	async login(req, res) {
		// validate valuf of inputs
		const { error } = loginSchema.validate(req.body, {
			abortEarly: false,
		})
		// if have error send for client now
		if (error) {
			const errorMessage = error.details.map((errorDetail) =>
				errorDetail.message.replace(/["']/g, ''),
			)
			throw new BadRequest(errorMessage[0])
		}
		// if don't have any error excute method login in service
		return new OkResponse({
			metaData: await AccessService.login(req.body),
		}).send(res)
	}

	async register(req, res) {
		// validate valuf of inputs
		const { error } = registerSchema.validate(req.body, {
			abortEarly: false,
		})
		// if have error send for client now
		if (error) {
			const errorMessage = error.details.map((errorDetail) =>
				errorDetail.message.replace(/["']/g, ''),
			)
			throw new BadRequest(errorMessage)
		}
		// if don't have any error excute method register in service
		return new OkResponse({
			metaData: await AccessService.register(req.body),
			message: 'Please check your email to authenticate account',
		}).send(res)
	}

	async authenAccount(req, res) {
		await AccessService.authenAccount(req?.informationAccount)
		return res.redirect(`${URL_CLIENT}/auth/success`)
	}
}

module.exports = new AccessController()
