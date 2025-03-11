import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import ordersReducer from "./ordersSlice";
import declinedOrdersReducer from "./declinedOrdersSlice";
import customersReducer from "./customersSlice";
import paymentsReducer from "./paymentsSlice";
import bookingsReducer from "./bookingsSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    orders: ordersReducer,
    declinedOrders: declinedOrdersReducer,
    customers: customersReducer,
    payments: paymentsReducer,
    bookings: bookingsReducer,
  },
});

export default store;