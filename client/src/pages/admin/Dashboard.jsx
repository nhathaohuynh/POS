import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { logout } from '../../utils/logout'
const Dashboard = () => {
	const { user, isLogin } = useSelector((state) => state.authReducer)
	useEffect(() => {
		if (!isLogin && !user) {
			logout()
		}
	}, [user, isLogin])
	return <div className='w-full h-screen flex text-white'></div>
}

export default Dashboard
