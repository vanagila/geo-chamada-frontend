import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import classService from '../services/turmas';

const TURMAS_QUERY_KEY = ['turmas']

const useClasses = () => {
  const queryClient = useQueryClient();

  const { data: turmas = [], isLoading, error, refetch } = useQuery({
    queryKey: TURMAS_QUERY_KEY,
    queryFn: () => classService.list(),
    staleTime: 1000 * 60 * 5
  });

  return {
    turmas,
    isLoading,
    error,
    refetch
  };
};

export default useClasses;
