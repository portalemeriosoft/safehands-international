import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
}


export const declinedOrdersSlice = createSlice({
  name: "declinedOrders",
  initialState,
  reducers: {
    setdeclinedOrders: (state, action) => {
      state.data = action.payload
    },
    removedeclinedOrders: (state) => {
      state.data = null
    }
  }
});

export const {
  setdeclinedOrders,
  removedeclinedOrders,
} = declinedOrdersSlice.actions;

export const declinedOrdersState = (state) => state.declinedOrders.data

export default declinedOrdersSlice.reducer;