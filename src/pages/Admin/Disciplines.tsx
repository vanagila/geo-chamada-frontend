import { Plus } from 'lucide-react';
import Sidebar from '../../components/Sidebar.tsx';
import Header from '../../components/Header';
import DisciplineFilters from '../../components/DisciplineFilters';
import DisciplinesTable from '../../components/DisciplinesTable';
import Button from '../../ui/Button';

const Disciplines = () => {
  return (
    <div className='flex flex-col h-screen overflow-hidden bg-app-bg font-sans'>
      <Header />

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />

        <main className='flex-1 p-8 overflow-y-auto max-w-6xl mx-auto w-full space-y-6'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2'>
            <div>
              <h1 className='text-2xl font-bold text-text-main tracking-tight'>
                Gerenciamento de Disciplinas
              </h1>
              <p className='text-sm text-text-muted mt-1'>
                Visualize, edite e crie novas disciplinas curriculares.
              </p>
            </div>
            <Button icon={<Plus size={18} />} className='w-full md:w-auto px-6 py-2.5'>
              Nova Disciplina
            </Button>
          </div>

          <DisciplineFilters />

          <DisciplinesTable />
        </main>
      </div>
    </div>
  );
}

export default Disciplines;
