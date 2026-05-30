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

  return {
    disciplines,
    isLoading,
    error,
    refetch,
  };
};

export default useDisciplines;
