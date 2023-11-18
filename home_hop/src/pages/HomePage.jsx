import { useState, useEffect } from "react";

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const logout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/accounts/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      })
      if (response.ok) { 
        setUser(null);
        setIsAuthenticated(false);
        await checkAuthentication()
      }
    } catch (error) {
      if (error) throw error;
      console.error("Failed to logout", error);
    }
  }
  const checkAuthentication = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/accounts/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(true);
        const data = await response.json();
        setUser(data)
        
      }
    } catch (error) {
      console.error("Authentication check failed", error);
    }
  }
  useEffect(() => {
    checkAuthentication();
  }, [])

  return (
    <div>
      {/* TODO: Clean */}
      
      {isAuthenticated ? 
          user ? (
            <div key={user.id}>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
          ) : (
            <p>No user data available</p>
          )
          :
          <p>user is not authenticated</p>  
    }
    <button className="bg-red-500 rounded-full text-white px-3 py-1 text-xs uppercase font-medium" onClick={logout}>logout</button>
    </div>
  );
};

export default HomePage;
