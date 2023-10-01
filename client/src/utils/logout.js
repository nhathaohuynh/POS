import path from './path'
export const logout = () => {
	localStorage.clear()
	window.location.pathname = path.LOGIN
}
