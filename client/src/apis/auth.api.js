import instance from '../../axios.config.js'
import { logout } from '../utils/logout.js'

export const apiLogin = async (payload) =>
	instance('/access/login', {
		method: 'post',
		data: payload,
	})

export const checkResponseCode = (err) => {
	const responseCode = err.response.status
	if (responseCode) (responseCode == 401 || responseCode === 403) && logout()
}
