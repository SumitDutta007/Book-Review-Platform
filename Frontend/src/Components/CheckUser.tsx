import React from "react";
import { useUser } from "../Context/UserContext";

const CheckUser: React.FC = () => {
  const { user, isAuthenticated } = useUser();

  return (
    <div>
      {isAuthenticated() ? (
        <p>Welcome, {user}!</p>
      ) : (
        <p>Please log in to access this platform.</p>
      )}
    </div>
  );
};

export default CheckUser;
