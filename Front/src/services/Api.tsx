import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    role: string,
    first_name: string,
    last_name: string,
    email: string
  ) => Promise<void>;
  logout: () => void;
  fetchPendingCares: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const REALAPÏ = "https://mascocuidado-backend.onrender.com";
// const LOCALAPI = "http://localhost:3001";
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${REALAPÏ}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const data = await response.json();

      const accessToken = data?.data?.access_token;
      if (!accessToken) {
        throw new Error("Access token not found in response");
      }

      setToken(accessToken);
      localStorage.setItem("token", accessToken);
    } catch (error) {
      throw new Error("Failed to login");
    }
  };

  const register = async (
    username: string,
    password: string,
    role: string,
    first_name: string,
    last_name: string,
    email: string
  ) => {
    try {
      const response = await fetch(`${REALAPÏ}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role,
          first_name,
          last_name,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }
    } catch (error) {
      throw new Error("Failed to register");
    }
  };

  const fetchPendingCares = async () => {
    try {
      const response = await fetch(`${REALAPÏ}/api/v1/cares/pending`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch data");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const contextValue: AuthContextType = {
    token,
    isAuthenticated,
    login,
    register,
    logout,
    fetchPendingCares,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
