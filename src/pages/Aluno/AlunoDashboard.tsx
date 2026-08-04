import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useTurmas from '../../hooks/useTurmas';
import useChamadas from '../../hooks/useChamadas';
import usePresencas from '../../hooks/usePresencas';
import useGeolocation from '../../hooks/useGeolocation';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import ChamadaAtiva from '../../components/Aluno/ChamadaAtiva';
import DistanceRadar from '../../components/DistanceRadar';
import MapPreview from '../../components/MapPreview'
import StudentHistoryList from '../../components/StudentHistoryList.tsx';

const AlunoDashboard = () => {
  const { user } = useAuth();

  const { 
    turmasAluno,
  } = useTurmas();

  const {
    chamadaAtivaAluno,
    loadingAtivaAluno,
    refetchAtivaAluno
  } = useChamadas();

  const { createPresenca, isCreating } = usePresencas();
  const { 
    coordenadas, 
    hasLocation, 
    capturarLocalizacao 
  } = useGeolocation({ persistLocation: true });

  const turmaComChamadaAtiva = chamadaAtivaAluno 
    ? turmasAluno?.find(t => t.id === chamadaAtivaAluno.turma_id)
    : null;

  const handleMarcarPresenca = () => {
    if (!hasLocation || !coordenadas) {
      toast.error('Ative sua localização primeiro');
      capturarLocalizacao();
      return;
    }

    if (!chamadaAtivaAluno) {
      toast.error('Nenhuma chamada ativa no momento');
      return;
    }

    createPresenca({
      chamada_id: chamadaAtivaAluno.id,
      coordenadas: {
        latitude: coordenadas.latitude,
        longitude: coordenadas.longitude,
      },
    }, {
      onSuccess: () => {
        refetchAtivaAluno();
      },
    });
  };

  return (
    <div className='flex flex-col h-screen overflow-hidden bg-app-bg font-sans'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto p-4 md:p-8 space-y-8 max-w-5xl mx-auto w-full'>
          <div className='flex flex-col gap-1 mt-4'>
            <h1 className='text-3xl font-black tracking-tight text-text-main '>
              Dashboard do Aluno
            </h1>
            <p className='text-text-muted'>
              Bem-vindo de volta, <span className="text-brand font-semibold">{user?.nome || 'Aluno'}</span>
            </p>
          </div>

          {loadingAtivaAluno ? (
            <div className='w-full h-40 bg-card rounded-2xl border border-border flex items-center justify-center shadow-sm'>
               <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-brand'></div>
            </div>
          ) : chamadaAtivaAluno && turmaComChamadaAtiva ? (
            <ChamadaAtiva 
              turma={turmaComChamadaAtiva}
              chamadaAtiva={chamadaAtivaAluno}
              onMarcarPresenca={handleMarcarPresenca}
              isCreating={isCreating}
            />
          ) : (
            <div className='w-full p-8 bg-card rounded-2xl border border-border text-center shadow-sm'>
              <p className='text-text-muted font-medium'>Nenhuma chamada ativa no momento.</p>
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <DistanceRadar maxRadius={50} />
            <MapPreview />
          </div>

          <StudentHistoryList />
        </main>
      </div>
    </div>
  );
}

export default AlunoDashboard;
