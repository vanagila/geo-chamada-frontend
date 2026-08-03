import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { RegistrarPresencaData } from '../types/presencas.types.ts';
import presencaService from '../services/presencas';

const PRESENCAS_QUERY_KEY = ['presencas']

const usePresencas = () => {
  const queryClient = useQueryClient();
  /*
  const { mutate: createPresenca, isPending: isCreating } = useMutation({
    mutationFn: (data: RegistrarPresencaData) => presencaService.create(data),
    onSuccess: () => {
      if (data.status === 'PRESENTE') {
        toast.success('Presença registrada com sucesso');
      } else {
        toast.error(`Você está fora do raio de validação! Distância: ${data.distancia_calculada?.toFixed(0)}m`);
      }
      queryClient.invalidateQueries({ queryKey: ['chamada-ativa-aluno'] })
      queryClient.invalidateQueries({ queryKey: PRESENCAS_QUERY_KEY });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Erro ao registrar presença');
    },
  });
  */
  const { mutate: createPresenca, isPending: isCreating } = useMutation({
    mutationFn: (data: RegistrarPresencaData) => {
      console.log('📤 Enviando requisição para registrar presença:', data);
      return presencaService.create(data);
    },
    
    onSuccess: (data: PresencaResponse, variables: RegistrarPresencaData) => {
      console.log('✅ Resposta da API:', data);
      console.log('📦 Dados enviados:', variables);
      
      if (data.status === 'PRESENTE') {
        toast.success(`✅ Presença confirmada! Distância: ${data.distancia_calculada?.toFixed(0)}m`);
      } else if (data.status === 'AUSENTE') {
        toast.error(`❌ Fora do raio de validação! Distância: ${data.distancia_calculada?.toFixed(0)}m`);
      } else {
        toast.info(`📝 Status: ${data.status}`);
      }
      
      // Invalida queries para recarregar dados atualizados
      queryClient.invalidateQueries({ queryKey: ['chamada-ativa-aluno'] });
      queryClient.invalidateQueries({ queryKey: PRESENCAS_QUERY_KEY });
    },
    
    onError: (error: any, variables: RegistrarPresencaData) => {
      console.error('❌ Erro na requisição:', error);
      console.error('📦 Dados que foram enviados:', variables);
      console.error('🔍 Detalhes do erro:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      
      if (error.response?.status === 400) {
        toast.error('Dados inválidos. Verifique as informações.');
      } else if (error.response?.status === 401) {
        toast.error('Sessão expirada. Faça login novamente.');
      } else if (error.response?.status === 403) {
        toast.error('Você não tem permissão para registrar presença.');
      } else if (error.response?.status === 404) {
        toast.error('Chamada não encontrada ou já encerrada.');
      } else if (error.response?.status === 409) {
        toast.error('Presença já registrada para esta chamada.');
      } else {
        toast.error(error.response?.data?.detail || 'Erro ao registrar presença');
      }
    },
  });

  return {
    createPresenca,
    isCreating
  }
}

export default usePresencas;
