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
			console.log()
			getCurrentEmployee()
		}
		if (!user?.alreadyChangePassword) {
			setModel(true)
		}
	}, [user, isLogin])
	return (
		<div>
			<div className='flex h-screen'>
				{/* Left Page - Payment Area */}
				<div className='w-[40%] flex flex-col p-4 border-r border-gray-200'>
					{/* Manage Account and Employee Section */}
					<div className='mb-4'>
						<h2 className='text-lg font-semibold'>Manage Account & Employee</h2>
						{/* Place your content here for account and employee management */}
					</div>
					{/* Payment Area */}
					<div className='h-full'>
						<div className='bg-white p-4 rounded shadow-md flex justify-between flex-col'>
							{/* Product List */}
							<div>
								<div className='h-[12%] flex justify-between bg-gray-100 py-2 px-2 rounded'>
									<div className='w-2/6'>Product Name</div>
									<div className='w-1/6 text-center'>Quantity</div>
									<div className='w-1/6 text-center'>Price</div>
									<div className='w-1/6 text-center'>Subtotal</div>
								</div>
								{/* Fake Product 1 */}
								<div className='flex justify-between items-center p-2'>
									<div className='w-2/6 flex items-center space-x-2'>
										<h5>product A</h5>
									</div>
									<div className='w-1/6 flex items-center justify-center'>
										<button className='px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none'>
											-
										</button>
										<span className='px-2'>2</span>
										<button className='px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none'>
											+
										</button>
									</div>
									<div className='w-1/6 flex items-center justify-center'>
										$10.99
									</div>
									<div className='w-1/6 flex items-center justify-center'>
										$21.98
									</div>
								</div>

								{/* Fake Product 2 */}
								<div className='flex justify-between items-center p-2'>
									<div className='w-2/6 flex items-center space-x-2'>
										<h5>product A</h5>
									</div>
									<div className='w-1/6 flex items-center justify-center'>
										<button className='px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none'>
											-
										</button>
										<span className='px-2'>1</span>
										<button className='px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none'>
											+
										</button>
									</div>
									<div className='w-1/6 flex items-center justify-center'>
										$15.99
									</div>
									<div className='w-1/6 flex items-center justify-center'>
										$15.99
									</div>
								</div>

								{/* Fake Product 3 */}
								<div className='flex justify-between items-center p-2'>
									<div className='w-2/6 flex items-center space-x-2'>
										<h5>product A</h5>
									</div>
									<div className='w-1/6 flex items-center justify-center'>
										<button className='px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none'>
											-
										</button>
										<span className='px-2'>3</span>
										<button className='px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none'>
											+
										</button>
									</div>
									<div className='w-1/6 flex items-center justify-center'>
										$8.99
									</div>
									<div className='w-1/6 flex items-center justify-center'>
										$26.97
									</div>
								</div>
							</div>

							{/* Payment Summary */}
							<div className='mt-4 border-t border-gray-200'>
								<h3 className='text-lg font-semibold text-gray-800 mt-2'>
									Payment Summary
								</h3>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600'>Total Quantity:</span>
									<span className='text-gray-800'>6</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600'>Total:</span>
									<span className='text-blue-500 text-xl font-semibold'>
										$64.94
									</span>
								</div>
							</div>

							{/* Payment Button */}
							<div className='mt-4'>
								<button className='w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none'>
									Pay Now
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Right Page - Product List and Barcode Scanner */}
				<div className='w-[60%] p-4'>
					{/* Barcode Scanner */}
					<div>
						<h2 className='text-lg font-semibold'>Barcode Scanner</h2>
						<input
							type='text'
							className='w-full p-2 border border-gray-200 rounded'
							placeholder='Scan Barcode...'
						/>
					</div>
					{/* Product List */}
					<div className='mb-4'>
						<h2 className='text-lg font-semibold'>Product List</h2>
						{/* Place your product list here */}
					</div>
				</div>
			</div>

			{model && <ChangePasswordDialog setModel={setModel} />}
		</div>
	)
}

export default HomeEmployee
