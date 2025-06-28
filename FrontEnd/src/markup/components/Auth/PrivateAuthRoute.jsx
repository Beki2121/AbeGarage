// Import React, the useState and useEffect hooks
import React, { useState, useEffect } from "react";
// Import the Route and Navigate components
import { Navigate } from "react-router";
// Import the AuthContext
import { useAuth } from "../../../Context/AuthContext";
// Import the Loading component
import Loading from "../../../assets/Loading/Loading";

const PrivateAuthRoute = ({ roles, children }) => {
  const { isLogged, employee, isLoading } = useAuth();

  // Show loading or wait for auth to be checked
  if (isLoading) {
    return <Loading />;
  }

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  if (
    roles &&
    roles.length > 0 &&
    employee &&
    !roles.includes(employee.employee_role)
  ) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateAuthRoute;
