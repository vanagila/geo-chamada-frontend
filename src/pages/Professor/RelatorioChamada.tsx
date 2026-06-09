import { useState } from 'react';
import { 
  ArrowLeft, Calendar, MapPin, Download, Share, 
  Users, CheckCircle2, XCircle, FileText, 
  Filter, ArrowUpDown, AlertTriangle, MoreVertical, 
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import Button from '../../ui/Button';
import useRelatorioChamada from '../../hooks/useRelatorioChamada';

const obterIniciais = (nome?: string) => {
  if (!nome) return 'AL';
  const palavras = nome.trim().split(' ');

  if (palavras.length === 1) {
    return palavras[0].substring(0, 2).toUpperCase();
  }

  const primeiraLetra = palavras[0][0];
  const ultimaLetra = palavras[palavras.length - 1][0];

  return (primeiraLetra + ultimaLetra).toUpperCase();
};

const RelatorioChamada = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const chamadaId = Number(id);

  const { relatorio, isLoading, error } = useRelatorioChamada(chamadaId);

  if (isLoading) {
    return (
      <div className='flex flex-col h-screen overflow-hidden bg-app-bg font-sans'>
        <Header />
        <div className='flex flex-1 overflow-hidden'>
          <Sidebar />
          <main className='flex-1 flex flex-col items-center justify-center p-8'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-brand mb-4'></div>
            <h2 className='text-lg font-bold text-text-main'>Carregando relatório...</h2>
            <p className='text-sm text-text-muted mt-1'>Buscando dados e estatísticas da chamada.</p>
          </main>
        </div>
      </div>
    );
  }

  if (error || !relatorio) {
    return (
      <div className='flex flex-col h-screen overflow-hidden bg-app-bg font-sans'>
        <Header />
        <div className='flex flex-1 overflow-hidden'>
          <Sidebar />
          <main className='flex-1 flex flex-col items-center justify-center p-8'>
            <div className='w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mb-4'>
              <AlertTriangle size={40} />
            </div>
            <h2 className='text-xl font-bold text-text-main'>Relatório indisponível</h2>
            <p className='text-sm text-text-muted mt-2 max-w-md text-center'>
              Não foi possível encontrar as informações desta chamada. Ela pode ter sido excluída ou ocorreu um erro no servidor.
            </p>
            <Button onClick={() => navigate(-1)} className='mt-6 py-2.5 px-6'>
              Voltar para o Histórico
            </Button>
          </main>
        </div>
      </div>
    );
  }

  const { chamada, presencas, estatisticas } = relatorio;

  return (
    <div className='flex flex-col h-screen overflow-hidden bg-app-bg font-sans'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto p-8 space-y-8'>
          <div className='flex flex-col gap-4'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center gap-2 text-brand font-medium hover:underline w-fit cursor-pointer'
            >
              <ArrowLeft size={18} />
              Voltar
            </button>
            <div className='flex flex-col md:flex-row justify-between md:items-end gap-4'>
              <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold text-text-main'>Relatório de Chamada</h1>
                <div className='flex flex-wrap items-center gap-4 text-sm text-text-muted font-medium'>
                  <span className='flex items-center gap-1.5'>
                    <Calendar size={16} />
                    Raio de {chamada?.raio || '--'}m
                  </span>
                  <span className='px-2.5 py-0.5 rounded-md bg-input-bg text-text-muted text-xs font-bold uppercase border border-border'>
                    {chamada?.status || 'DESCONHECIDO'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='bg-card p-5 rounded-xl border border-border shadow-sm flex items-center gap-4'>
              <div className='w-12 h-12 flex items-center justify-center bg-brand/10 rounded-full text-brand'>
                <Users size={24} />
              </div>
              <div>
                <p className='text-xs font-bold text-text-muted uppercase tracking-wider'>Total de Alunos</p>
                <p className='text-2xl font-bold text-text-main'>{estatisticas?.total || 0}</p>
              </div>
            </div>

            <div className='bg-card p-5 rounded-xl border border-border shadow-sm flex items-center gap-4'>
              <div className='w-12 h-12 flex items-center justify-center bg-green-500/10 rounded-full text-green-500'>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className='text-xs font-bold text-text-muted uppercase tracking-wider'>Presentes</p>
                <p className='text-2xl font-bold text-text-main'>{estatisticas?.presentes || 0}</p>
              </div>
            </div>

            <div className='bg-card p-5 rounded-xl border border-border shadow-sm flex items-center gap-4'>
              <div className='w-12 h-12 flex items-center justify-center bg-error/10 rounded-full text-error'>
                <XCircle size={24} />
              </div>
              <div>
                <p className='text-xs font-bold text-text-muted uppercase tracking-wider'>Ausentes</p>
                <p className='text-2xl font-bold text-text-error'>{estatisticas?.ausentes || 0}</p>
              </div>
            </div>

            <div className='bg-card p-5 rounded-xl border border-border shadow-sm flex items-center gap-4'>
              <div className='w-12 h-12 flex items-center justify-center bg-input-bg rounded-full text-text-muted'>
                <FileText size={24} />
              </div>
              <div>
                <p className='text-xs font-bold text-text-muted uppercase tracking-wider'>Abonadas</p>
                <p className='text-2xl font-bold text-text-main'>{estatisticas?.abonadas || 0}</p>
              </div>
            </div>
          </div>

          <div className='bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col'>
            <div className='px-6 py-4 border-b border-border flex justify-between items-center bg-input-bg/30'>
              <h3 className='font-bold text-text-main'>Lista de Presença</h3>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-input-bg border-b border-border'>
                    <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Aluno</th>
                    <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Horário</th>
                    <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Validação de GPS</th>
                    <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider'>Status</th>
                    <th className='px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right'>Ações</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-border'>
                  {presencas?.map((registro: any) => (
                    <tr key={registro.id} className='hover:bg-input-bg/50 transition-colors group'>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-9 h-9 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs font-bold border border-brand/20'>
                            {obterIniciais(registro.aluno?.nome)}
                          </div>
                          <span className='font-bold text-sm text-text-main'>
                            {registro.aluno?.nome}
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4 font-medium text-sm text-text-muted'>
                        {registro.horario || '--:--'}
                      </td>
                      <td className='px-6 py-4'>
                        {registro.dentro_raio === true ? (
                          <div className='flex items-center gap-2 text-green-500'>
                            <CheckCircle2 size={18} />
                            <span className='text-sm font-semibold'>Dentro do raio</span>
                          </div>
                        ) : registro.dentro_raio === false ? (
                          <div className='flex items-center gap-2 text-error'>
                            <AlertTriangle size={18} />
                            <span className='text-sm font-semibold'>Fora do raio ({registro.distancia_calculada}m)</span>
                          </div>
                        ) : (
                          <div className='flex items-center gap-2 text-text-muted opacity-50'>
                            <XCircle size={18} />
                            <span className='text-sm font-semibold'>Sem registro</span>
                          </div>
                        )}
                      </td>
                      <td className='px-6 py-4'>
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase border ${
                          registro.status === 'PRESENTE' 
                            ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                            : 'bg-error/10 text-error border-error/20'
                        }`}>
                          {registro.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <button className='p-2 text-text-muted hover:text-brand hover:bg-brand/10 rounded-lg cursor-pointer group-hover:opacity-100'>
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='px-6 py-4 bg-input-bg/50 border-t border-border flex justify-between items-center'>
              <span className='text-xs font-medium text-text-muted'>Mostrando alunos</span>
              <div className='flex gap-1'>
                <button className='p-1.5 rounded-lg border border-border bg-card text-text-muted disabled:opacity-50' disabled>
                  <ChevronLeft size={16} />
                </button>
                <button className='w-7 h-7 flex items-center justify-center rounded-lg bg-brand text-white text-xs font-bold'>1</button>
                <button className='p-1.5 rounded-lg border border-border bg-card text-text-muted hover:bg-input-bg disabled:opacity-50' disabled>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default RelatorioChamada;
