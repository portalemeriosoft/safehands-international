import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/PrivateRoutes";
import Error from "../pages/NotFound";
import Home from "../pages/Home";
import Payments from "../pages/Payments";
import Orders from "../pages/Orders";
import DeclinedOrders from "../pages/DeclinedOrders";
import Customers from "../pages/Customers";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import Admin from "../pages/Admin";
import Signup from "../pages/Signup";
import Page from "../pages/Page";
import SignupDriver from "../pages/SignupDriver";
import LoginDriver from "../pages/LoginDriver";
import Map from "../pages/Map";
import LocationMap from "../pages/LocationMap";
import LocationMapUpdate from "../pages/LocationMapUpdate";
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

if ("geolocation" in navigator) {
  // Request the user's current location
  navigator.geolocation.getCurrentPosition(
    function(position) {
      // Success callback
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      localStorage.setItem('latitude', latitude)
      localStorage.setItem('longitude', longitude)
    },
    function(error) {
      // Error callback
      console.error("Error getting location:", error.message);
    }
  );
} else {
  // Geolocation is not supported
  console.error("Geolocation is not supported by this browser.");
}

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
          <Route element={<Map />} path="/map" exact />
          <Route element={<LocationMap />} path="/user/:id/location" exact />
          <Route element={<LocationMapUpdate />} path="/user/:id/location/update" exact />
          <Route element={<Orders />} path="/orders" exact />
          <Route element={<DeclinedOrders />} path="/declined-orders" exact />
          <Route element={<Payments />} path="/payments" />
          <Route element={<Customers />} path="/customers" />
          <Route element={<Order />} path="/order/:orderId" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<UserDetail />} path="/user/:id" />
          <Route element={<ProfileEdit />} path="/profile/edit/:id/:type" />
          <Route element={<Terms />} path="/terms" />
          <Route element={<Logout />} path="/logout" />
          <Route element={<Error />} path="*" />
        </Route>
        <Route element={<ForgotPassword />} path="/password/reset" />
        <Route element={<ResetPassword />} path="/password/update/:token" />
        <Route element={<Admin />} path="/admin" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Login />} path="/login" />
        <Route element={<Page />} path="/temp" />
        <Route element={<SignupDriver />} path="/driver/signup" />
        <Route element={<LoginDriver />} path="/driver/login" />
      </Routes>
    </Router>
  );
};

export default App;
