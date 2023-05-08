import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  caretakerToken: '',
};

const caretakerSlice = createSlice({
  name: 'caretaker',
  initialState,
  reducers: {
    setCaretakerToken: (state, action) => {
      state.caretakerToken = action.payload.caretakerToken;
    },
  },
});

export const { setCaretakerToken } = caretakerSlice.actions;
export default caretakerSlice.reducer;
