import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import chamadaService from '../services/chamadas';
import type { AbrirChamadaData } from '../types/chamadas.types'

const CHAMADAS_QUERY_KEY = ['chamadas']

const useChamadas = (professorId?: number) => {
  const queryClient = useQueryClient();

  const { data: chamadasAtivas = [], isLoading: loadingAtivas, refetch: refetchAtivas } = useQuery({
    queryKey: [...CHAMADAS_QUERY_KEY, 'ativas', professorId],
    queryFn: () => chamadaService.listAtivasByProfessor(professorId!), 
    enabled: !!professorId,
    refetchInterval: 30000 
  });

  const chamadasAtivasPorTurma = chamadasAtivas.reduce((acc, chamada) => {
    acc[chamada.turma_id] = chamada;
    return acc;
  }, {} as Record<number, Chamada>);

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

  const { mutate: encerrarChamada, isPending: isEncerrando } = useMutation({
    mutationFn: (chamadaId: number) => chamadaService.encerrar(chamadaId),
    onSuccess: () => {
      toast.success('Chamada encerrada com sucesso!');
      queryClient.invalidateQueries({ queryKey: CHAMADAS_QUERY_KEY });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Erro ao encerrar chamada');
    },
  });

  return {
    createChamada,
    isCreating,
    encerrarChamada,
    isEncerrando,
    chamadasAtivas,
    loadingAtivas,
    refetchAtivas,
    chamadasAtivasPorTurma
  };
};

export default useChamadas;
