import api from './api';
import type { RegistrarPresencaData, PresencaResponse } from '../types/presencas.types';

const presencaService = {
  create: async (data: RegistrarPresencaData): Promise<PresencaResponse> => {
    const response = await api.post(`/api/v1/presencas/registrar`, data);
    return response.data
  },
}

export default presencaService;
