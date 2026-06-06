import { useState } from 'react';
import { BookOpen, Plus, Users } from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import TurmaCard from '../../components/Turmas/TurmaCard';
import GeofenceCard from '../../components/GeofenceCard';
import AttendanceHistoryTable from '../../components/AttendanceHistoryTable';
import useAuth from '../../hooks/useAuth';
import useTurmas from '../../hooks/useTurmas';
import useChamadas from '../../hooks/useChamadas'
import type { Turma } from '../../types/turmas.types';

const ProfessorDashboard = () => {
  const [configuracao, setConfiguracao] = useState({
    raio: 150,
    coordenadas: null as { latitude: number; longitude: number } | null,
    hasLocation: false,
  })

  const { user } = useAuth();

  const { 
    turmasProfessor, 
    isLoadingTurmas, 
    errorTurma, 
    refetchTurma 
  } = useTurmas();

  const { chamadasAtivasPorTurma, loadingAtivas, refetchAtivas } = useChamadas(user?.id);

  const handleConfigChange = (novaConfig: { raio: number; coordenadas: any }) => {
    setConfiguracao({
      raio: novaConfig.raio,
      coordenadas: novaConfig.coordenadas,
      hasLocation: !!novaConfig.coordenadas,
    });
  };

  const handleSuccess = () => {
    refetchTurma();
  }

  return (
    <div className='flex flex-col h-screen overflow-hidden bg-app-bg font-sans'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto p-8 space-y-8'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div>
              <h2 className='text-2xl font-bold text-text-main tracking-tight'>
                Bem-vindo, {user?.nome?.split(' ')[0]}!
              </h2>
              <p className='text-text-muted text-sm mt-1'>
                Gerencie as suas frequências e turmas em tempo real.
              </p>
            </div>
            <div className='flex flex-wrap items-center gap-3'>
              <div className='relative'>
                <BookOpen className='absolute left-3 top-1/2 -translate-y-1/2 text-text-muted' size={16} />
                <select className='pl-9 pr-8 py-2.5 rounded-lg border border-border bg-card text-sm font-medium text-text-main focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all cursor-pointer'>
                  <option>Todas as Turmas</option>
                  <option>Engenharia de Software - 4A</option>
                  <option>Arquitetura de Dados - 6B</option>
                  <option>Redes de Computadores - 2C</option>
                </select>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 space-y-8'>
              <section>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='font-bold text-lg flex items-center gap-2 text-text-main'>
                    <Users className='text-brand' size={20} />
                    Turmas do Dia
                  </h3>
                  <button className='text-brand text-sm font-medium hover:underline cursor-pointer bg-transparent border-none'>
                    Ver todas
                  </button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {isLoadingTurmas ? (
                    <div className='col-span-1 md:col-span-2 flex flex-col items-center justify-center py-16 bg-card border border-border rounded-xl shadow-sm'>
                      <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-brand mb-4'></div>
                      <p className='text-text-main font-bold'>Buscando suas turmas...</p>
                      <p className='text-sm text-text-muted mt-1'>Por favor, aguarde um momento.</p>
                    </div>
                  ) : turmasProfessor?.length === 0 ? (
                    <div className='col-span-1 md:col-span-2 flex flex-col items-center justify-center py-16 bg-card border border-border rounded-xl shadow-sm text-center px-4'>
                      <div className='w-16 h-16 bg-input-bg rounded-full flex items-center justify-center mb-4 text-text-muted'>
                        <BookOpen size={32} />
                      </div>
                      <p className='text-text-main font-bold text-lg'>Nenhuma turma para hoje</p>
                      <p className='text-sm text-text-muted mt-1 max-w-sm'>
                        Você não possui turmas alocadas ou aulas agendadas para o dia de hoje.
                      </p>
                    </div>
                  ) : (
                    turmasProfessor?.map((turma: Turma) => (
                      <TurmaCard
                        key={turma.id}
                        id={turma.id}
                        nome={turma.disciplina_nome || 'Disciplina'}
                        horario={turma.horario?.substring(0, 5) || '--:--'}
                        sala={turma.sala || '204'}
                        totalAlunos={40}
                        status="pronta"
                        configuracao={configuracao}
                        chamadaAtiva={chamadasAtivasPorTurma[turma.id]}
                        onSuccess={handleSuccess}
                      />
                    ))
                  )}
                </div>
              </section>
              <AttendanceHistoryTable />
            </div>
            <div className='lg:col-span-1 space-y-6'>
              <GeofenceCard 
                onConfigChange={(novaConfig) => {
                  setConfiguracao({
                    raio: novaConfig.raio,
                    coordenadas: novaConfig.coordenadas,
                    hasLocation: !!novaConfig.coordenadas
                  });
                }}
              />
              <div className='bg-card-dark text-white p-5 rounded-xl shadow-sm border border-border-dark'>
                <h4 className='text-text-muted text-xs font-bold uppercase tracking-widest mb-4'>
                  Métricas de Hoje
                </h4>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-slate-300'>Média de Presença</span>
                    <span className='text-lg font-bold text-success'>88%</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-slate-300'>Alertas de Evasão</span>
                    <span className='text-lg font-bold text-warning'>03</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProfessorDashboard;
