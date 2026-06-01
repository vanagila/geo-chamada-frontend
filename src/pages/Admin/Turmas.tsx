import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import useTurmas from '../../hooks/useTurmas'
import Sidebar from '../../components/Sidebar.tsx';
import Header from '../../components/Header';
import Button from '../../ui/Button'
import TurmasTable from '../../components/Turmas/TurmasTable'
import CreateTurmaModal from '../../components/Turmas/CreateTurmaModal'
import type { Turma, TurmaFormData } from '../../types/turmas.types'

const Turmas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTurma, setEditingTurma] = useState<Disciplina | null>(null);

  const {
    turmas,
    isLoading,
    createTurma,
    isCreating,
    updateTurma,
    isUpdating
  } = useTurmas();

  const handleSubmit = async (data: TurmaFormData) => {
    if (editingTurma) {
      await updateTurma({ id: editingTurma.id, data });
    } else {
      await createTurma(data);
    }
    setIsModalOpen(false)
    setEditingTurma(null)
  };

  const handleEdit = (turma: Turma) => {
    setEditingTurma(turma);
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setEditingTurma(null);
    setIsModalOpen(true);
  }

  return (
    <div className='flex flex-col h-screen overflow-hidden bg-app-bg font-sans'>
      <Header />

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />

        <main className='flex-1 p-8 overflow-y-auto max-w-6xl mx-auto w-full space-y-6'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2'>
            <div>
              <h1 className='text-2xl font-bold text-text-main tracking-tight'>
                Gerenciamento de Turmas
              </h1>
              <p className='text-sm text-text-muted mt-1'>
                Visualize, edite e crie novas turmas.
              </p>
            </div>
            <Button icon={<Plus size={18} />} className='w-full md:w-auto px-6 py-2.5' onClick={handleNew}>
              Nova Turma
            </Button>
          </div>

          <TurmasTable 
            turmas={turmas}
            isLoading={isLoading}
            onEdit={handleEdit}
          />
        </main>
      </div>

      <CreateTurmaModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTurma(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingTurma}
        isSubmitting={isCreating || isUpdating}
      />
    </div>
  );
}

export default Turmas;
