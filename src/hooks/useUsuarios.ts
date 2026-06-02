import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import usuarioService from '../services/usuarios';

const PROFESSORES_QUERY_KEY = ['professores']
const ALUNOS_QUERY_KEY = ['alunos'];

const useUsuarios = () => {
  const queryClient = useQueryClient();

  const { data: professores = [], isLoading: loadingProfessores, error, refetch } = useQuery({
    queryKey: PROFESSORES_QUERY_KEY,
    queryFn: () => usuarioService.listProfessor(),
    staleTime: 1000 * 60 * 5
  });

  const { data: alunos = [], isLoading: loadingAlunos } = useQuery({
    queryKey: ALUNOS_QUERY_KEY,
    queryFn: () => usuarioService.listAluno(),
    staleTime: 1000 * 60 * 5
  });

  return {
    professores,
    loadingProfessores,
    error,
    refetch,
    alunos,
    loadingAlunos
  };
}

export default useUsuarios;
