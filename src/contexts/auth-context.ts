import { createContext } from 'react';

export interface User {
  id: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

export const TOKEN_KEY = 'auth_token';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
