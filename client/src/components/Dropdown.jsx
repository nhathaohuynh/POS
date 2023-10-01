import React, { useEffect, useState } from 'react'
import icons from '../utils/icons'
import path from '../utils/path'
import { logout } from '../utils/logout'
import { Link } from 'react-router-dom'

const Dropdown = () => {
	const [isShowDropdown, setIsShowDropdown] = useState(false)

	const handleLogout = () => {
		setIsShowDropdown(false)
		logout()
	}

	return (
		<>
			<div className='relative'>
				<button
					className='text-white w-[20px] h-[20px]'
					onClick={() => setIsShowDropdown(!isShowDropdown)}
					type='button'
				>
					<icons.HiOutlineDotsVertical size={20} />
				</button>
				{/* Dropdown menu */}
				{isShowDropdown ? (
					<div className='z-10 bg-[rgba(0,0,0,0.4)] rounded-[4px]shadow w-40 absolute top-[100%]'>
						<ul
							className=' text-sm text-white'
							aria-labelledby='dropdownDefaultButton'
						>
							<li>
								<Link
									to={path.HOME}
									onClick={() => setIsShowDropdown(false)}
									className='flex justify-between items-center  px-6 py-2 hover:bg-[#5865f2]'
								>
									Edit profile
									<icons.AiOutlineUser size={16} />
								</Link>
							</li>

							<li>
								<Link
									onClick={() => handleLogout()}
									className='flex  items-center justify-between  px-6 py-2 hover:bg-[#5865f2] '
								>
									Sign out
									<icons.FiLogOut size={16} />
								</Link>
							</li>
						</ul>
					</div>
				) : null}
			</div>
		</>
	)
}

export default Dropdown
