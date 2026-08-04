import { useState } from 'react';
import { Plus } from 'lucide-react';
import useTurmas from '../../hooks/useTurmas'
import Sidebar from '../../components/layout/Sidebar.tsx';
import Header from '../../components/layout/Header';
import Button from '../../ui/Button'
import TurmasTable from '../../components/Turmas/TurmasTable'
import CreateTurmaModal from '../../components/Turmas/CreateTurmaModal'
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.tsx'
import AssignProfessorModal from '../../components/Professor/AssignProfessorModal'
import AssignAlunoModal from '../../components/Aluno/AssignAlunoModal'
import type { Turma } from '../../types/turmas.types'

const Turmas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTurma, setEditingTurma] = useState<Turma | null>(null);
  const [turmaToDelete, setTurmaToDelete] = useState<Turma | null>(null);
  const [turmaParaVincularProfessor, setTurmaParaVincularProfessor] = useState<Turma | null>(null);
  const [turmaParaVincularAluno, setTurmaParaVincularAluno] = useState<Turma | null>(null);

  const {
    turmas,
    isLoading,
    createTurma,
    isCreating,
    updateTurma,
    isUpdating,
    deleteTurma,
    isDeleting
  } = useTurmas();

  const handleSubmit = async (data: any) => {
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

  const handleDeleteClick = (id: number) => {
    const turmaEncontrada = turmas.find(d => d.id === id);
    if (turmaEncontrada) {
      setTurmaToDelete(turmaEncontrada);
    }
  };

  const handleConfirmDelete = () => {
    if (!turmaToDelete) return;
    
    deleteTurma(turmaToDelete.id, {
      onSuccess: () => {
        setTurmaToDelete(null);
      }
    });
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
            onDelete={handleDeleteClick}
            onAssignProfessor={(turma) => setTurmaParaVincularProfessor(turma)}
            onAssignAluno={(turma) => setTurmaParaVincularAluno(turma)}
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

      <ConfirmDeleteModal 
        isOpen={!!turmaToDelete}
        onClose={() => setTurmaToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={turmaToDelete?.codigo}
        isDeleting={isDeleting}
      />

      {turmaParaVincularProfessor && (
        <AssignProfessorModal 
          isOpen={true}
          onClose={() => setTurmaParaVincularProfessor(null)}
          turmaId={turmaParaVincularProfessor.id}
          turmaCodigo={turmaParaVincularProfessor.codigo}
        />
      )}

      {turmaParaVincularAluno && (
        <AssignAlunoModal 
          isOpen={true}
          onClose={() => setTurmaParaVincularAluno(null)}
          turmaId={turmaParaVincularAluno.id}
          turmaCodigo={turmaParaVincularAluno.codigo}
       />
      )}
    </div>
  );
}

export default Turmas;
