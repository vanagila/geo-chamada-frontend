import { z } from 'zod';

const baseTurmaSchema = z.object({
  codigo: z.string()
    .min(1, 'Código é obrigatório')
    .min(3, 'Código deve ter pelo menos 3 caracteres')
    .max(20, 'Código deve ter no máximo 20 caracteres'),
  disciplina_id: z.number()
    .min(1, 'Selecione uma disciplina'),
  semestre: z.string()
    .min(1, 'Semestre é obrigatório')
    .regex(/^\d{4}\.\d$/, 'Formato inválido. Use: 2024.1, 2024.2, etc.'),
  ano: z.number()
    .min(2000, 'Ano deve ser maior que 2000')
    .max(2100, 'Ano deve ser menor que 2100'),
  horario: z.string()
    .min(1, 'Horário é obrigatório')
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Formato inválido. Use: HH:MM:SS (ex: 08:00:00)'),
  data_inicio: z.string()
    .min(1, 'Data de início é obrigatória')
    .refine((date) => !isNaN(Date.parse(date)), 'Data inválida'),
  data_fim: z.string()
    .min(1, 'Data de fim é obrigatória')
    .refine((date) => !isNaN(Date.parse(date)), 'Data inválida'),
});

const validarDatas = (data: { data_inicio?: string; data_fim?: string }) => {
  if (data.data_inicio && data.data_fim) {
    return new Date(data.data_fim) > new Date(data.data_inicio);
  }
  return true;
};

export const turmaSchema = baseTurmaSchema.refine(validarDatas, {
  message: 'Data de fim deve ser posterior à data de início',
  path: ['data_fim'],
});

export type TurmaFormData = z.infer<typeof turmaSchema>;

export const turmaUpdateSchema = baseTurmaSchema.partial().refine(validarDatas, {
  message: 'Data de fim deve ser posterior à data de início',
  path: ['data_fim'],
});

export const turmaFiltersSchema = z.object({
  semestre: z.string().optional(),
  ano: z.number().optional(),
  disciplina_id: z.number().optional(),
});

const assignProfessorSchema = z.object({
  professor_id: z.number().min(1, 'Por favor, selecione um professor')
});

export type AssignProfessorFormData = z.infer<typeof assignProfessorSchema>;
