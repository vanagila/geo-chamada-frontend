export interface RegisterData {
  nome: string;
  email: string;
  tipo: 'ALUNO' | 'PROFESSOR' | 'ADMIN';
  matricula?: string | null;
  registro_professor?: string | null;
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

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}
