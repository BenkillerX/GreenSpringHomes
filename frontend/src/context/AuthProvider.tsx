import { useEffect, useState } from "react";
import api from "../services/api";
import { AuthContext, type User, type VerifyEmailResponse } from "./AuthContext";
import axios from "axios";

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore logged-in user when the app is refreshed
useEffect(() => {
  let cancelled = false;

  const restoreUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get("/api/auth/me");

      if (cancelled) return;

      setCurrentUser(response.data.user);
    } catch (error) {
      if (cancelled) return;

      console.error("Failed to restore user:", error);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401) {
          // Server confirmed the token is invalid
          localStorage.removeItem("token");
          setCurrentUser(null);
        } else {
          // Network error, timeout, or server failure
          // Keep the token for another attempt
          console.warn(
            "Unable to restore user right now. Token preserved."
          );
        }
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  restoreUser();

  return () => {
    cancelled = true;
  };
}, []);

  // Login existing user
  const login = async (
    email: string,
    password: string
  ): Promise<User> => {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    const token = response.data.token;

    localStorage.setItem("token", token);

    const userResponse = await api.get("/api/auth/me");

    const user = userResponse.data.user;

    setCurrentUser(user);

    return user;
  };

  // Register tenant
  const register = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<{ email: string }> => {
    const response = await api.post("/api/auth/register/tenant", {
      firstname,
      lastname,
      email,
      password,
    });

    return {
      email: response.data.email,
    };
  };

  // Register property owner
const registerOwner = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
): Promise<{ email: string }> => {
  const response = await api.post(
    "/api/auth/register/property-owner",
    {
      firstname,
      lastname,
      email,
      password,
    }
  );

  return {
    email: response.data.email,
  };
};

  // Register service provider
  const registerServiceProvider = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
): Promise<{ email: string }> => {
  const response = await api.post(
    "/api/auth/register/service-provider",
    {
      firstname,
      lastname,
      email,
      password,
    }
  );

  return {
    email: response.data.email,
  };
};

const verifyEmail = async (
  email: string,
  code: string
): Promise<VerifyEmailResponse> => {
  const response = await api.post(
    "/api/auth/verify-email",
    {
      email,
      code,
    }
  );

  return response.data;
};


  const logout = (): void => {
    setCurrentUser(null);
    localStorage.removeItem("token");
  };
  // Google Login
const googleLogin = async (credential: string): Promise<User> => {
  const response = await api.post("/api/auth/google", {
    credential,
  });

  const token = response.data.token;

  if (!token) {
    throw new Error("Authentication token was not returned.");
  }

  localStorage.setItem("token", token);

  const userResponse = await api.get("/api/auth/me");

  const user: User = userResponse.data.user;

  setCurrentUser(user);

  return user;
};
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        login,
        register,
        registerOwner,
        registerServiceProvider,
        verifyEmail,
        logout,
        googleLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};