import { History } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

interface AttendanceHistory {
  id: string;
  dataHora: string;
  turma: string;
  presencas: number;
  totalAlunos: number;
  status: 'aberta' | 'encerrada';
}

const mockHistory: AttendanceHistory[] = [
  { id: '1', dataHora: 'Hoje, 08:05', turma: 'Eng. Software - 4A', presencas: 34, totalAlunos: 40, status: 'aberta' },
  { id: '2', dataHora: 'Ontem, 14:00', turma: 'Redes Comp. - 2C', presencas: 23, totalAlunos: 25, status: 'encerrada' },
];

const AttendanceHistoryTable = () => {
  return (
    <section>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-bold text-lg flex items-center gap-2 text-text-main'>
          <History className='text-brand' size={20}/>
          Chamadas Recentes
        </h3>
      </div>
      <div className='bg-card rounded-xl border border-border overflow-hidden shadow-sm'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-input-bg text-text-muted uppercase text-[10px] font-bold'>
            <tr>
              <th className='px-6 py-4 tracking-wider'>Data & Hora</th>
              <th className='px-6 py-4 tracking-wider'>Turma</th>
              <th className='px-6 py-4 tracking-wider'>Presenças</th>
              <th className='px-6 py-4 tracking-wider'>Status</th>
              <th className='px-6 py-4 text-right tracking-wider'>Ação</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-border'>
            {mockHistory.map((chamada) => {
              const porcentagem = Math.round((chamada.presencas / chamada.totalAlunos) * 100);
              const isAberta = chamada.status === 'aberta';
              return (
                <tr key={chamada.id} className='hover:bg-input-bg/50 transition-colors'>
                  <td className='px-6 py-4 font-medium text-text-main'>
                    {chamada.dataHora}
                  </td>
                  <td className='px-6 py-4 text-text-muted'>
                    {chamada.turma}
                  </td>
                  <td className='px-6 py-4'>
                    <ProgressBar 
                      value={porcentagem} 
                      variant={isAberta ? 'success' : 'brand'} 
                      showLabel={false} 
                    />
                    <span className='text-xs font-bold text-text-main mt-1 block'>
                      {chamada.presencas}/{chamada.totalAlunos}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <Badge variant={isAberta ? 'success' : 'default'}>
                      {chamada.status}
                    </Badge>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <button className='text-brand font-bold hover:underline cursor-pointer'>
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AttendanceHistoryTable;
