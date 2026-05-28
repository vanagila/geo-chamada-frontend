import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import Badge from '../ui/Badge';

type StatusPresenca = 'presente' | 'falta' | 'atraso';

interface HistoryItem {
  id: string;
  disciplina: string;
  data: string;
  status: StatusPresenca;
}

const mockHistory: HistoryItem[] = [
  { id: '1', disciplina: 'Sociologia Aplicada', data: 'Ontem, 22 de Outubro • 19:15', status: 'presente' },
  { id: '2', disciplina: 'Teoria Política II', data: '20 de Outubro • 21:00', status: 'falta' },
  { id: '3', disciplina: 'Economia Brasileira', data: '20 de Outubro • 19:10', status: 'atraso' },
];

const StudentHistoryList = () => {
  const getIcon = (status: StatusPresenca) => {
    switch (status) {
      case 'presente': return <CheckCircle2 size={24} className='text-success' />;
      case 'falta': return <XCircle size={24} className='text-error' />;
      case 'atraso': return <Clock size={24} className='text-warning' />;
    }
  };

  const getBadgeVariant = (status: StatusPresenca) => {
    switch (status) {
      case 'presente': return 'success';
      case 'falta': return 'error';
      case 'atraso': return 'warning';
    }
  };

  return (
    <section className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-bold text-text-main'>Histórico Recente</h3>
        <button className='text-brand text-sm font-bold hover:underline bg-transparent border-none cursor-pointer'>
          Ver tudo
        </button>
      </div>
      
      <div className='bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-sm'>
        {mockHistory.map((item) => (
          <div key={item.id} className='flex items-center justify-between p-4 hover:bg-input-bg/50 transition-colors'>
            
            <div className='flex items-center gap-4'>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-input-bg`}>
                {getIcon(item.status)}
              </div>
              <div>
                <p className='font-bold text-text-main leading-tight'>{item.disciplina}</p>
                <p className='text-xs text-text-muted mt-0.5'>{item.data}</p>
              </div>
            </div>
            
            <div className='text-right'>
              <Badge variant={getBadgeVariant(item.status)}>
                {item.status}
              </Badge>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}

export default StudentHistoryList;
