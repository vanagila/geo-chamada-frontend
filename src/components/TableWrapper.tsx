import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface TableWrapperProps {
  children: ReactNode;
  totalItems: number;
  isLoading: boolean;
}

const TableWrapper = ({ children, totalItems, isLoading }: TableWrapperProps) => {
  return (
    <div className='bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col'>
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          {children}
        </table>
      </div>

      {!isLoading && totalItems > 0 && (
        <div className='px-6 py-4 bg-input-bg/50 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border'>
          <p className='text-xs text-text-muted'>
            Mostrando <span className='font-bold text-text-main'>{totalItems}</span> registros
          </p>
          <div className='flex items-center gap-1'>
            <button className='p-1.5 hover:bg-border rounded-lg text-text-muted disabled:opacity-50 transition-colors' disabled>
              <ChevronLeft size={18} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-lg bg-brand text-white text-sm font-bold shadow-sm transition-all cursor-pointer'>
              1
            </button>
            <button className='p-1.5 hover:bg-border rounded-lg text-text-muted disabled:opacity-50 transition-colors' disabled>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableWrapper;
