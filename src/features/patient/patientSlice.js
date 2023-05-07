import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: "home",
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const { setCurrentPage } = patientSlice.actions;
export default patientSlice.reducer;
