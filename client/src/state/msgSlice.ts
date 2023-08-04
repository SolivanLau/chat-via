import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatlogRef: '',
};
const msgSlice = createSlice({
  name: 'msg',
  initialState,
  reducers: {
    setChatlog: (state, action: PayloadAction<string>) => {
      state.chatlogRef = action.payload;
    },
  },
});

export default msgSlice.reducer;
