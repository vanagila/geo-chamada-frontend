import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { X, UserPlus } from 'lucide-react';
import Button from '../../ui/Button';
import useUsuarios from '../../hooks/useUsuarios';
import useTurmas from '../../hooks/useTurmas'

interface AssignAlunoModalProps {
  isOpen: boolean;
  onClose: () => void;
  turmaCodigo?: string;
  turmaId: number;
}

const AssignAlunoModal = ({ isOpen, onClose, turmaCodigo, turmaId }: AssignAlunoModalProps) => {
  const [selectedAlunoId, setSelectedAlunoId] = useState<number>(0);

  const { alunos, loadingAlunos } = useUsuarios();
  const { addAluno, isAddingAluno } = useTurmas();

  const handleAddAluno = () => {
    if (!selectedAlunoId || selectedAlunoId === 0) {
      toast.error('Selecione um aluno');
      return;
    }

    addAluno({ turmaId, alunoId: selectedAlunoId },
      {
        onSuccess: () => {
          onClose();
          setSelectedAlunoId(0);
        },
      }
    );
  }

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200'>
      <div className='bg-card w-full max-w-sm rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-border'>
        <div className='px-6 py-4 border-b border-border flex justify-between items-center bg-input-bg/50'>
          <div className='flex items-center gap-2 text-text-main'>
            <UserPlus size={18} className='text-brand' />
            <h2 className='text-lg font-bold'>Matricular Aluno</h2>
          </div>
          <button
            onClick={onClose}
            className='p-1.5 hover:bg-border rounded-full transition-colors text-text-muted cursor-pointer'
          >
            <X size={20} />
          </button>
        </div>
        <div className='p-6'>
          <div className='mb-6'>
            <p className='text-sm text-text-muted mb-4'>
              Selecione o aluno para matricular na turma <strong className='text-text-main'>{turmaCodigo}</strong>.
            </p>
            <div className="space-y-1.5 w-full">
              <label htmlFor="professor_id" className="block text-sm font-semibold text-text-main">
                Aluno
              </label>
              <select
                value={selectedAlunoId}
                onChange={(e) => setSelectedAlunoId(Number(e.target.value))}
                disabled={loadingAlunos}
                className='w-full px-4 py-2.5 bg-input-bg border rounded-lg focus:ring-2 outline-none transition-all text-sm text-text-main cursor-pointer'
              >
                <option value={0}>Selecione um aluno...</option>
                {alunos?.map((aluno) => (
                  <option key={aluno.id} value={aluno.id}>
                    {aluno.nome} - {aluno.matricula}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='flex items-center justify-end gap-3 pt-4 border-t border-border'>
            <button
              onClick={onClose}
              className='px-5 py-2 rounded-lg font-bold text-sm text-text-muted hover:bg-input-bg transition-colors cursor-pointer'
            >
              Cancelar
            </button>
            <Button onClick={handleAddAluno} 
              disabled={!selectedAlunoId || selectedAlunoId === 0 || isAddingAluno} 
              className='px-5 py-2 w-auto shadow-lg hover:brightness-110'>
              {isAddingAluno ? 'Salvando...' : 'Maticular'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignAlunoModal;
