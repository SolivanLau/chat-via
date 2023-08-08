import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  uid: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
}
const initialState: UserInfo = {
  uid: null,
  name: null,
  email: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      if (action.payload) {
        const { uid, name, email, token } = action.payload;
        state.uid = uid;
        state.name = name;
        state.email = email;
        state.token = token;
      } else {
        state.uid = null;
        state.name = null;
        state.email = null;
        state.token = null;
      }
    },
    clearUserInfo: (state) => {
      state.uid = null;
      state.name = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = authSlice.actions;

export default authSlice.reducer;
