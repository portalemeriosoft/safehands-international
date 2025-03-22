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
    setCustomer: (state, action) => {
      state.data = state.data.map(user => 
        user.id === action.payload.user.id ? { ...user, ...action.payload.user } : user
      );
    },
    removeCustomers: (state) => {
      state.data = null
    }
  }
});

export const {
  setCustomers,
  setCustomer,
  removeCustomers,
} = customersSlice.actions;

export const customersState = (state) => state.customers.data

export default customersSlice.reducer;