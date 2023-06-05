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
    deleteThisPatientRoutineElement: (state, action) => {
      const newRoutine = state.patientRoutine.filter(
        (item) => item.time !== action.payload.element.time
      );
      state.patientRoutine = newRoutine;
    },
  },
});

export const {
  setCaretakerToken,
  setPatientList,
  setThisPatient,
  setThisPatientRoutine,
  deleteThisPatientRoutineElement,
} = caretakerSlice.actions;
export default caretakerSlice.reducer;
