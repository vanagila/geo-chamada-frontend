import { useQuery } from '@tanstack/react-query';
import chamadaService from '../services/chamadas';
import type { RelatorioChamada } from '../types/chamadas.types';

const useRelatorioChamada = (chamadaId?: number) => {
  const { data: relatorio = null, isLoading, refetch, error } = useQuery<RelatorioChamada>({
    queryKey: ['relatorio-chamada', chamadaId],
    queryFn: async () => {
      const response = await chamadaService.relatorioChamada(chamadaId!);
      return response;
    },
    enabled: !!chamadaId && chamadaId > 0,
  });

  return { relatorio, isLoading, refetch, error };
};

export default useRelatorioChamada;
