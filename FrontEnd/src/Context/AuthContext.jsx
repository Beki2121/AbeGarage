import React, { useState, useEffect, useContext } from "react";
import getAuth from "../utils/auth";

// Create the AuthContext
const AuthContext = React.createContext();

// Export the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the AuthProvider
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const loggedInEmployee = await getAuth();
        if (loggedInEmployee?.employee_token) {
          setIsLogged(true);
          if (loggedInEmployee.employee_role === 3) {
            setIsAdmin(true);
          }
          setEmployee(loggedInEmployee);
          setUser(loggedInEmployee);
        }
      } catch (error) {
        console.error('Error fetching auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuth();
  }, []);

  const value = { 
    isLogged, 
    isAdmin, 
    setIsAdmin, 
    setIsLogged, 
    employee, 
    user, 
    isLoading,
    logout: () => {
      localStorage.removeItem('employee');
      setIsLogged(false);
      setIsAdmin(false);
      setEmployee(null);
      setUser(null);
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
