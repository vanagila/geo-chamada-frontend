import Turma from '../types/turmas.types'
import TableWrapper from './TableWrapper';

interface TurmasTableProps {
  turmas: Turma[];
  isLoading: boolean;
}

const TurmasTable = ({ turmas, isLoading }: TurmasTableProps) => {
  return (
    <TableWrapper>
      <thead>
        <tr className='bg-input-bg border-b border-border'>
          <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Código</th>
          <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-center'>Disciplina</th>
          <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Semestre/Ano</th>
          <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-center'>Horário</th>
          <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right'>Início/Fim</th>
          <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right'>Ações</th>
        </tr>
      </thead>
      <tbody className='divide-y divide-border'>
        {isLoading ? (
          <tr>
            <td colSpan={6} className='text-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto'></div>
              <p className='text-text-muted mt-2 font-medium'>Carregando turmas...</p>
            </td>
          </tr>
        ) : turmas.length === 0 ? (
          <tr>
            <td colSpan={6} className='text-center py-12 bg-card'>
              <BookOpen size={48} className='mx-auto text-border mb-4' />
              <p className='text-text-main font-bold'>Nenhuma turma encontrada.</p>
              <p className='text-sm text-text-muted mt-1'>Cadastre uma nova turma.</p>
            </td>
              </tr>
        ) : (
          turmas.map((turma) => (
            <DisciplineRow 
              key={turma.id} 
              turma={turma} 
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </tbody>
    </TableWrapper>
  );
}

export default TurmasTable;
