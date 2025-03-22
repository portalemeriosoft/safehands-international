import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  msg: '',
  type: '',
}


export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.type = action.payload[0];
      state.msg = action.payload[1];
      state.count = state.count + 1;
    }
  }
});

export const {
  setNotification,
} = notificationSlice.actions;

export const notificationState = (state) => state.notification

export default notificationSlice.reducer;