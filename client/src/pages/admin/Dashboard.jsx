import React from 'react'
const Dashboard = () => {
	const { user, isLogin } = useSelector((state) => state.authReducer)
	useEffect(() => {
		if (!isLogin && user?.role !== 'admin') {
			logout()
		}
	}, [user, isLogin])
	return <div className='w-full h-screen flex text-white'></div>
}

export default Dashboard
