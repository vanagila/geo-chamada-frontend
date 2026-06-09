import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import chamadaService from '../services/chamadas';
import useAuth from '../hooks/useAuth.ts';
import type { AbrirChamadaData } from '../types/chamadas.types';

const CHAMADAS_QUERY_KEY = ['chamadas']

const useChamadas = () => {
  const queryClient = useQueryClient();
  
  const { user } = useAuth();
  const userId = user?.id;
  const userTipo = user?.tipo;

  const { data: allChamadasProfessor = [], isLoading: loadingAllChamadasProfessor, refetch: refetchAllChamadasProfessor } = useQuery({
    queryKey: [...CHAMADAS_QUERY_KEY, 'all-chamadas-professor', userId],
    queryFn: () => chamadaService.listByProfessor(userId!), 
    enabled: userTipo === 'PROFESSOR' && !!userId
  });

  const chamadasOrdenadas = useMemo(() => {
    return [...allChamadasProfessor].sort((a, b) => 
      new Date(b.data_abertura).getTime() - new Date(a.data_abertura).getTime()
    );
  }, [allChamadasProfessor]);

  const { data: chamadasAtivas = [], isLoading: loadingAtivas, refetch: refetchAtivas } = useQuery({
    queryKey: [...CHAMADAS_QUERY_KEY, 'ativas', userId],
    queryFn: () => chamadaService.listAtivasByProfessor(userId!),
    enabled: userTipo === 'PROFESSOR' && !!userId,
    refetchInterval: userTipo === 'PROFESSOR' ? 30000 : false
  });

  const chamadasAtivasPorTurma = chamadasAtivas.reduce((acc, chamada) => {
    acc[chamada.turma_id] = chamada;
    return acc;
  }, {} as Record<number, Chamada>);

  const { data: chamadaAtivaAluno = null, isLoading: loadingAtivaAluno, refetch: refetchAtivaAluno } = useQuery({
    queryKey: [...CHAMADAS_QUERY_KEY, 'ativa-aluno'],
    queryFn: () => chamadaService.getAtivaByAluno(),
    enabled: userTipo === 'ALUNO' && !!userId,
    refetchInterval: userTipo === 'ALUNO' ? 30000 : false
  });

  const { mutate: createChamada, isPending: isCreating } = useMutation({
    mutationFn: (data: AbrirChamadaData) => chamadaService.create(data),
    onSuccess: () => {
      toast.success('Chamada aberta com sucesso');
      queryClient.invalidateQueries({ queryKey: CHAMADAS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...CHAMADAS_QUERY_KEY, 'ativas', userId] });
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
      queryClient.invalidateQueries({ queryKey: [...CHAMADAS_QUERY_KEY, 'ativas', userId] });
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
    chamadasAtivasPorTurma,
    allChamadasProfessor: chamadasOrdenadas,
    loadingAllChamadasProfessor,
    refetchAllChamadasProfessor,
    chamadaAtivaAluno,
    loadingAtivaAluno,
    refetchAtivaAluno
  };
};

export default useChamadas;
