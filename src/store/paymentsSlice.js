import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
}


export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.data = action.payload
    },
    removePayments: (state) => {
      state.data = null
    }
  }
});

export const {
  setPayments,
  removePayments,
} = paymentsSlice.actions;

export const paymentsState = (state) => state.payments.data

export default paymentsSlice.reducer;