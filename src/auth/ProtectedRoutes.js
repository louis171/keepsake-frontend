import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { user } = useContext(AuthContext);

  if (!user.auth) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return props.children
};

export default ProtectedRoute;
