import api from './api.ts';
import type { Chamada, AbrirChamadaData, RelatorioChamada } from '../types/chamadas.types';

const chamadaService = {
  listByProfessor: async (id: number): Promise<Chamada[]> => {
    const response = await api.get(`/api/v1/chamadas/professor/${id}`);
    return response.data
  },

  listAtivasByProfessor: async (id: number): Promise<Chamada[]> => {
    const response = await api.get(`/api/v1/chamadas/professor/ativas/${id}`);
    return response.data
  },

  getAtivaByAluno: async (): Promise<Chamada> => {
    const response = await api.get(`/api/v1/chamadas/aluno/ativa`);
    return response.data
  },

  relatorioChamada: async (id: number): Promise<RelatorioChamada> => {
    const response = await api.get(`/api/v1/chamadas/${id}/relatorio`);
    return response.data
  },

  create: async (data: AbrirChamadaData): Promise<Chamada> => {
    const response = await api.post(`/api/v1/chamadas/`, data);
    return response.data
  },

  encerrar: async (id: number): Promise<Chamada> => {
    const response = await api.post(`/api/v1/chamadas/${id}/encerrar`, {});
    return response.data
  },
}

export default chamadaService;
