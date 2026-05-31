import api from './api.ts';
import type { TurmaResponse } from '../types/turmas.types'

const turmaService = {
  list: async (params?: { skip?: number; limit?: number }): Promise<TurmaResponse[]> => {
    const response = await api.get('/api/v1/turmas/', { params });
    return response.data
  },
};

export default turmaService;
