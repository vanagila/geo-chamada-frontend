import { useState } from 'react';
import { Info, Edit, Trash2, BookOpen } from 'lucide-react';
import type { Disciplina } from '../types/discipline.types'

interface DisciplineRowProps {
  discipline: Disciplina;
  onEdit: (discipline: Disciplina) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

const DisciplineRow = ({ discipline, onEdit, onDelete, isDeleting }: DisciplineRowProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getIconColor = (nome: string) => {
    const colors = [
      { bg: 'bg-brand/10', text: 'text-brand' },
      { bg: 'bg-purple-500/10', text: 'text-purple-500' },
      { bg: 'bg-green-500/10', text: 'text-green-500' },
      { bg: 'bg-orange-500/10', text: 'text-orange-500' },
      { bg: 'bg-blue-500/10', text: 'text-blue-500' },
    ];
    const index = nome.length % colors.length;
    return colors[index];
  };

  const colors = getIconColor(discipline.nome);

  return (
    <tr className='hover:bg-input-bg/50 transition-colors group'>
      <td className='px-6 py-4'>
        <div className='flex items-center gap-3'>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg} ${colors.text}`}>
            {<BookOpen size={20} />}
          </div>
          <div className='relative'>
            <p className='font-bold text-text-main'>{discipline.nome}</p>
            {discipline.descricao && (
              <>
                <button 
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className='text-xs font-medium text-brand hover:underline cursor-pointer flex items-center gap-1 mt-0.5'
                >
                  Ver descrição
                  <Info size={12} />
                </button>
                {showTooltip && (
                  <div className='absolute z-20 top-full left-0 mt-2 w-64 p-3 bg-card-dark text-white rounded-lg text-xs shadow-xl border border-border-dark'>
                    {discipline.descricao}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </td>
      <td className='px-6 py-4 font-medium text-text-muted'>{discipline.codigo}</td>
      <td className='px-6 py-4 text-center'>
        <span className='px-2.5 py-1 rounded-md bg-input-bg text-text-muted text-xs font-bold uppercase border border-border'>
          {discipline.carga_horaria}h
        </span>
      </td>
      <td className='px-6 py-4'>
        <div className='flex items-center gap-2'>
          <div className='w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand'>
            {discipline.professor?.nome?.charAt(0) || '-'}
          </div>
          <span className='text-sm text-text-muted'>{discipline.professor?.nome || 'Sem professor'}</span>
        </div>
      </td>
      <td className='px-6 py-4'>
        <div className='flex items-center justify-center gap-1 flex-wrap'>
          {discipline.turmas?.map((turma, index) => (
            <span key={index} className='px-2 py-1 flex items-center justify-center rounded border border-border bg-card text-text-muted text-xs font-medium shadow-sm'>
              {turma}
            </span>
          ))}
        </div>
      </td>
      <td className='px-6 py-4 text-right'>
        <div className='flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity'>
          <button 
            onClick={() => onEdit(discipline)}
            className='p-2 hover:bg-brand/10 text-brand rounded-lg transition-colors cursor-pointer' title='Editar'>
            <Edit size={18} />
          </button>
          <button 
            onClick={() => onDelete(discipline.id)}
            className='p-2 hover:bg-error/10 text-error rounded-lg transition-colors cursor-pointer' title='Excluir'>
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DisciplineRow;
