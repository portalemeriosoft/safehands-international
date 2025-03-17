import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";


import { getUserPath } from "../api/path.js";
import { setIsAuth, setUser } from "../store/userSlice";

import PageSpinner from "./components/layout/PageSpinner";
import ProtectedRoute from "./components/layout/PrivateRoutes";

import Home from "../pages/Home";
import Terms from "../pages/Terms";
import Error from "../pages/NotFound";

import Bookings from "../pages/bookings/Bookings";
import MyBookings from "../pages/bookings/MyBookings";
import DeclinedOrders from "../pages/bookings/DeclinedOrders";
import NewBookingDetail from "../pages/bookings/NewBookingDetail";
import BookingDetail from "../pages/bookings/BookingDetail";
import Booking from "../pages/bookings/Booking";
import CO2EmissionsCalculator from "../pages/bookings/CO2EmissionsCalculator";
import Order from "../pages/bookings/Order";

import NewQuoteRequest from "../pages/quotes/NewQuoteRequest";
import SpecificRequest from "../pages/quotes/SpecificRequest"
import Requests from "../pages/quotes/Requests";
import MyRequests from "../pages/quotes/MyRequests";

import Users from "../pages/users/Users";
import UserRegister from "../pages/users/UserRegister";
import UserDetail from "./../pages/users/UserDetail";

import Login from "../pages/auth/Login";
import ResetPassword from "../pages/auth/ResetPassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Admin from "../pages/auth/Admin";
import LoginDriver from "../pages/auth/LoginDriver";
import Logout from "../pages/auth/Logout";

import Profile from "./../pages/profile/Profile";
import ProfileEdit from "./../pages/profile/ProfileEdit";
import ProfileEditPhoto from "./../pages/profile/ProfileEditPhoto";

import InvoiceDetail from "../pages/invoices/InvoiceDetail";
import Invoices from "../pages/invoices/Invoices";
import UserEdit from "../pages/profile/UserEdit.jsx";




const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");

      axios
        .get(getUserPath)
        .then(({ data }) => {
          dispatch(setUser(data.data.user));
          dispatch(setIsAuth());
          setLoading(false);
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status === 401) {
              console.log("logged out");
              localStorage.removeItem("token");
            }
            setLoading(false);
            console.log(error);
          }
        });
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  return loading ? (
    <PageSpinner />
  ) : (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Home />} path="/" exact />
          <Route element={<Requests />} path="/requests" exact />
          <Route element={<MyRequests />} path="/my-requests" exact />
          <Route element={<SpecificRequest />} path="/request" exact />
          <Route element={<SpecificRequest />} path="/request/:request_id" exact />
          <Route element={<NewQuoteRequest />} path="/request-quote" exact />
          <Route element={<NewBookingDetail />} path="/booking-request" exact />
          <Route element={<DeclinedOrders />} path="/declined-orders" exact />
          <Route element={<Invoices />} path="/invoices" />
          <Route element={<InvoiceDetail />} path="/invoice" />
          <Route element={<Bookings />} path="/bookings" />
          <Route element={<MyBookings />} path="/my-bookings" />
          <Route element={<Booking />} path="/booking/:request_id" />
          <Route element={<BookingDetail />} path="/booking-detail" />
          <Route element={<BookingDetail />} path="/booking-detail/:request_id" />
          <Route element={<Users />} path="/users" />
          <Route element={<Order />} path="/order/:orderId" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<UserDetail />} path="/user/:id" />
          <Route element={<ProfileEdit />} path="/profile/edit" />
          <Route element={<ProfileEditPhoto />} path="/profile/edit/:id/:type" />
          <Route element={<UserEdit />} path="/user/edit/:id" />
          <Route element={<Terms />} path="/terms" />
          <Route element={<Logout />} path="/logout" />
          <Route element={<UserRegister />} path="/user/signup" />
          <Route element={<Error />} path="*" /></Route>
        <Route element={<ForgotPassword />} path="/password/reset" />
        <Route element={<ResetPassword />} path="/password/update/:token" />
        <Route element={<Admin />} path="/admin" />
        
        <Route element={<Login />} path="/login" />
        {/* <Route element={<SignupDriver />} path="/driver/signup" /> */}
        <Route element={<LoginDriver />} path="/driver/login" />
        <Route element={<Invoices />} path="/invoices" />
        <Route element={<CO2EmissionsCalculator />} path="/co2-emission-calculator" />
      </Routes>
    </Router>
  );
};

export default App;
