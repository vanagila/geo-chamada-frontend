import { useNavigate } from 'react-router-dom';
import { History, BookOpen } from 'lucide-react';
import Badge from '../../ui/Badge';
import ProgressBar from '../../ui/ProgressBar';
import type { Chamada } from '../../types/chamadas.types.ts';
import type { Turma } from '../../types/turmas.types';

interface HistoricoChamadaTableProps {
  chamadas: Chamada[];
  turmas: Turma[];
  isLoading: boolean;
}

const HistoricoChamadaTable = ({ chamadas, turmas, isLoading }: HistoricoChamadaTableProps) => {

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    const hoje = new Date();
  
    const isHoje = data.getDate() === hoje.getDate() && 
                 data.getMonth() === hoje.getMonth() && 
                 data.getFullYear() === hoje.getFullYear();

    const horasMinutos = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  
    if (isHoje) return `Hoje, ${horasMinutos}`;
  
    const dataFormatada = data.toLocaleDateString('pt-BR');
    return `${dataFormatada} às ${horasMinutos}`;
  };

  const navigate = useNavigate();

  const handleVerRelatorio = (chamadaId: number) => {
    navigate(`/professor/chamada/${chamadaId}/relatorio`);
  }

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
            {isLoading ? (
              <tr>
                <td colSpan={5} className='text-center py-12'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto'></div>
                  <p className='text-text-muted mt-2'>Carregando histórico...</p>
                </td>
              </tr>
            ) : chamadas.length === 0 ? (
              <tr>
                <td colSpan={5} className='text-center py-12'>
                  <BookOpen size={32} className='mx-auto text-border mb-3' />
                  <p className='text-text-main font-bold'>Nenhum registro encontrado</p>
                  <p className='text-xs text-text-muted mt-1'>As chamadas realizadas aparecerão aqui.</p>
                </td>
                </tr>
            ) : (
              chamadas.slice(0, 5).map((chamada) => {
                const turmaObj = turmas.find(t => t.id === chamada.turma_id);
                const nomeTurma = turmaObj?.codigo || `Turma #${chamada.turma_id}`;
                const presencas = 0;
                const totalAlunos = turmaObj?.alunos?.length || 0;
                const porcentagem = Math.round((presencas / totalAlunos) * 100);
                const isAberta = chamada.status === 'ABERTA';
                return (
                  <tr key={chamada.id} className='hover:bg-input-bg/50 transition-colors'>
                    <td className='px-6 py-4 font-medium text-text-main'>
                      {formatarData(chamada.data_abertura)}
                    </td>
                    <td className='px-6 py-4 text-text-muted'>
                      {nomeTurma}
                    </td>
                    <td className='px-6 py-4 min-w-[120px]'>
                      <ProgressBar 
                        value={porcentagem} 
                        variant={isAberta ? 'success' : 'brand'} 
                        showLabel={false} 
                      />
                      <span className='text-xs font-bold text-text-main mt-1 block'>
                        {presencas}/{totalAlunos}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <Badge variant={isAberta ? 'success' : 'default'}>
                        {isAberta ? 'Aberta' : 'Encerrada'}
                      </Badge>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <button 
                        onClick={() => handleVerRelatorio(chamada.id)}
                        className='text-brand font-bold hover:underline cursor-pointer'>
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default HistoricoChamadaTable;
