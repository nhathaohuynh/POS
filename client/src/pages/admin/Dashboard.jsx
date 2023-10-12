import React from 'react'
const Dashboard = () => {
<<<<<<< HEAD
=======
	const { user, isLogin } = useSelector((state) => state.authReducer)
	useEffect(() => {
		if (!isLogin && user?.role !== 'admin') {
			logout()
		}
	}, [user, isLogin])
>>>>>>> develop
	return <div className='w-full h-screen flex text-white'></div>
}

export default Dashboard
