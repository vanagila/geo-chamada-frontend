import { z } from 'zod';

export const disciplineSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100),
  codigo: z.string()
    .min(3, 'Código deve ter pelo menos 3 caracteres')
    .max(20),
  descricao: z.string()
    .max(500)
    .optional(),
  carga_horaria: z.coerce.number()
    .min(30, 'Mínimo 30 horas')
    .max(240, 'Máximo 240 horas')
});

export type DisciplinaFormData = z.infer<typeof disciplineSchema>;
