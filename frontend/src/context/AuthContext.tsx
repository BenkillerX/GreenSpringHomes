
import { createContext } from "react";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  role: "tenant" | "propertyOwner" | "serviceProvider" | "admin";
  onboardingCompleted: boolean;
  phoneNumber?: string | null;
  whatsappNumber?: string | null;
  contactVisibility?: boolean;
}

export type VerifyEmailResponse = {
  message: string;
  token: string;
  user: User;
};

export interface AuthContextType {
  currentUser: User | null;

  setCurrentUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;

  login: (
    email: string,
    password: string
  ) => Promise<User>;

  googleLogin: (
    credential: string
  ) => Promise<User>;

  register: (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => Promise<{ email: string }>;

  registerOwner: (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => Promise<{ email: string }>;

  registerServiceProvider: (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => Promise<{ email: string }>;

  verifyEmail: (
    email: string,
    code: string
  ) => Promise<VerifyEmailResponse>;

  logout: () => void;

  loading: boolean;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);
