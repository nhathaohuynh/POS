import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiLogin, apiRegister } from '../../apis'

export const loginAction = createAsyncThunk(
	'user/login',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiLogin(data)

			if (response?.code === 1) {
				return response.metaData
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)

export const registerAction = createAsyncThunk(
	'user/register',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiRegister(data)
			console.log(response)
			if (response.code === 1) {
				return response.metaData
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)
