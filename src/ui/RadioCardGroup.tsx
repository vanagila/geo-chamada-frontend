import { ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface RadioOption {
  label: string;
  value: string;
  icon: ReactNode;
}

interface ReadioCardGroupProps {
  options: RadioOption[];
  selectedValue: string;
  registration: UseFormRegisterReturn;
  disabled?: boolean;
}

export const RadioCardGroup = ({ options, selectedValue, registration, disabled }: ReadioCardGroupProps) => {
  return (
    <div className='grid grid-cols-2 gap-2'>
      {options.map((option) => {
        const isSelected = selectedValue === option.value;

        return (
          <label
            key={option.value}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
              isSelected
                ? 'border-brand bg-brand/5 text-brand font-semibold'
                : 'border-border text-text-muted hover:bg-input-bg'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <input
              type='radio'
              value={option.value}
              className='sr-only'
              disabled={disabled}
              {...registration}
            />
            <div>{option.icon}</div>
            <span className='text-xs'>{option.label}</span>
          </label>
        );
      })}
    </div>
  )
}
