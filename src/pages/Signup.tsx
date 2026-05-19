import { Eye, EyeOff, Lock, KeyRound, UserPlus, Mail, User, GraduationCap, Presentation, Briefcase, UserCheck, Hash} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext';
import config from '../config'
import { registerSchema, type RegisterFormData } from '../schemas/auth.schemas';

export const Signup = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [sucesso, setSucesso] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const {
    register, watch, handleSubmit, formState: { errors, isSubmitting }, setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: '',
      email: '',
      tipo: 'ALUNO',
      matricula: '',
      registro_professor: '',
      senha: '',
      confirmarSenha: ''
    },
  });

  const selectedType = watch('tipo');

  const onSubmit = async (data: RegisterFormData) => {
    const payload = {
      nome: data.nome,
      email: data.email,
      tipo: data.tipo,
      matricula: data.tipo === 'ALUNO' ? data.matricula : null,
      registro_professor: data.tipo === 'PROFESSOR' ? data.registro_professor : null,
      senha: data.senha,
    };

    const result = await registerUser(payload);

    if (result.success) {
      setSucesso(true);
      setTimeout(() => {
        navigate('/login');
        console.log('Cadastro realizado com sucesso')
      }, 2000);
    } else {
      setError('root', {
        type: 'manual',
        message: result.error || 'Erro ao realizar cadastro',
      });
    }
  };

  return (
    <div className="bg-app-bg min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md my-8">
        <div className="bg-card rounded-lg shadow-xl overflow-hidden border border-border">
          <div className="p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-brand/10 p-3 rounded-xl mb-4 text-brand flex items-center justify-center">
                <UserPlus size={36}/>
              </div>
              <h1 className="text-3xl font-bold text-text-main tracking-tight">
                Criar Conta
              </h1>
              <p className="text-text-muted mt-2 text-sm">
                Cadastre-se no GeoChamada
              </p>
            </div>

            {sucesso && (
              <div className="mb-4 p-3 bg-success-light border border-success/20 text-success text-sm rounded-lg text-center font-medium">
                Cadastro realizado com sucesso! Redirecionando...
              </div>
            )}

            {errors.root && (
              <div className="mb-4 p-3 bg-error-light border border-success/20 text-error text-sm rounded-lg text-center font-medium">
                {errors.root.message}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-main" htmlFor="nome">
                  Nome Completo
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 text-text-muted" size={20}/>
                  <input
                    {...register('nome')}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input-bg text-text-main focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                    id="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    disabled={isSubmitting || sucesso}
                  />
                </div>
                {errors.nome && <p className="text-xs font-medium text-error mt-0.5">{errors.nome.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-main" htmlFor="email">
                  E-mail
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 text-text-muted" size={20}/>
                  <input
                    {...register('email')}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input-bg text-text-main focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                    id="email"
                    type="email"
                    placeholder="exemplo@geochamada.com"
                    disabled={isSubmitting || sucesso}
                  />
                </div>
                {errors.email && <p className="text-xs font-medium text-error mt-0.5">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-main">
                  Tipo de Usuário
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className={`flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedType === 'ALUNO'
                      ? 'border-brand bg-brand/5 text-brand font-semibold'
                      : 'border-border text-text-muted hover:bg-input-bg'
                  }`}>
                    <input {...register('tipo')} type="radio" value="ALUNO" className="sr-only" disabled={isSubmitting || sucesso} />
                    <GraduationCap size={20}/>
                    <span className="text-sm">Aluno</span>
                  </label>
                  <label className={`flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedType === 'PROFESSOR'
                      ? 'border-brand bg-brand/5 text-brand font-semibold'
                      : 'border-border text-text-muted hover:bg-input-bg'
                  }`}>
                    <input {...register('tipo')} type="radio" value="PROFESSOR" className="sr-only" disabled={isSubmitting || sucesso} />
                    <Presentation size={20}/>
                    <span className="text-sm">Professor</span>
                  </label>
                </div>
              </div>

              {selectedType === 'ALUNO' && (
                <div className="flex flex-col gap-1.5 animate-fadeIn">
                  <label className="text-sm font-semibold text-text-main" htmlFor="matricula">
                    Matrícula
                  </label>
                  <div className="relative flex items-center">
                    <Hash className="absolute left-3 text-text-muted" size={20}/>
                    <input
                      {...register('matricula')}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input-bg text-text-main focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                      id="matricula"
                      type="text"
                      placeholder="Número da matrícula"
                      disabled={isSubmitting || sucesso}
                    />
                  </div>
                  {errors.matricula && <p className="text-xs font-medium text-error mt-0.5">{errors.matricula.message}</p>}
                </div>
              )}

              {selectedType === 'PROFESSOR' && (
                <div className="flex flex-col gap-1.5 animate-fadeIn">
                  <label className="text-sm font-semibold text-text-main" htmlFor="registro_professor">
                    Registro
                  </label>
                  <div className="relative flex items-center">
                    <Hash className="absolute left-3 text-text-muted" size={20}/>
                    <input
                      {...register('registro_professor')}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input-bg text-text-main focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                      id="registro_professor"
                      type="text"
                      placeholder="Identificação do professor"
                      disabled={isSubmitting || sucesso}
                    />
                  </div>
                  {errors.registro_professor && <p className="text-xs font-medium text-error mt-0.5">{errors.registro_professor.message}</p>}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-main" htmlFor="senha">
                  Senha
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 text-text-muted" size={20}/>
                  <input
                    {...register('senha')}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-border bg-input-bg text-text-main focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                    id="senha"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Crie uma senha forte"
                    disabled={isSubmitting || sucesso}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                  </button>
                </div>
                {errors.senha && <p className="text-xs font-medium text-error mt-0.5">{errors.senha.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-main" htmlFor="confirmarSenha">
                  Confirmar Senha
                </label>
                <div className="relative flex items-center">
                  <KeyRound className="absolute left-3 text-text-muted" size={20}/>
                  <input
                    {...register('confirmarSenha')}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-border bg-input-bg text-text-main focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                    id="confirmarSenha"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Repita a senha"
                    disabled={isSubmitting || sucesso}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                  </button>
                </div>
                {errors.confirmarSenha && <p className="text-xs font-medium text-error mt-0.5">{errors.confirmarSenha.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || sucesso}
                className="w-full bg-brand hover:bg-brand-light text-white font-bold py-3.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Cadastrando...' : 'Criar minha conta'}</span>
                {!isSubmitting && <UserCheck/>}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border dark:border-border-dark text-center">
              <p className="text-sm text-text-muted">
                Já possui uma conta?{' '}
                <button 
                  onClick={() => navigate('/login')} 
                  className="text-brand-light font-bold hover:underline bg-transparent border-none cursor-pointer"
                  disabled={isSubmitting || sucesso}
                >
                  Faça login
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-text-muted text-xs uppercase tracking-widest font-medium">
            © 2026 GeoChamada v1
          </p>
        </div>

      </div>
    </div>
  )
}
