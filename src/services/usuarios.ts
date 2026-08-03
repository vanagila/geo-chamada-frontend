import api from './api'
import type { User } from '../types/auth.types';

const usuarioService = {
  listProfessor: async (params?: { skip?: number; limit?: number }): Promise<User[]> => {
    const response = await api.get('/api/v1/usuarios/?tipo=PROFESSOR', { params });
    return response.data; 
  },

  listAluno: async (params?: { skip?: number; limit?: number }): Promise<User[]> => {
    const response = await api.get('/api/v1/usuarios/?tipo=ALUNO', { params });
    return response.data; 
  },
};

export default usuarioService;
