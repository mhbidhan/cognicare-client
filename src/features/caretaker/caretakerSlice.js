import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  caretakerToken: '',
  thisPatient: {},
  patientList: [],
  patientRoutine: [],
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
    setThisPatientRoutine: (state, action) => {
      state.patientRoutine = action.payload.patientRoutine;
    },
  },
});

export const {
  setCaretakerToken,
  setPatientList,
  setThisPatient,
  setThisPatientRoutine,
} = caretakerSlice.actions;
export default caretakerSlice.reducer;
