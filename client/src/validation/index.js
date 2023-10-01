const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

export const validateLoginForm = ({ email, password }) => {
	const errors = {}

	if (!email) {
		errors.email = 'Email is required'
	} else if (!emailPattern.test(email)) {
		errors.email = 'Invalid format email'
	}

	if (!password) {
		errors.password = 'Password is required'
	} else if (password.length < 6) {
		errors.password = 'Password must be at least 6 characters'
	}

	return errors
}

export const validateRegisterForm = ({
	username,
	email,
	password,
	comfirmPassword,
}) => {
	const errors = {}
	if (!username) {
		errors.username = 'Username is required'
	} else if (username.length < 3) {
		errors.username = 'Username must be at least 3 characters'
	}

	if (!email) {
		errors.email = 'Email is required'
	} else if (!emailPattern.test(email)) {
		errors.email = 'Invalid format email'
	}

	if (!password) {
		errors.password = 'Password is required'
	} else if (password.length < 6) {
		errors.password = 'Password must be at least 6 characters'
	}

	if (!comfirmPassword) {
		errors.comfirmPassword = 'comfirmPassword is required'
	} else if (comfirmPassword !== password) {
		errors.username = 'Comfirm password do not match. Please try again'
	}

	return errors
}

export const validateEmail = (email) => {
	return emailPattern.test(email)
}
