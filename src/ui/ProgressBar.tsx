type ProgressVariant = 'success' | 'warning' | 'error' | 'brand';

interface ProgressBarProps {
  value: number;
  variant?: ProgressVariant;
  showLabel?: boolean;
}

const ProgressBar = ({ value, variant = 'brand', showLabel = true }: ProgressBarProps) => {
  const safeValue = Math.min(Math.max(value, 0), 100);

  const variantClasses = {
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    brand: 'bg-brand',
  };

  return (
    <div className='flex items-center gap-2'>
      <div className='w-full bg-border h-2 rounded-full max-w-[80px] overflow-hidden'>
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${variantClasses[variant]}`} 
          style={{ width: `${safeValue}%` }}
        />
      </div>
      {showLabel && (
        <span className='font-medium text-text-main'>
          {safeValue}%
        </span>
      )}
    </div>
  );
}

export default ProgressBar;
