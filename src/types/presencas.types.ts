import type { Coordenadas } from './geo.types.ts';
import type { DisciplinaResumo } from './discipline.types.ts';

export enum PresencaStatus {
  PRESENTE = "PRESENTE",
  AUSENTE = "AUSENTE",
  ABONADA = "ABONADA",
}

export interface RegistrarPresencaData {
  chamada_id: number;
  coordenadas: Coordenadas;
}

export interface PresencaResponse {
  id: number;
  aluno_id: number;
  chamada_id: number;
  distancia_calculada: number | null;
  data_registro: string;
  status: PresencaStatus;
  dentro_raio: boolean;
}

export interface AlunoRelatorio {
  id: number;
  nome: string;
  email: string;
  matricula: string | null;
}

export interface PresencaRelatorioResponse {
  id: number;
  aluno: AlunoRelatorio;
  chamada_id: number;
  distancia_calculada: number | null;
  data_registro: string;
  status: PresencaStatus;
  dentro_raio: boolean;
}

export interface AbonoRequest {
  presenca_id: number;
  motivo: string;
}

export interface AbonoDetailResponse {
  id: number;
  aluno_id: number;
  chamada_id: number;
  status: string;
  distancia_calculada: number | null;
  data_registro: string;
  abonado_por_id: number;
  data_abono: string;
  motivo_abono: string;
}

export interface AbonoResponse {
  message: string;
  presenca: AbonoDetailResponse;
}

export interface EstatisticaResponse {
  total: number;
  presentes: number;
  ausentes: number;
  abonadas: number;
}

export interface HistoricoAlunoDisciplinaResponse {
  disciplina: DisciplinaResumo;
  presencas: PresencaResponse[];
  estatisticas: EstatisticaResponse;
}

export interface RelatorioChamadaResponse {
  chamada: {
    id: number;
    data_abertura: string;
    data_encerramento: string | null;
    raio: number;
    status: string;
  };
  presencas: PresencaRelatorioResponse[];
  estatisticas: EstatisticaResponse;
}
