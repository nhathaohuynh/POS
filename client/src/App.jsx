import { Routes, Route } from 'react-router-dom'
import path from './utils/path'
import { Dashboard, Fail, Home, HomeEmployee, Login, Success } from './pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
	return (
		<div>
			<Routes>
				<Route element={<Home />} path={path.PUBLIC}>
					<Route element={<HomeEmployee />} path={path.HOME} />
					<Route element={<Dashboard />} path={path.ADMIN} />
				</Route>
				<Route element={<Login />} path={path.LOGIN} />
				<Route element={<Success />} path={path.SUCCESS} />
				<Route element={<Fail />} path={path.FAIL} />
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
