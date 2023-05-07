import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	userName: undefined,
	token: undefined,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		userLoggedIn: (state, action) => {
			state.userName = action.payload.userName
			state.token = action.payload.token
		},
		userLoggedOut: (state) => {
			state.userName = undefined
			state.token = undefined
		}
	}
})

export const {userLoggedIn, userLoggedOut} = authSlice.actions
export default authSlice.reducer