import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import turmaService from '../services/turmas';
import useAuth from './useAuth';
import type { TurmaCreate, TurmaUpdate } from '../types/turmas.types';

const TURMAS_QUERY_KEY = ['turmas']

const useTurmas = () => {
  const queryClient = useQueryClient();

  const { user, loading: authLoading } = useAuth();
  const userId = user?.id;
  const userTipo = user?.tipo;

  const { data: turmas = [], isLoading, error, refetch } = useQuery({
    queryKey: TURMAS_QUERY_KEY,
    queryFn: () => turmaService.list(),
    staleTime: 1000 * 60 * 5,
    enabled: userTipo === 'ADMIN' && !authLoading
  });

  const { mutate: createTurma, isPending: isCreating } = useMutation({
    mutationFn: (data: TurmaCreate) => turmaService.create(data),
    onSuccess: () => {
      toast.success('Turma criada com sucesso');
      queryClient.invalidateQueries({ queryKey: TURMAS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [TURMAS_QUERY_KEY, 'professor'] });
      queryClient.invalidateQueries({ queryKey: [TURMAS_QUERY_KEY, 'aluno'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Erro ao criar turma');
    },
  });

  const { mutate: updateTurma, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TurmaUpdate }) => 
      turmaService.update(id, data),
    onSuccess: () => {
      toast.success('Turma atualizada com sucesso');
      queryClient.invalidateQueries({ queryKey: TURMAS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [TURMAS_QUERY_KEY, 'professor'] });
      queryClient.invalidateQueries({ queryKey: [TURMAS_QUERY_KEY, 'aluno'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data.detail || 'Erro ao atualizar turma');
    },
  });

  const { mutate: deleteTurma, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => turmaService.delete(id),
    onSuccess: () => {
      toast.success('Turma deletada com sucesso');
      queryClient.invalidateQueries({ queryKey: TURMAS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [TURMAS_QUERY_KEY, 'professor'] });
      queryClient.invalidateQueries({ queryKey: [TURMAS_QUERY_KEY, 'aluno'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data.detail || 'Erro ao deletar turma');
    },
  });

  const { mutate: addProfessor, isPending: isAddingProfessor } = useMutation({
    mutationFn: ({ turmaId, professorId }: { turmaId: number; professorId: number }) =>
      turmaService.addProfessor(turmaId, professorId),
    onSuccess: () => {
      toast.success('Professor adicionado com sucesso');
      queryClient.invalidateQueries({ queryKey: TURMAS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['professores'] });
      queryClient.invalidateQueries({ queryKey: [TURMAS_QUERY_KEY, 'professor'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Erro ao adicionar professor à turma');
    },
  });

  const { mutate: addAluno, isPending: isAddingAluno } = useMutation({
    mutationFn: ({ turmaId, alunoId }: { turmaId: number; alunoId: number }) =>
      turmaService.addAluno(turmaId, alunoId),
    onSuccess: () => {
      toast.success('Aluno adicionado com sucesso');
      queryClient.invalidateQueries({ queryKey: TURMAS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['alunos'] });
      queryClient.invalidateQueries({ queryKey: [TURMAS_QUERY_KEY, 'aluno'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Erro ao adicionar aluno à turma');
    },
  });

  const { data: turmasProfessor = [], isLoading: isLoadingTurmas, error: errorTurma, refetch: refetchTurma } = useQuery({
    queryKey: [TURMAS_QUERY_KEY, 'professor', userId],
    queryFn: async () => {
      if (!userId) {
        console.warn('userId não disponível ainda');
        return [];
      }
      const result = await turmaService.getByProfessor(userId);
      return result;
    },
    enabled: userTipo === 'PROFESSOR' && !!userId && !authLoading,
    staleTime: 1000 * 60 * 5
  });

  const { data: turmasAluno = [], isLoading: isLoadingTurmasAluno, error: errorTurmaAluno, refetch: refetchTurmaAluno } = useQuery({
    queryKey: [TURMAS_QUERY_KEY, 'aluno', userId],
    queryFn: async () => {
      if (!userId) {
        console.warn('userId não disponível ainda');
        return [];
      }
      const result = await turmaService.getByAluno(userId);
      return result;
    },
    enabled: userTipo === 'ALUNO' && !!userId && !authLoading,
    staleTime: 1000 * 60 * 5
  });

  return {
    turmas,
    isLoading,
    error,
    refetch,
    createTurma,
    isCreating,
    updateTurma,
    isUpdating,
    deleteTurma,
    isDeleting,
    addProfessor,
    isAddingProfessor,
    addAluno,
    isAddingAluno,
    turmasProfessor,
    isLoadingTurmas: isLoadingTurmas || authLoading,
    errorTurma,
    refetchTurma,
    turmasAluno,
    isLoadingTurmasAluno: isLoadingTurmasAluno || authLoading,
    errorTurmaAluno,
    refetchTurmaAluno
  };
};

export default useTurmas;
