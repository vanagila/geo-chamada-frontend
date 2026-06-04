import type { Coordenadas } from './geo.types'
import type { ProfessorSimplificado } from './user.types'

export enum ChamadaStatus {
  ABERTA = 'ABERTA',
  FECHADA = 'FECHADA'
}

export interface AbrirChamadaData {
  turma_id: number;
  raio: number;
  coordernadas: Coordenadas 
}

export interface Chamada {
  id: number;
  turma_id: number;
  turma?: TurmaSimplificada;
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

export interface RelatorioChamada {
  chamada: {
    id: number;
    data_abertura: string;
    data_encerramento: string | null;
    raio: number;
    status: ChamadaStatus;
  },
  presencas: {
    id: number;
    aluno_id: number;
    chamada_id: number;
    distancia_calculada: number;
    data_registro: string;
    status: string;
    dentro_raio: boolean;
  },
  estatisticas: {
    total: number;
    presentes: number;
    ausentes: number;
    abonadas: number;
  }
}
