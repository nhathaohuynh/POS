require('dotenv').config()

module.exports = {
	PORT: process.env.PORT,
	MONGODB_URL: process.env.MONGOBD_URL,
	APP_SECRET: process.env.APP_SECRET,
	CLOUD_NAME: process.env.CLOUDINARY_NAME,
	CLOUD_API_KEY: process.env.CLOUDINARY_KEY,
	CLOUD_API_SECRET: process.env.CLOUDINARY_SECRET,
}
