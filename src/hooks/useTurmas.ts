import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import turmaService from '../services/turmas';
import type { TurmaCreate, TurmaUpdate } from '../types/turmas.types'

const TURMAS_QUERY_KEY = ['turmas']

const useTurmas = () => {
  const queryClient = useQueryClient();

  const { data: turmas = [], isLoading, error, refetch } = useQuery({
    queryKey: TURMAS_QUERY_KEY,
    queryFn: () => turmaService.list(),
    staleTime: 1000 * 60 * 5
  });

  const { mutate: createTurma, isPending: isCreating } = useMutation({
    mutationFn: (data: TurmaCreate) => turmaService.create(data),
    onSuccess: () => {
      toast.success('Turma criada com sucesso');
      queryClient.invalidateQueries({ queryKey: TURMAS_QUERY_KEY });
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
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Erro ao adicionar professor à turma');
    },
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
    isAddingProfessor
  };
};

export default useTurmas;
