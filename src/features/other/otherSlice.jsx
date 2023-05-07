import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentPage: 'home'
}

const otherSlice = createSlice({
	name: 'other',
	initialState,
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload.currentPage
		}
	}
})

export const { setCurrentPage } = otherSlice.actions
export default otherSlice.reducer