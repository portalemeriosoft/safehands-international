import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { userState } from "../../../store/userSlice";

const ProtectedRoute = () => {
  const user = useSelector(userState);
  let location = useLocation();

  if (!user.isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
