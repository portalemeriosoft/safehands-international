import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
}


export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.data = action.payload
    },
    removeBookings: (state) => {
      state.data = null
    }
  }
});

export const {
  setBookings,
  removeBookings,
} = bookingsSlice.actions;

export const bookingsState = (state) => state.bookings.data

export default bookingsSlice.reducer;