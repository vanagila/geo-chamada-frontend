import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import HistoricoChamadaTable from '../../components/Professor/HistoricoChamadaTable';
import useChamadas from '../../hooks/useChamadas';
import useTurmas from '../../hooks/useTurmas';

const Chamadas = () => {

  const { 
    allChamadasProfessor: chamadasOrdenadas,
    loadingAllChamadasProfessor
  } = useChamadas();

  const { 
    turmasProfessor
  } = useTurmas();

  return (
    <div className='flex flex-col h-screen overflow-hidden bg-app-bg font-sans'>
      <Header />

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />

        <main className='flex-1 overflow-y-auto p-8 space-y-6'>
          <div>
            <h2 className='text-2xl font-bold text-text-main tracking-tight'>Histórico de Chamadas</h2>
            <p className='text-text-muted text-sm mt-1'>Visualize todas as chamadas realizadas nas suas turmas.</p>
          </div>
          <div className='w-full'>
            <HistoricoChamadaTable 
              chamadas={chamadasOrdenadas}
              turmas={turmasProfessor}
              isLoading={loadingAllChamadasProfessor}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Chamadas;
