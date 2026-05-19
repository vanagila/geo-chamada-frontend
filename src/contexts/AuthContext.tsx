import { createContext, useState, useContext, useEffect, ReactNode} from 'react';
import api from '../services/api';
import config from '../config';
import type { User, RegisterData, AuthContextType } from '../types/auth.types'

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem(config.auth.token);
    const userData = localStorage.getItem(config.auth.userKey);

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Erro ao parsear user data:', error);
        localStorage.removeItem(config.auth.tokenKey);
        localStorage.removeItem(config.auth.userKey);
      }
    }
    setLoading(false);
  }, []);

  const register = async (data: RegisterData) => {
    try {
      const response = await api.post<User>('api/v1/auth/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return { success: true };
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      let errorMessage = 'Erro ao fazer cadastro';

      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map((err: any) => err.msg).join(', ');
        } else if (typeof error.response.data.detail === 'string') {
          errorMessage = error.response.data.detail;
        }
      }

      return {
        success: false,
        error: errorMessage
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('O useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
