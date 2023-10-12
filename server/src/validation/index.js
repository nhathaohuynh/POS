const Joi = require('joi')

module.exports = {
	registerSchema: Joi.object({
		email: Joi.string().email().required(),
		role: Joi.string().valid('seller', 'admin', 'management').required(),
	}),

	loginSchema: Joi.object({
		username: Joi.string().min(3).max(20).required(),
		password: Joi.string().min(3).max(20).required(),
	}),
}
