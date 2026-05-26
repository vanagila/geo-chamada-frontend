import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightElement, id, ...props }, ref) => {
    return (
      <div className='flex flex-col gap-1.5'>
        <label className='text-sm font-semibold text-text-main' htmlFor={id}>
          {label}
        </label>

        <div className='relative flex items-center'>
          {icon && (
            <div className='absolute left-3 text-text-muted'>
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            className={`w-full py-3 rounded-lg border bg-input-bg text-text-main focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all
              ${icon ? 'pl-10' : 'pl-4'}
              ${rightElement ? 'pr-12' : 'pr-4'}
              ${error
                ? 'border-error focus:border-error focus:ring-error/20' 
                : 'border-border focus:border-brand'
              }
            `}
            {...props}
          />

          {rightElement && (
            <div className='absolute right-3'>
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className='text-xs font-medium text-error mt-0.5'>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
