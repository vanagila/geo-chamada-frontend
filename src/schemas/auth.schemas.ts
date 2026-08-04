import { z } from 'zod';

export const registerSchema = z.object({
  nome: z.string()
    .min(1, 'Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
  tipo: z.enum(['ALUNO', 'PROFESSOR', 'ADMIN',]),
  matricula: z.string().optional(),
  registro_professor: z.string().optional(),
  senha: z.string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmarSenha: z.string()
    .min(1, 'Confirmação de senha é obrigatória'),
})

.refine((data) => data.senha === data.confirmarSenha, {
  message: 'As senhas não coincidem',
  path: ['confirmarSenha'],
})

.refine((data) => {
  if (data.tipo === 'ALUNO') {
    return !!data.matricula && data.matricula.trim().length > 0;
  }
  return true;
}, {
  message: 'Matrícula é obrigatória para alunos',
  path: ['matricula'],
})

.refine((data) => {
  if (data.tipo === 'PROFESSOR') {
    return !!data.registro_professor && data.registro_professor.trim().length > 0;
  }
  return true;
}, {
  message: 'Registro é obrigatório para professores',
  path: ['registro_professor'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
