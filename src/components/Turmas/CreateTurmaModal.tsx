import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Album } from 'lucide-react';
import Button from '../../ui/Button'; 
import Input from '../../ui/Input';
import { turmaSchema } from '../../schemas/turma.schemas';
import type { TurmaCreate, Turma } from '../../types/turmas.types'
import useDisciplines from '../../hooks/useDiscipline'

interface CreateTurmaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TurmaCreate) => void;
  isSubmitting?: boolean;
  initialData?: Turma | null;
}

const getDefaultValues = (initialData?: Turma | null): TurmaCreate => ({
  codigo: initialData?.codigo || '',
  disciplina_id: initialData?.disciplina_id || 0,
  semestre: initialData?.semestre || '',
  ano: initialData?.ano || new Date().getFullYear(),
  horario: initialData?.horario || '08:00:00',
  data_inicio: initialData?.data_inicio || '',
  data_fim: initialData?.data_fim || '',
  sala: initialData?.sala || '',
});

const CreateTurmaModal = ({ isOpen, onClose, onSubmit, isSubmitting, initialData }: CreateTurmaModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<TurmaCreate>({
    resolver: zodResolver(turmaSchema),
    defaultValues: getDefaultValues(initialData)
  });

  const {
    disciplines
  } = useDisciplines();

  useEffect(() => {
    if (isOpen) {
      reset(getDefaultValues(initialData));
    }
  }, [isOpen, initialData, reset])

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4 animate-in fade-in duration-200'>
      <div className='bg-card w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-border'>
        <div className='px-6 py-4 border-b border-border flex justify-between items-center bg-input-bg/50'>
          <h2 className='text-lg font-bold text-text-main'> {initialData ? 'Editar Turma' : 'Nova Turma'}</h2>
          <button
            onClick={onClose}
            className='p-1.5 hover:bg-border rounded-full transition-colors text-text-muted cursor-pointer'
          >
            <X size={20} />
          </button>
        </div>

        <form className='p-6 space-y-5' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-4'>
            <Input 
              id='codigo'
              label='Código'
              placeholder='Ex: ENGSOFT26'
              icon={<Album size={20} />}
              {...register('codigo')}
              error={errors.codigo?.message}
            />
 
            <div className="space-y-1.5 w-full">
              <label htmlFor="disciplina_id" className="block text-sm font-semibold text-text-main">
                Disciplina
              </label>
              <select
                id="disciplina_id"
                {...register('disciplina_id', { valueAsNumber: true })}
                className={`w-full px-4 py-2.5 bg-input-bg border rounded-lg focus:ring-2 outline-none transition-all text-sm text-text-main cursor-pointer
                  ${errors.disciplina_id ? 'border-error focus:ring-error/20 focus:border-error' : 'border-border focus:ring-brand/20 focus:border-brand'}
                `}
              >
                <option value={0}>Selecione uma disciplina...</option>
                {disciplines?.map((discipline) => (
                  <option key={discipline.id} value={discipline.id}>
                    {discipline.nome} ({discipline.codigo})
                  </option>
                ))}
              </select>
              {errors.disciplina_id && (
                <p className="text-xs font-medium text-error mt-1">{errors.disciplina_id.message}</p>
              )}
            </div>
          </div>
 
          <div className='grid grid-cols-2 gap-4'>
            <Input 
              id='semestre'
              label='Semestre'
              placeholder='Ex: 2026.1'
              {...register('semestre')}
              error={errors.semestre?.message}
            />

            <Input
              id='ano'
              type='number'
              label='Ano'
              placeholder='2026' 
              {...register('ano', { valueAsNumber: true })}
              error={errors.ano?.message}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <Input 
              id='data_inicio'
              type='date'
              label='Data de Início'
              placeholder='01/01/2026'
              {...register('data_inicio')}
              error={errors.data_inicio?.message}
            />

            <Input
              id='data_fim'
              type='date'
              label='Data Fim'
              placeholder='01/06/2026' 
              {...register('data_fim')}
              error={errors.data_fim?.message}
            />
          </div>

          <Input
            id='horario'
            type='time'
            label='Horário'
            placeholder='08:00:00' 
            {...register('horario')}
            error={errors.horario?.message}
          />

          <div className='flex items-center justify-end gap-3 pt-4 border-t border-border'>
            <button 
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              className='px-6 py-2.5 rounded-lg font-bold text-sm text-text-muted hover:bg-input-bg transition-colors cursor-pointer'
            >
              Cancelar
            </button>
            <Button type='submit' isLoading={isSubmitting} className='px-6 py-2.5 w-auto shadow-lg hover:brightness-110'>
              {isSubmitting ? 'Salvando...' : initialData ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTurmaModal;
