import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { logout } from '../../utils/logout'

const HomeEmployee = () => {
	const { user, isLogin } = useSelector((state) => state.authReducer)
	useEffect(() => {
		if (!isLogin && user?.role !== 'sale') {
			logout()
		}
	}, [user, isLogin])
	return <div>This is page home employee</div>
}

export default HomeEmployee
