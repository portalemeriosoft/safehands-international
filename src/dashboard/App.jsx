import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/PrivateRoutes";
import Error from "../pages/NotFound";
import Home from "../pages/Home";
import Invoices from "../pages/Invoices.jsx";
import InvoiceDetail from "./components/InvoiceDetail.jsx";
import Bookings from "../pages/Bookings.jsx";
import MyBookings from "../pages/MyBookings.jsx";
import Requests from "../pages/Requests.jsx";
import MyRequests from "../pages/MyRequests";
import DeclinedOrders from "../pages/DeclinedOrders";
import Users from "../pages/Users.jsx";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import Admin from "../pages/Admin";
import UserRegister from "../pages/UserRegister";
import Page from "../pages/Page";
import SignupDriver from "../pages/SignupDriver";
import LoginDriver from "../pages/LoginDriver";
import Terms from "../pages/Terms";
import axios from "axios";
import PageSpinner from "./components/PageSpinner";
import { useDispatch } from "react-redux";
import { setIsAuth, setUser } from "../store/userSlice";
import { getUserPath } from "../api/path.js";
import Logout from "../pages/Logout";
import Order from "./../pages/Order";
import Profile from "./../pages/Profile";
import ProfileEdit from "./../pages/ProfileEdit";
import UserDetail from "./../pages/UserDetail";
import SpecificRequest from "./components/SpecificRequest.jsx"
import Booking from "./components/Booking.jsx";
import RequestDetail from "../pages/RequestDetail.jsx";
import NewBookingDetail from "../pages/NewBookingDetail.jsx";
import BookingDetail from "../pages/BookingDetail.jsx";
import CO2EmissionsCalculator from "../pages/CO2EmissionsCalculator.jsx";

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
          <Route element={<RequestDetail />} path="/request-quote" exact />
          <Route element={<NewBookingDetail />} path="/booking-request" exact />
          <Route element={<DeclinedOrders />} path="/declined-orders" exact />
          <Route element={<Invoices />} path="/invoices" />
          <Route element={<InvoiceDetail />} path="/invoice" />
          <Route element={<Bookings />} path="/bookings" />
          <Route element={<MyBookings />} path="/my-bookings" />
          <Route element={<Booking />} path="/booking" />
          <Route element={<BookingDetail />} path="/booking-detail" />
          <Route element={<Users />} path="/users" />
          <Route element={<Order />} path="/order/:orderId" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<UserDetail />} path="/user/:id" />
          <Route element={<ProfileEdit />} path="/profile/edit/:id/:type" />
          <Route element={<Terms />} path="/terms" />
          <Route element={<Logout />} path="/logout" />
          <Route element={<UserRegister />} path="/user/signup" />
          <Route element={<Error />} path="*" /></Route>
        <Route element={<ForgotPassword />} path="/password/reset" />
        <Route element={<ResetPassword />} path="/password/update/:token" />
        <Route element={<Admin />} path="/admin" />
        
        <Route element={<Login />} path="/login" />
        <Route element={<Page />} path="/temp" />
        {/* <Route element={<SignupDriver />} path="/driver/signup" /> */}
        <Route element={<LoginDriver />} path="/driver/login" />
        <Route element={<Invoices />} path="/invoices" />
        <Route element={<CO2EmissionsCalculator />} path="/co2-emission-calculator" />
      </Routes>
    </Router>
  );
};

export default App;
