import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import ordersReducer from "./ordersSlice";
import declinedOrdersReducer from "./declinedOrdersSlice";
import customersReducer from "./customersSlice";
import paymentsReducer from "./paymentsSlice";
import bookingsReducer from "./bookingsSlice";
import invoicesReducer from "./invoicesSlice";
import reportsReducer from "./reportsSlice";
import notificationReducer from "./notificationSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    orders: ordersReducer,
    declinedOrders: declinedOrdersReducer,
    customers: customersReducer,
    payments: paymentsReducer,
    bookings: bookingsReducer,
    invoices: invoicesReducer,
    notification: notificationReducer,
    reports: reportsReducer
  },
});

export default store;