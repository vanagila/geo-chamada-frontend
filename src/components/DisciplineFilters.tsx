import { Search, Filter } from 'lucide-react';

interface DisciplineFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterHours: string;
  onFilterHoursChange: (value: string) => void;
  filterProfessor: string;
  onFilterProfessorChange: (value: string) => void;
  professoresDisponiveis: string[];
}

const DisciplineFilters = ({ searchTerm, onSearchChange, filterHours, onFilterHoursChange, filterProfessor, onFilterProfessorChange, professoresDisponiveis }: DisciplineFiltersProps) => {
  return (
    <div className='bg-card border border-border rounded-xl p-6 shadow-sm'>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
        <div className='md:col-span-5 relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-text-muted' size={18} />
          <input 
            className='w-full pl-10 pr-4 py-2 bg-input-bg border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm outline-none text-text-main' 
            placeholder='Buscar por nome ou código...' 
            type='text'
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className='md:col-span-3'>
          <select 
            value={filterHours}
            onChange={(e) => onFilterHoursChange(e.target.value)}
            className='w-full px-4 py-2 bg-input-bg border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm outline-none text-text-muted cursor-pointer'>
            <option value=''>Carga Horária (Todos)</option>
            <option value='40'>40h</option>
            <option value='60'>60h</option>
            <option value='90'>90h+</option>
          </select>
        </div>
        <div className='md:col-span-3'>
          <select 
            value={filterProfessor}
            onChange={(e) => onFilterProfessorChange(e.target.value)}
            className='w-full px-4 py-2 bg-input-bg border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm outline-none text-text-muted cursor-pointer'>
            <option value="">Professor (Todos)</option>
            {professoresDisponiveis.map((nome, index) => (
              <option key={index} value={nome}>{nome}</option>
            ))}
          </select>
        </div>
        <div className='md:col-span-1'>
          <button className='w-full h-full flex items-center justify-center bg-input-bg text-text-muted border border-border rounded-lg hover:bg-border transition-colors cursor-pointer py-2 md:py-0'>
            <Filter size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisciplineFilters;
