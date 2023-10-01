const userModel = require('../model/user.model')

module.exports = {
	checkUserByEmail: async (email) => {
		return await userModel.exists({ email })
	},

	findUserByEmail: async (email) => {
		return await userModel.findOne({ email }).lean()
	},

	findUserById: async (id) => {
		return await userModel.findById(id).select('-password').lean()
	},
}
