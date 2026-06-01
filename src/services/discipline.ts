import api from './api';
import type { Disciplina, DisciplinaCreate, DisciplinaUpdate, DisciplinaResponse, DisciplinaFormData } from '../types/discipline.types';

const disciplineService = {
  list: async (params?: { skip?: number; limit?: number }): Promise<DisciplinaResponse[]> => {
    const response = await api.get('/api/v1/disciplinas/', { params });
    return response.data
  },

  getById: async (id: number): Promise<DisciplinaResponse> => {
    const response = await api.get(`/api/v1/disciplinas/${id}`);
    return response.data
  },

  getByCode: async (code: string): Promise<DisciplinaResponse> => {
    const response = await api.get(`/api/v1/disciplinas/${code}`);
    return response.data
  },

  create: async (data: DisciplinaCreate): Promise<Disciplina> => {
    const response = await api.post('/api/v1/disciplinas/', data);
    return response.data
  },

  update: async (id: number, data: DisciplinaUpdate): Promise<Disciplina> => {
    const response = await api.put(`api/v1/disciplinas/${id}`, data);
    return response.data

  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`api/v1/disciplinas/${id}`)
  },
};

export default disciplineService;
