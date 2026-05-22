import { MapPin, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button'
import { useAuth } from '../contexts/AuthContext';
import config from '../config';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, senha);

    if (result.success) {
      console.log('login com sucesso');
    } else {
      setError(result.error || 'Falha no login. Verifique suas credenciais.');
    }
    setLoading(false);
  };

  return (
    <div className='bg-app-bg min-h-screen flex items-center justify-center p-4 font-sans'>
      <div className='w-full max-w-md'>
        <div className='bg-card rounded-lg shadow-xl overflow-hidden border border-border'>
          <div className='p-8'>
            <div className='flex flex-col items-center mb-6'>
              <div className='bg-brand/10 p-3 rounded-xl mb-4 text-brand flex items-center justify-center'>
                <MapPin size={36}/>
              </div>
              <h1 className='text-3xl font-bold text-text-main tracking-tight'>
                Geo Chamada
              </h1>
              <p className='text-text-muted mt-2 text-sm'>
                Faça login no Geo Chamada
              </p>
            </div>

            {error && (
              <div className='mb-4 p-3 bg-error-light border border-error/20 text-error text-sm rounded-lg text-center font-medium'>
                {error}
              </div>
            )}

            <form className='space-y-5' onSubmit={handleSubmit}>
              <Input
                id='email'
                label='E-mail'
                type='email'
                placeholder='exemplo@geochamada.com'
                icon={<Mail size={20}/>}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />

              <Input
                id='senha'
                label='Senha'
                type={showPassword ? 'text' : 'password'}
                placeholder='Digite sua senha'
                icon={<Lock size={20} />}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                disabled={loading}
                rightElement={
                  <button
                    type='button'
                    className='text-text-muted hover:text-text-main cursor-pointer flex items-center'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />

              <Button
                type='submit'
                isLoading={loading}
                loadingText='Entrando...'
                icon={<LogIn size={20}/>}
              >
                Entrar
              </Button>
            </form>

            <div className='mt-8 pt-6 border-t border-border dark:border-border-dark text-center'>
              <p className='text-sm text-text-muted'>
                Não possui uma conta?{' '}
                <a className='text-brand-light font-bold hover:underline' href='#'>
                  Solicite acesso
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
