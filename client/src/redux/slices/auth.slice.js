import { createSlice } from '@reduxjs/toolkit'
import { loginAction, registerAction } from '../actions/auth.action'

const authSlice = createSlice({
	name: 'auth',

	initialState: {
		error: '',
		token: '',
		isLogin: false,
		loading: false,
		auth: null,
	},
	reducers: {
		clearError: (state) => {
			state.error = ''
		},
	},
	extraReducers: (builder) => {
		builder.addCase(registerAction.pending, (state) => {
			state.error = ''
			state.loading = true
		})
		builder.addCase(registerAction.fulfilled, (state, action) => {
			state.loading = false
			state.isLogin = true
			state.token = action.payload?.accessToken
			state.auth = action.payload?.auth
		})
		builder.addCase(registerAction.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload
		})

		builder.addCase(loginAction.pending, (state) => {
			state.loading = true
			state.error = ''
		})
		builder.addCase(loginAction.fulfilled, (state, action) => {
			state.loading = false
			state.isLogin = true
			state.token = action.payload?.accessToken
			state.auth = action.payload?.auth
		})
		builder.addCase(loginAction.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload
		})
	},
})
export const { clearError } = authSlice.actions
export default authSlice.reducer
