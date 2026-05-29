import { Search, Filter } from 'lucide-react';

const DisciplineFilters = () => {
  return (
    <div className='bg-card border border-border rounded-xl p-6 shadow-sm'>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
        
        <div className='md:col-span-5 relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-text-muted' size={18} />
          <input 
            className='w-full pl-10 pr-4 py-2 bg-input-bg border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm outline-none text-text-main' 
            placeholder='Buscar por nome ou código...' 
            type='text'
          />
        </div>
        
        <div className='md:col-span-3'>
          <select className='w-full px-4 py-2 bg-input-bg border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm outline-none text-text-muted cursor-pointer'>
            <option value=''>Carga Horária</option>
            <option value='30'>30h</option>
            <option value='60'>60h</option>
            <option value='90'>90h+</option>
          </select>
        </div>
        
        <div className='md:col-span-3'>
          <select className='w-full px-4 py-2 bg-input-bg border border-border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm outline-none text-text-muted cursor-pointer'>
            <option value=''>Professor Responsável</option>
            <option value='1'>Dr. Ricardo Silva</option>
            <option value='2'>Dra. Amanda Costa</option>
            <option value='3'>Prof. Marcelo Souza</option>
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
