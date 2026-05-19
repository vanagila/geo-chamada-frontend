export interface RegisterData {
  nome: string;
  email: string;
  tipo: 'ALUNO' | 'PROFESSOR' | 'ADMIN';
  matricula: string;
  registro_professor: string;
  senha: string;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  matricula: string;
  registro_professor: string;
  ativo: boolean;
  data_cadastro: string;
  ultimo_acesso: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
}
