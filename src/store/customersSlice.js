import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
}


export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.data = action.payload
    },
    removeCustomers: (state) => {
      state.data = null
    }
  }
});

export const {
  setCustomers,
  removeCustomers,
} = customersSlice.actions;

export const customersState = (state) => state.customers.data

export default customersSlice.reducer;