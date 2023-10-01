import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateLoginForm } from '../../validation'
import { toastError, toastSuccess } from '../../utils/toast'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../redux/actions/auth.action'
import path from '../../utils/path'
import { clearError } from '../../redux/slices/auth.slice'
import InputField from '../../components/InputField'
import Button from '../../components/Button'

const Login = () => {
	const { error, isLogin, user } = useSelector((state) => state.authReducer)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const initInputs = {
		username: '',
		password: '',
	}
	const [inputs, setInputs] = useState(initInputs)

	const [isFormValid, setIsFormValid] = useState(false)

	const onChangeInput = (e) => {
		if (!isFormValid) setIsFormValid(true)
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmitForm = (e) => {
		e.preventDefault()

		const errors = Object.entries(validateLoginForm(inputs))

		if (errors.length > 0) {
			const arrayErrors = errors.map((error) => error[1])
			setIsFormValid(false)
			toastError(arrayErrors[0])
			return
		}

		dispatch(loginAction(inputs))
		setInputs(initInputs)
	}

	useEffect(() => {
		if (error) {
			setIsFormValid(false)
			toastError(error)
			dispatch(clearError())
		}
		if (isLogin && user) {
			toastSuccess('Login successfully')
			navigate(`/${path.HOME}`)
		}
	}, [error, isLogin])
	return (
		<div className='w-full min-h-screen bg-gray-100 flex flex-col sm:justify-center items-center pt-6 sm:pt-0'>
			<div className='w-full sm:max-w-md p-5 mx-auto'>
				<h2 className='mb-12 text-center text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 text-transparent bg-clip-text '>
					Welcome Back!
				</h2>

				<form>
					<div className='mb-2'>
						<InputField
							label='Username'
							name='username'
							onChangeInput={onChangeInput}
							value={inputs.username}
						/>
					</div>

					<div className='mb-2'>
						<InputField
							label='Password'
							name='password'
							type='password'
							onChangeInput={onChangeInput}
							value={inputs.password}
						/>
					</div>

					<div className='mt-6 flex items-center justify-between'>
						<div className='flex items-center'>
							<input
								id='remember_me'
								type='checkbox'
								className='border border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
							/>
							<label
								htmlFor='remember_me'
								className='ml-2 block text-[16px] text-gray-900'
							>
								Remember me
							</label>
						</div>
					</div>

					<div className='mt-6'>
						<Button
							text='Sign in'
							onClickButton={onSubmitForm}
							isDisable={!isFormValid}
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
