import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
}


export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setReports: (state, action) => {
      state.data = action.payload
    },
    removeReports: (state) => {
      state.data = null
    }
  }
});

export const {
  setReports,
  removeReports,
} = reportsSlice.actions;

export const reportsState = (state) => state.reports.data

export default reportsSlice.reducer;