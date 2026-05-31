import { useState } from 'react';
import { Code, Info, Edit, Trash2, Album } from 'lucide-react';
import type { Turma } from '../types/tumas.types'

interface TurmaRowProps {
  turma: Turma;
}

const TurmaRow = ({ turma }: TurmaRowProps) => {
  const getIconColor = (codigo: string) => {
    const colors = [
      { bg: 'bg-brand/10', text: 'text-brand' },
      { bg: 'bg-purple-500/10', text: 'text-purple-500' },
      { bg: 'bg-green-500/10', text: 'text-green-500' },
      { bg: 'bg-orange-500/10', text: 'text-orange-500' },
      { bg: 'bg-blue-500/10', text: 'text-blue-500' },
    ];
    const index = codigo.length % colors.length;
    return colors[index];
  };

  const colors = getIconColor(turma.codigo);

  return (
    <tr className='hover:bg-input-bg/50 transition-colors group'>
      <td className='px-6 py-4'>
        <div className='flex items-center gap-3'>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg} ${colors.text}`}>
            {<Album size={20} />}
          </div>
          <div className='relative'>
            <p className='font-bold text-text-main'>{turma.codigo}</p>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 font-medium text-center text-text-muted'>{turma.disciplina}</td>
      <td className='px-6 py-4 font-medium text-center text-text-muted'>{turma.semestre}</td>
      <td className='px-6 py-4 font-medium text-center text-text-muted'>{turma.horario}</td>
      <td className='px-6 py-4 font-medium text-right text-text-muted'>{turma.data_inicio} / {turma.data_fim}</td>
      <td className='px-6 py-4 text-right'>
        <div className='flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity'>
          <button
            className='p-2 hover:bg-brand/10 text-brand rounded-lg transition-colors cursor-pointer' title='Editar'>
            <Edit size={18} />
          </button>
          <button 
            className='p-2 hover:bg-error/10 text-error rounded-lg transition-colors cursor-pointer' title='Excluir'>
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TurmaRow;
