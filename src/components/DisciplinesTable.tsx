import { BookOpen } from 'lucide-react';
import type { Disciplina } from '../types/discipline.types'
import TableWrapper from  '../components/TableWrapper'
import DisciplineRow from  '../components/DisciplineRow'

interface DisciplinesTableProps {
  disciplines: Disciplina[];
  isLoading: boolean;
  onEdit: (disciplina: Disciplina) => void;
  onDelete: (disciplina: Disciplina) => void;
}

const DisciplinesTable = ({ disciplines, isLoading, onEdit, onDelete }: DisciplinesTableProps) => {
  return (
    <TableWrapper totalItems={disciplines.length} isLoading={isLoading}>
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
              <p className='text-sm text-text-muted mt-1'>Cadastre uma nova disciplina.</p>
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
    </TableWrapper> 
  );
}

export default DisciplinesTable;
