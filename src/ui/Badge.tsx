import type { ReactNode } from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'default' | 'brand';

interface BadgeProps {
  children: ReacNode;
  variant?: BadgeVariant;
}

const Badge = ({ children, variant = 'default' }: BadgeProps) => {
  const variantClasses = {
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    error: 'bg-error/10 text-error border-error/20',
    brand: 'bg-brand/10 text-brand border-brand/20',
    default: 'bg-input-bg text-text-muted border-border',
  };

  return (
    <span className={`inline-flex items-center justify-center w-20 py-1 text-[10px] font-bold uppercase rounded-md border ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}

export default Badge;
