import { createContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import config from '../config';
import type { User, RegisterData, AuthContextType, LoginResponse } from '../types/auth.types'

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem(config.auth.tokenKey);
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

  const login = async (username: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await api.post<LoginResponse>('api/v1/auth/login', formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token } = response.data;
      localStorage.setItem(config.auth.tokenKey, access_token)

      const userResponse = await api.get('api/v1/usuarios/me');
      const userData = userResponse.data;
      localStorage.setItem(config.auth.userKey, JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error: any) {
      let errorMessage = 'Erro ao fazer login';

      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail[0]?.msg || errorMessage;
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

  const logout = () => {
    localStorage.removeItem(config.auth.tokenKey);
    localStorage.removeItem(config.auth.userKey);
    setUser(null);
    toast.success('Você saiu da sua conta.')
  }

  const register = async (data: RegisterData) => {
    try {
      await api.post<User>('api/v1/auth/register', data, {
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

  const value: AuthContextType = { user, loading, login, logout, register };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthProvider;
