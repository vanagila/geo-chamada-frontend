import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import chamadaService from '../services/chamadas';
import type { AbrirChamadaData } from '../types/chamadas.types'

const CHAMADAS_QUERY_KEY = ['chamadas']

const useChamadas = () => {
  const queryClient = useQueryClient();

  const { mutate: createChamada, isPending: isCreating } = useMutation({
    mutationFn: (data: AbrirChamadaData) => chamadaService.create(data),
    onSuccess: () => {
      toast.success('Chamada aberta com sucesso');
      queryClient.invalidateQueries({ queryKey: CHAMADAS_QUERY_KEY });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Erro ao abrir chamada');
    },
  });

  return {
    createChamada,
    isCreating
  };
};

export default useChamadas;
