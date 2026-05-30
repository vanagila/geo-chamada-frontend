import { useState } from 'react';
import { Plus } from 'lucide-react';
import useDiscipline from '../../hooks/useDiscipline'
import Sidebar from '../../components/Sidebar.tsx';
import Header from '../../components/Header';
import DisciplineFilters from '../../components/DisciplineFilters';
import DisciplinesTable from '../../components/DisciplinesTable';
import CreateDisciplineModal from '../../components/CreateDisciplineModal'
import Button from '../../ui/Button';
import type { Disciplina } from '../../types/discipline.types'

const Disciplines = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    disciplines,
    isLoading,
    createDiscipline,
    isCreating
  } = useDiscipline();

  const handleEdit = (discipline: Disciplina) => {
    console.log("oi")
  };

  const handleDelete = (id: number) => {
    console.log("oi")
  };

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
            <Button icon={<Plus size={18} />} className='w-full md:w-auto px-6 py-2.5' onClick={() => setIsModalOpen(true)}>
              Nova Disciplina
            </Button>
          </div>

          <DisciplineFilters />

          <DisciplinesTable
            disciplines={disciplines}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>

      <CreateDisciplineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          createDiscipline(data, {
            onSuccess: () => setIsModalOpen(false)
          });
        }}
        isSubmitting={isCreating}
      />
    </div>
  );
}

export default Disciplines;
