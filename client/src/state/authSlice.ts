import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userInfo {
  uid: string;
  name: string;
  email: string;
}
const initialState = {
  uid: '',
  name: '',
  email: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<userInfo>) => {
      const { uid, name, email } = action.payload;
      state.name = name;
      state.uid = uid;
      state.email = email;
    },
  },
});

export const { setUserInfo } = authSlice.actions;

export default authSlice.reducer;
