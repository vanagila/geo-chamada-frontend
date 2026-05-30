import { X, BookOpen } from 'lucide-react';
import Button from '../ui/Button'; 
import Input from '../ui/Input';

interface CreateDisciplineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDisciplineModal = ({ isOpen, onClose }: CreateDisciplineModal) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4 animate-in fade-in duration-200'>
      <div className='bg-card w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-border'>
        <div className='px-6 py-4 border-b border-border flex justify-between items-center bg-input-bg/50'>
          <h2 className='text-lg font-bold text-text-main'>Nova Disciplina</h2>
          <button
            onClick={onClose}
            className='p-1.5 hover:bg-border rounded-full transition-colors text-text-muted cursor-pointer'
          >
            <X size={20} />
          </button>
        </div>

        <form className='p-6 space-y-5' onSubmit={(e) => { e.preventDefault(); }}>
          <Input 
            id='nome'
            label='Nome da Disciplina'
            placeholder='Ex: Cálculo I'
            icon={<BookOpen size={20} />}
            required
          />

          <div className='grid grid-cols-2 gap-4'>
            <Input 
              id='codigo'
              label='Código'
              placeholder='Ex: MAT101'
              required
            />

            <Input
              id='cargaHoraria'
              type='number'
              label='Carga Horária'
              placeholder='60'
              rightElement={<span className='text-xs font-medium text-text-muted pr-3'>horas</span>}
              required
            />
          </div>

          <div className='space-y-1.5'>
            <label htmlFor='descricao' className='block text-sm font-semibold text-text-main'>
              Descrição
            </label>
            <textarea 
              id='descricao'
              className='w-full px-4 py-2.5 bg-input-bg border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm outline-none text-text-main resize-none' 
              placeholder='Descreva os objetivos e conteúdos da disciplina...' 
              rows={3}
            ></textarea>
          </div>

          <div className='flex items-center justify-end gap-3 pt-4 border-t border-border'>
            <button 
              type='button'
              onClick={onClose}
              className='px-6 py-2.5 rounded-lg font-bold text-sm text-text-muted hover:bg-input-bg transition-colors cursor-pointer'
            >
              Cancelar
            </button>
            <Button type='submit' className='px-6 py-2.5 w-auto shadow-lg hover:brightness-110'>
              Criar Disciplina
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDisciplineModal;
