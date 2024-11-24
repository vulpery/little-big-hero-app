"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../model/user";
import { UserService } from "./UserService";

// Define the context value interface
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook for consuming the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Define props for the UserProvider
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // State for managing user data
  const [user, setUser] = useState<User | null>(null);

  // Fetch the current user only once, when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await UserService.INSTANCE.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    };

    fetchUser();
  }, []); // Empty dependency array ensures this runs only once

  // Function to handle login
  const login = (userData: User) => {
    setUser(userData); // Set user data in state
  };

  // Function to handle logout
  const logout = () => {
    setUser(null); // Clear user data
  };

  // Values provided to consumers
  const value = {
    user,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
