import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  caretakerToken: '',
  thisPatient: {},
  patientList: [],
};

const caretakerSlice = createSlice({
  name: 'caretaker',
  initialState,
  reducers: {
    setCaretakerToken: (state, action) => {
      state.caretakerToken = action.payload.caretakerToken;
    },
    setPatientList: (state, action) => {
      state.patientList = action.payload.patientList;
    },
    setThisPatient: (state, action) => {
      state.thisPatient = action.payload.thisPatient;
    },
  },
});

export const { setCaretakerToken, setPatientList, setThisPatient } =
  caretakerSlice.actions;
export default caretakerSlice.reducer;
