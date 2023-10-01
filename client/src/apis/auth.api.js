import instance from '../../axios.config.js'
import { logout } from '../utils/logout.js'

export const apiLogin = async (payload) =>
	instance('/user/login', {
		method: 'post',
		data: payload,
	})

export const apiRegister = async (payload) =>
	instance('/user/register', {
		method: 'post',
		data: payload,
	})

export const checkResponseCode = (err) => {
	const responseCode = err.response.status
	if (responseCode) (responseCode == 401 || responseCode === 403) && logout()
}
