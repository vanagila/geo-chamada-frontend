export interface DisciplinaSimplificada {
  id: number;
  nome: string;
  codigo: string;
  carga_horaria: number;
}

export interface UsuarioSimplificado {
  id: number;
  nome: string;
  email: string;
  tipo: 'ALUNO' | 'PROFESSOR' | 'ADMIN';
}

export interface Turma {
  id: number;
  codigo: string;
  disciplina_id: number;
  disciplina?: DisciplinaSimplificada;
  disciplina_nome?: string;
  semestre: string;
  ano: number;
  horario: string;        // formato: "08:00:00"
  data_inicio: string;    // formato ISO: "2024-02-01"
  data_fim: string;       // formato ISO: "2024-06-30"
  sala?: string;
  professores?: UsuarioSimplificado[];
  alunos?: UsuarioSimplificado[];
  created_at?: string;
  updated_at?: string;
}

export interface TurmaCreate {
  codigo: string;
  disciplina_id: number;
  semestre: string;
  ano: number;
  horario: string;
  data_inicio: string;
  data_fim: string;
  sala?: string;
}

export interface TurmaUpdate {
  codigo?: string;
  disciplina_id?: number;
  semestre?: string;
  ano?: number;
  horario?: string;
  data_inicio?: string;
  data_fim?: string;
  sala?: string;
}

export interface TurmaResponse extends Turma {
  professores_count?: number;
  alunos_count?: number;
}

export interface TurmaFilters {
  semestre?: string;
  ano?: number;
  disciplina_id?: number;
  professor_id?: number;
  aluno_id?: number;
}
