import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import useDiscipline from '../../hooks/useDiscipline'
import Sidebar from '../../components/layout/Sidebar.tsx';
import Header from '../../components/layout/Header';
import DisciplineFilters from '../../components/DisciplineFilters';
import DisciplinesTable from '../../components/DisciplinesTable';
import CreateDisciplineModal from '../../components/CreateDisciplineModal'
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal'
import Button from '../../ui/Button';
import type { Disciplina, DisciplinaFormData } from '../../types/discipline.types'

const Disciplines = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDiscipline, setEditingDiscipline] = useState<Disciplina | null>(null);
  const [disciplineToDelete, setDisciplineToDelete] = useState<Disciplina | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHours, setFilterHours] = useState('');
  const [filterProfessor, setFilterProfessor] = useState('');

  const {
    disciplines,
    isLoading,
    createDiscipline,
    isCreating,
    isUpdating,
    updateDiscipline,
    deleteDiscipline,
    isDeleting
  } = useDiscipline();

  const handleSubmit = (data: DisciplinaFormData) => {
    if (editingDiscipline) {
      updateDiscipline({
        id: editingDiscipline.id,
        data: {
          nome: data.nome,
          codigo: data.codigo,
          descricao: data.descricao,
          carga_horaria: data.carga_horaria
        },
      });
    } else {
      createDiscipline({
        nome: data.nome,
        codigo: data.codigo,
        descricao: data.descricao,
        carga_horaria: data.carga_horaria
      });
    }
    setIsModalOpen(false)
    setEditingDiscipline(null)
  };

  const handleEdit = (discipline: Disciplina) => {
    setEditingDiscipline(discipline);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (discipline: Disciplina) => {
    setDisciplineToDelete(discipline);
  }

  const handleConfirmDelete = () => {
    if (!disciplineToDelete) return;
    
    deleteDiscipline(disciplineToDelete.id, {
      onSuccess: () => {
        setDisciplineToDelete(null);
      }
    });
  };

  const handleNew = () => {
    setEditingDiscipline(null);
    setIsModalOpen(true);
  }

  const professoresUnicos = useMemo(() => {
    if (!disciplines) return [];
    const nomes = disciplines.map(d => d.professor?.nome)
      .filter(Boolean) as string[];

    return Array.from(new Set(nomes)).sort();
  }, [disciplines])

  const filteredDisciplines = disciplines.filter((discipline) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = term === '' || 
      discipline.nome.toLowerCase().includes(term) || 
      discipline.codigo.toLowerCase().includes(term);

    let matchesHours = true;
    if (filterHours !== '') {
      if (filterHours === '90') {
        matchesHours = discipline.carga_horaria >= 90;
      } else {
        matchesHours = discipline.carga_horaria === Number(filterHours);
      }
    }

    const matchesProfessor = filterProfessor === '' || discipline.professor?.nome === filterProfessor;

    return matchesSearch && matchesHours && matchesProfessor;
  });

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
            <Button icon={<Plus size={18} />} className='w-full md:w-auto px-6 py-2.5' onClick={handleNew}>
              Nova Disciplina
            </Button>
          </div>

          <DisciplineFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterHours={filterHours}
            onFilterHoursChange={setFilterHours}
            filterProfessor={filterProfessor}
            onFilterProfessorChange={setFilterProfessor}
            professoresDisponiveis={professoresUnicos}
          />

          <DisciplinesTable
            disciplines={filteredDisciplines}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </main>
      </div>

      <CreateDisciplineModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDiscipline(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingDiscipline}
        isSubmitting={isCreating || isUpdating}
      />

      <ConfirmDeleteModal 
        isOpen={!!disciplineToDelete}
        onClose={() => setDisciplineToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={disciplineToDelete?.nome}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default Disciplines;
