export interface Disciplina {
  id: number;
  nome: string;
  codigo: string;
  descricao: string | null;
  carga_horaria: number;
  turmas_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DisciplinaCreate {
  nome: string;
  codigo: string;
  descricao?: string | null;
  carga_horaria: number;
}

export interface DisciplinaUpdate {
  nome?: string;
  codigo?: string;
  descricao?: string | null;
  carga_horaria?: number;
}

export interface DisciplinaResponse {
  id: number;
  nome: string;
  codigo: string;
  descricao: string | null;
  carga_horaria: number;
  turmas_count: number;
}

export interface DisciplinaFormData {
  nome: string;
  codigo: string;
  descricao: string;
  carga_horaria: number;
}
