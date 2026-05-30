import { useState } from 'react';
import { Calculator, FlaskConical, Code, Info, Edit, Trash2, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import type { Disciplina } from '../types/discipline.types'

interface DisciplineRowProps {
  discipline: Disciplina;
  onEdit: (discipline: Disciplina) => void;
  onDelete: (id: number) => void;
}

const DisciplineRow = ({ discipline, onEdit, onDelete }: DisciplineRowProps) => {
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

interface DisciplinesTableProps {
  disciplines: Disciplina[];
  isLoading: boolean;
  onEdit: (disciplina: Disciplina) => void;
  onDelete: (id: string) => void;
}

const DisciplinesTable = ({ disciplines, isLoading, onEdit, onDelete }: DisciplinesTableProps) => {
  return (
    <div className='bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col'>
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='bg-input-bg border-b border-border'>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Nome</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Código</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-center'>Carga Horária</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Professor Responsável</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-center'>Turmas</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right'>Ações</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-border'>
            {isLoading ? (
              <tr>
                <td colSpan={6} className='text-center py-12'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto'></div>
                  <p className='text-text-muted mt-2 font-medium'>Carregando disciplinas...</p>
                </td>
              </tr>
            ) : disciplines.length === 0 ? (
              <tr>
                <td colSpan={6} className='text-center py-12 bg-card'>
                  <BookOpen size={48} className='mx-auto text-border mb-4' />
                  <p className='text-text-main font-bold'>Nenhuma disciplina encontrada.</p>
                  <p className='text-sm text-text-muted mt-1'>Cadastre uma nova disciplina para começar.</p>
                </td>
              </tr>
            ) : (
              disciplines.map((discipline) => (
                <DisciplineRow 
                  key={discipline.id} 
                  discipline={discipline} 
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {!isLoading && disciplines.length > 0 && (
        <div className='px-6 py-4 bg-input-bg/50 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border'>
          <p className='text-xs text-text-muted'>
            Mostrando <span className='font-bold text-text-main'>{disciplines.length}</span> disciplinas
          </p>
          <div className='flex items-center gap-1'>
            <button className='p-1.5 hover:bg-border rounded-lg text-text-muted disabled:opacity-50 transition-colors' disabled>
              <ChevronLeft size={18} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-lg bg-brand text-white text-sm font-bold shadow-sm transition-all cursor-pointer'>1</button>
            <button className='p-1.5 hover:bg-border rounded-lg text-text-muted disabled:opacity-50 transition-colors' disabled>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisciplinesTable;
