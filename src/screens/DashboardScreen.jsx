import React from "react";
import Dashboard from "../components/Dashboard";
import { UserProvider } from "../components/UserContext";

const DashboardScreen = () => {
  return (
    <div>
      <UserProvider>
        <Dashboard />
      </UserProvider>
    </div>
  );
};

export default DashboardScreen;
