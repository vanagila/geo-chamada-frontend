import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import type { AuthContextType } from '../types/auth.types';

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('O useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};

export default useAuth;
