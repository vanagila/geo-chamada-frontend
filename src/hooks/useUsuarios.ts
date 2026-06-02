import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import usuarioService from '../services/usuarios';

const USUARIOS_QUERY_KEY = ['usuarios']

const useUsuarios = () => {
  const queryClient = useQueryClient();

  const { data: professores = [], isLoading: loadingProfessores, error, refetch } = useQuery({
    queryKey: USUARIOS_QUERY_KEY,
    queryFn: () => usuarioService.listProfessor(),
    staleTime: 1000 * 60 * 5
  });

  return {
    professores,
    loadingProfessores,
    error,
    refetch
  };
}

export default useUsuarios;
