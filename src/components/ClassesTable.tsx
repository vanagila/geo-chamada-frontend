import { Plus, MoreVertical } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

interface ClassSummary {
  id: string;
  nome: string;
  professor: string;
  presenca: number;
  status: 'ativa' | 'pendente';
}

const mockClasses: ClassSummary[] = [
  { id: '1', nome: '3º Ano A - Matutino', professor: 'Dr. Marcos Oliveira', presenca: 94, status: 'ativa' },
  { id: '2', nome: '1º Ano C - Vespertino', professor: 'Dra. Eliane Rocha', presenca: 88, status: 'ativa' },
  { id: '3', nome: '2º Ano B - Matutino', professor: 'Prof. Sandra Lima', presenca: 72, status: 'pendente' },
];

const ClassesTable = () => {
  const getProgressVariant = (presenca: number) => {
    if (presenca >= 90) return 'success';
    if (presenca >= 80) return 'brand';
    return 'warning';
  };

  return (
    <div className='bg-card rounded-lg border border-border overflow-hidden shadow-sm'>
      <div className='p-6 border-b border-border flex items-center justify-between'>
        <h4 className='text-lg font-bold text-text-main'>Resumo das Turmas Atuais</h4>
        <button className='flex items-center gap-2 text-brand text-sm font-bold hover:underline cursor-pointer'>
          <Plus size={16}/> Nova Turma
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full text-left'>
          <thead className="bg-input-bg">
            <tr>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Turma</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Professor</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Presença</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Status</th>
              <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right'>Ações</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-border'>
            {mockClasses.map((turma) => (
              <tr key={turma.id} className='hover:bg-input-bg/50 transition-colors'>
                <td className='px-6 py-4 text-sm font-medium text-text-main'>
                  {turma.nome}
                </td>
                <td className='px-6 py-4 text-sm text-text-muted'>
                  {turma.professor}
                </td>
                <td className='px-6 py-4'>
                  <ProgressBar value={turma.presenca} variant={getProgressVariant(turma.presenca)} />
                </td>
                <td className='px-6 py-4'>
                  <Badge variant={turma.status === 'ativa' ? 'success' : 'default'}>
                    {turma.status}
                  </Badge>
                </td>
                <td className='px-6 py-4 text-right'>
                  <button className='text-text-muted hover:text-brand transition-colors cursor-pointer'>
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassesTable;
