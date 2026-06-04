import api from './api.ts';
import type { Chamada, AbrirChamadaData } from '../types/chamadas.types';

const chamadaService = {
  create: async (data: AbrirChamadaData): Promise<Chamada> => {
    const response = await api.post(`/api/v1/chamadas/`, data);
    return response.data
  }
}

export default chamadaService;
