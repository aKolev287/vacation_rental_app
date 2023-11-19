import React, { useEffect } from "react";
import { useAuth } from "../hooks/authContext";
import MiniBar from "../components/MiniBar";

const HomePage = () => {
  const { isAuthenticated, user, isLoading, checkAuthentication } = useAuth();



  useEffect(() => {
    checkAuthentication();
  }, [])

  return (
    <div>
      <MiniBar />
      {/* TODO: Clean */}
      {isLoading ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        user ? (
          <div key={user.id}>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        ) : (
          <p>No user data available</p>
        )
      ) : (
        <p>User is not authenticated</p>
      )}
    </div>
  );
};

export default HomePage;

