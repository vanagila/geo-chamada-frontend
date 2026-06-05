import api from './api.ts';
import type { TurmaResponse, TurmaCreate, Turma, TurmaUpdate } from '../types/turmas.types'

const turmaService = {
  list: async (params?: { skip?: number; limit?: number }): Promise<TurmaResponse[]> => {
    const response = await api.get('/api/v1/turmas/', { params });
    return response.data
  },

  getById: async (id: number): Promise<TurmaResponse> => {
    const response = await api.get(`/api/v1/turmas/${id}`);
    return response.data
  },

  getByCode: async (code: string): Promise<TurmaResponse> => {
    const response = await api.get(`/api/v1/turmas/${code}`);
    return response.data
  },

  getByProfessor: async (professorId: string): Promise<TurmaResponse> => {
    const response = await api.get(`/api/v1/turmas/professor/${professorId}`);
    return response.data
  },

  create: async (data: TurmaCreate): Promise<Turma> => {
    const response = await api.post('/api/v1/turmas/', data);
    return response.data
  },

  update: async (id: number, data: TurmaUpdate): Promise<Turma> => {
    const response = await api.put(`api/v1/turmas/${id}`, data);
    return response.data

  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`api/v1/turmas/${id}`)
  },

  addProfessor: async (turmaId: number, professorId: number): Promise<void> => {
    await api.post(`/api/v1/turmas/${turmaId}/professores/${professorId}`)
  },

  addAluno: async (turmaId: number, alunoId: number): Promise<void> => {
    await api.post(`/api/v1/turmas/${turmaId}/alunos/${alunoId}`)
  },

};

export default turmaService;
