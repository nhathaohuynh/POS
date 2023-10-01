import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const commonConfig = {
	key: 'current-user',
	storage,
}

const persistConfig = {
	...commonConfig,
	whitelist: ['isLogin', 'user', 'token'],
}

const userPersist = persistReducer(persistConfig, authSlice)

export const store = configureStore({
	reducer: {
		authReducer: userPersist,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store)
