import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
}


export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.data = action.payload
    },
    setOrder: (state, action) => {
      state.data = state.data.map((x) => {
        if (x.id === action.payload.id) {
          return action.payload
        } else {
          return x
        }
      })
    },
    removeOrders: (state) => {
      state.data = null
    }
  }
});

export const {
  setOrders,
  setOrder,
  removeOrders,
} = ordersSlice.actions;

export const ordersState = (state) => state.orders.data

export default ordersSlice.reducer;