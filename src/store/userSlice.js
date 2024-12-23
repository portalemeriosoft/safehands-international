import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  data: null,
}


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth: (state) => {
      state.isAuth = true;
    },
    setUser: (state, action) => {
      state.data = action.payload
    },
    removeIsAuth: (state) => {
      state.isAuth = false;
    },
    removeUser: (state) => {
      state.data = null
    }
  }
});

export const {
  setIsAuth,
  setUser,
  removeIsAuth,
  removeUser,
} = userSlice.actions;

export const userState = (state) => state.user

export default userSlice.reducer;