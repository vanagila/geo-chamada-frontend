import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import disciplineService from '../services/discipline';
import type { DisciplinaCreate, DisciplinaUpdate } from '../types/discipline.types';

const DISCIPLINES_QUERY_KEY = ['disciplines']

const useDisciplines = () => {
  const queryClient = useQueryClient();

  const { data: disciplines = [], isLoading, error, refetch } = useQuery({
    queryKey: DISCIPLINES_QUERY_KEY,
    queryFn: () => disciplineService.list(),
    staleTime: 1000 * 60 * 5
  });

  const { mutate: createDiscipline, isPending: isCreating } = useMutation({
    mutationFn: (data: DisciplinaCreate) => disciplineService.create(data),
    onSuccess: () => {
      toast.success('Disciplina criada com sucesso');
      queryClient.invalidateQueries({ queryKey: DISCIPLINES_QUERY_KEY });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.details || 'Erro ao criar disciplina');
    },
  });

  return {
    disciplines,
    isLoading,
    error,
    refetch,
    createDiscipline,
    isCreating
  };
};

export default useDisciplines;
