import { createSlice } from "@reduxjs/toolkit";

const initialState = { patientData: {} };

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatient: (state, action) => {
      state.patientData = { ...action.payload };
    },
  },
});

export const { setPatient } = patientSlice.actions;
export default patientSlice.reducer;
