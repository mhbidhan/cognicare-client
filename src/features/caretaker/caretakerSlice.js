import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentPage: 'home'
}

const caretakerSlice = createSlice({
	name: 'caretaker',
	initialState,
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload.currentPage
		}
	}
})

export const { setCurrentPage } = caretakerSlice.actions
export default caretakerSlice.reducer