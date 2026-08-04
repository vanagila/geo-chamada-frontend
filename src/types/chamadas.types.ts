import type { Coordenadas } from './geo.types'
import type { ProfessorSimplificado } from './user.types'
import type { Turma } from './turmas.types'

export type ChamadaStatus = "ABERTA" | "ENCERRADA";

export interface AbrirChamadaData {
  turma_id: number;
  raio: number;
  coordenadas: Coordenadas 
}

export interface Chamada {
  id: number;
  turma_id: number;
  turma?: Turma;
  professor_id: number;
  professor?: ProfessorSimplificado;
  coordenadas_professor: Coordenadas;
  raio: number;
  data_abertura: string;
  data_encerramento: string | null;
  status: ChamadaStatus;
  created_at?: string;
  updated_at?: string
}

export interface ChamadaResumida {
  id: number;
  turma_id: number;
  turma_codigo?: string;
  turma_disciplina?: string;
  data_abertura: string;
  status: ChamadaStatus;
  raio: number;
}

export interface AlunoRelatorio {
  id: number;
  nome: string;
  email: string;
  matricula?: string;
}

export interface PresencaRelatorio {
  id: number;
  aluno: AlunoRelatorio;
  chamada_id: number;
  distancia_calculada: number | null;
  data_registro: string;
  status: string;
  dentro_raio: boolean;
}

export interface RelatorioChamada {
  chamada: {
    id: number;
    data_abertura: string;
    data_encerramento: string | null;
    raio: number;
    status: ChamadaStatus;
  };
  presencas: PresencaRelatorio[];
  estatisticas: {
    total: number;
    presentes: number;
    ausentes: number;
    abonadas: number;
  };
}
