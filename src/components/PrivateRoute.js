// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const PrivateRoute = ({ element }) => {
  const auth = getAuth();
  const user = auth.currentUser; // Check if there is a logged-in user

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
