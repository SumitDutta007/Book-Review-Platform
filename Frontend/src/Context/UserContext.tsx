import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  isAuthenticated: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("token", user);
    } else {
      localStorage.removeItem("token");
    }
  }, [user]);

  const isAuthenticated = () => !!user;

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserContext, UserProvider };
