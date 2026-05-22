import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
}

export const Button = ({children, isLoading, loadingText = 'Carregando...', icon, className = '', ...props}: ButtonProps) => {
  return (
    <button
      disabled={isLoading || props.disabled}
      className={`w-full bg-brand hover:bg-brand-light text-white font-bold py-3.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      <span>{isLoading ? loadingText : children}</span>
      {!isLoading && icon && <span className='flex items-center'>{icon}</span>}
    </button>
  );
}
