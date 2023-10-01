import { Routes, Route } from 'react-router-dom'
import path from './utils/path'
import { Dashboard, Home, Login } from './pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
	return (
		<div>
			<Routes>
				<Route element={<Home />} path={path.PUBLIC}>
					<Route element={<Dashboard />} path={path.ADMIN} />
				</Route>
				<Route element={<Login />} path={path.LOGIN} />
			</Routes>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<ToastContainer />
		</div>
	)
}

export default App
