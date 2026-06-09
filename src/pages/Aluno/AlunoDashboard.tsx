import useAuth from '../../hooks/useAuth';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import ChamadaAtiva from '../../components/Aluno/ChamadaAtiva';
import DistanceRadar from '../../components/DistanceRadar';
import MapPreview from '../../components/MapPreview'
import StudentHistoryList from '../../components/StudentHistoryList.tsx';

const AlunoDashboard = () => {
  const { user } = useAuth();

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

          <ChamadaAtiva />

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <DistanceRadar distance={12} maxRadius={50} />
            <MapPreview />
          </div>

          <StudentHistoryList />
        </main>
      </div>
    </div>
  );
}

export default AlunoDashboard;
