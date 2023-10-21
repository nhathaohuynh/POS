import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiGetCurrentEmployee } from '../../apis'
import ChangePasswordDialog from '../../components/ChangePasswordDialog'
import { setCurrentEmployee } from '../../redux/slices/auth.slice'
import { logout } from '../../utils/logout'

const HomeEmployee = () => {
	const dispatch = useDispatch()
	const { token, user, isLogin, isGetCurrentUser } = useSelector(
		(state) => state.authReducer,
	)
	const [model, setModel] = useState(false)

	const getCurrentEmployee = async () => {
		const response = await apiGetCurrentEmployee(token)
		dispatch(setCurrentEmployee({ user: response.data.metaData?.employee }))
	}

	useEffect(() => {
		if (!isLogin || user?.role !== 'seller') {
			logout()
		}
		if (isLogin && user?._id && !isGetCurrentUser) {
			getCurrentEmployee()
		}
		if (!user?.alreadyChangePassword) {
			setModel(true)
		}
	}, [user, isLogin])
	return <div>{model && <ChangePasswordDialog setModel={setModel} />}</div>
}

export default HomeEmployee
