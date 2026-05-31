import { AlertTriangle } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  isDeleting?: boolean;
}

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName, isDeleting }: ConfirmDeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200'>
      <div className='bg-card w-full max-w-sm rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-border'>
        <div className='p-6 text-center space-y-4 mt-2'>
          <div className='w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto'>
            <AlertTriangle size={32} />
          </div>
          <div>
            <h2 className='text-xl font-bold text-text-main'>Excluir Registro</h2>
            <p className='text-text-muted text-sm mt-2 leading-relaxed'>
              Tem certeza que deseja excluir {itemName ? <span className='font-bold text-text-main'>"{itemName}"</span> : 'este item'}? 
              <br/>Esta ação não poderá ser desfeita.
            </p>
          </div>
        </div>
        <div className='flex items-center justify-end gap-3 p-4 border-t border-border bg-input-bg/50'>
          <button 
            type='button'
            onClick={onClose}
            disabled={isDeleting}
            className='px-5 py-2.5 rounded-lg font-bold text-sm text-text-muted hover:bg-border transition-colors cursor-pointer'
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm} 
            disabled={isDeleting}
            className='px-5 py-2.5 rounded-lg font-bold text-sm text-white bg-error hover:bg-error/90 shadow-lg shadow-error/20 transition-all active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2'
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Excluindo...
              </>
            ) : (
              'Sim, excluir'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
