import { Eye, EyeOff, Lock, KeyRound, UserPlus, Mail, User, GraduationCap, Presentation, Briefcase, UserCheck, Hash} from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button'
import RadioCardGroup from '../ui/RadioCardGroup'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext';
import config from '../config'
import { registerSchema, type RegisterFormData } from '../schemas/auth.schemas';

const typeOptions: RadioOptions[] = [
  { label: 'Aluno', value: 'ALUNO', icon: <GraduationCap size={20} /> },
  { label: 'Professor', value: 'PROFESSOR', icon: <Presentation size={20} /> }
]

const Signup = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [sucesso, setSucesso] = useState<boolean>(false);
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
    <div className='bg-app-bg min-h-screen flex items-center justify-center p-4 font-sans'>
      <div className='w-full max-w-md my-8'>
        <div className='bg-card rounded-lg shadow-xl overflow-hidden border border-border'>
          <div className='p-8'>
            <div className='flex flex-col items-center mb-6'>
              <div className='bg-brand/10 p-3 rounded-xl mb-4 text-brand flex items-center justify-center'>
                <UserPlus size={36}/>
              </div>
              <h1 className='text-3xl font-bold text-text-main tracking-tight'>
                Criar Conta
              </h1>
              <p className='text-text-muted mt-2 text-sm'>
                Cadastre-se no GeoChamada
              </p>
            </div>

            {sucesso && (
              <div className='mb-4 p-3 bg-success-light border border-success/20 text-success text-sm rounded-lg text-center font-medium'>
                Cadastro realizado com sucesso! Redirecionando...
              </div>
            )}
            {errors.root && (
              <div className='mb-4 p-3 bg-error-light border border-error/20 text-error text-sm rounded-lg text-center font-medium'>
                {errors.root.message}
              </div>
            )}

            <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
              <Input
                id='nome'
                label='Nome Completo'
                type='text'
                placeholder='Seu nome completo'
                icon={<User size={20}/>}
                error={errors.nome?.message}
                disabled={isSubmitting || sucesso}
                {...register('nome')}
              />

              <Input
                id='email'
                label='E-mail'
                type='email'
                placeholder='exemplo@geochamada.com'
                icon={<Mail size={20}/>}
                error={errors.email?.message}
                disabled={isSubmitting || sucesso}
                {...register('email')}
              />

              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-semibold text-text-main'>
                  Tipo de Usuário
                </label>
                <RadioCardGroup
                  options={typeOptions}
                  selectedValue={selectedType}
                  registration={register('tipo')}
                  disabled={isSubmitting || sucesso}
                />
              </div>

              {selectedType === 'ALUNO' && (
                <div className='flex flex-col gap-1.5 animate-fadeIn'>
                  <label className='text-sm font-semibold text-text-main' htmlFor='matricula'>
                    Matrícula
                  </label>
                  <div className='relative flex items-center'>
                    <Hash className='absolute left-3 text-text-muted' size={20}/>
                    <input
                      {...register('matricula')}
                      className='w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input-bg text-text-main focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all'
                      id='matricula'
                      type='text'
                      placeholder='Número da matrícula'
                      disabled={isSubmitting || sucesso}
                    />
                  </div>
                  {errors.matricula && <p className='text-xs font-medium text-error mt-0.5'>{errors.matricula.message}</p>}
                </div>
              )}

              {selectedType === 'PROFESSOR' && (
                <div className='flex flex-col gap-1.5 animate-fadeIn'>
                  <label className='text-sm font-semibold text-text-main' htmlFor='registro_professor'>
                    Registro
                  </label>
                  <div className='relative flex items-center'>
                    <Hash className='absolute left-3 text-text-muted' size={20}/>
                    <input
                      {...register('registro_professor')}
                      className='w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input-bg text-text-main focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all'
                      id='registro_professor'
                      type='text'
                      placeholder='Identificação do professor'
                      disabled={isSubmitting || sucesso}
                    />
                  </div>
                  {errors.registro_professor && <p className='text-xs font-medium text-error mt-0.5'>{errors.registro_professor.message}</p>}
                </div>
              )}

              <Input
                id='senha'
                label='Senha'
                type={showPassword ? 'text' : 'password'}
                placeholder='Crie uma senha forte'
                icon={<Lock size={20} />}
                error={errors.senha?.message}
                disabled={isSubmitting || sucesso}
                rightElement={
                  <button
                    type='button'
                    className='text-text-muted hover:text-text-main cursor-pointer flex items-center'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
                {...register('senha')}
              />

              <Input
                id='confirmarSenha'
                label='Confirmar Senha'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Repita a senha'
                icon={<KeyRound size={20} />}
                error={errors.confirmarSenha?.message}
                disabled={isSubmitting || sucesso}
                rightElement={
                  <button
                    type='button'
                    className='text-text-muted hover:text-text-main cursor-pointer flex items-center'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
                {...register('confirmarSenha')}
              />

              <Button
                type='submit'
                isLoading={isSubmitting}
                loadingText='Cadastrando...'
                icon={<UserCheck size={20}/>}
              >
                Criar conta
              </Button>
            </form>

            <div className='mt-6 pt-6 border-t border-border dark:border-border-dark text-center'>
              <p className='text-sm text-text-muted'>
                Já possui uma conta?{' '}
                <button
                  onClick={() => navigate('/login')} 
                  className='text-brand-light font-bold hover:underline bg-transparent border-none cursor-pointer'
                  disabled={isSubmitting || sucesso}
                >
                  Faça login
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className='mt-6 text-center'>
          <p className='text-text-muted text-xs uppercase tracking-widest font-medium'>
            © 2026 GeoChamada v1
          </p>
        </div>

      </div>
    </div>
  )
}

export default Signup;
