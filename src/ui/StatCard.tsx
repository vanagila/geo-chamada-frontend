import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trendValue?: string;
  trendText?: string;
  trendStatus?: 'positive' | 'negative' | 'neutral'
}

const StatCard = ({ title, value, icon, trendValue, trendText, trendStatus = 'neutral'}: StatCardProps) => {
  const trendColor = 
    trendStatus === 'positive' ? 'text-success' : trendStatus === 'negative' ? 'text-error' : 'text-text-muted';

  return (
    <div className='bg-card p-6 rounded-lg border border-border shadow-sm'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm font-medium text-text-muted'>{title}</p>
          <h3 className='text-2xl font-bold mt-1 text-text-main'>{value}</h3>
        </div>
        <div className='p-2 bg-brand/10 rounded-lg text-brand'>
          {icon}
        </div>
      </div>

      {(trendValue || trendText) && (
        <div className='mt-4 flex items-center gap-2'>
          {trendValue && <span className={`text-xs font-bold ${trendColor}`}>{trendValue}</span>}
          {trendText && <span className='text-xs text-text-muted'>{trendText}</span>}
        </div>
      )}
    </div>
  );
}

export default StatCard;
