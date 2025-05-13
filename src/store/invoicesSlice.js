import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
}


export const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.data = action.payload
    },
    removeInvoices: (state) => {
      state.data = null
    }
  }
});

export const {
  setInvoices,
  removeInvoices,
} = invoicesSlice.actions;

export const invoicesState = (state) => state.invoices.data

export default invoicesSlice.reducer;