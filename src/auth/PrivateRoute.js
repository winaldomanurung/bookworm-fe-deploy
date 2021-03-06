import React from "react";
import { isAuthenticated } from "./index";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() && isAuthenticated().user.role == 0 ? (
    children
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default PrivateRoute;
