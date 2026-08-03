import { MapPin, Search, Bell, Settings } from 'lucide-react'

const Header = () => {
  return (
    <header className='h-16 shrink-0 flex items-center justify-between px-6 bg-card border-b border-border z-20'>
        <div className='flex items-center gap-3 w-64'>
          <div className='bg-brand/10 p-1.5 rounded-lg text-brand flex items-center justify-center'>
            <MapPin size={24}/>
          </div>
          <h1 className='text-text-main text-lg font-bold leading-none tracking-tight'>
            GeoChamada
          </h1>
        </div>
        <div className='flex-1 flex items-center justify-between pl-8'>
          <h2 className='text-xl font-bold text-text-main tracking-tight'>
            Dashboard
          </h2>
          <div className='flex items-center gap-6'>
            <div className='relative w-64 hidden md:block'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-text-muted' size={18}/>
              <input 
                className='w-full bg-input-bg border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-text-main transition-all'
                placeholder='Pesquisar...'
                type='text'
              />
            </div>
            <div className='flex items-center gap-3'>
              <button className='p-2 text-text-muted hover:bg-input-bg rounded-lg transition-colors relative cursor-pointer'>
                <Bell size={20}/>
                <span className='absolute top-1.5 right-2 w-2 h-2 bg-error rounded-full border-2 border-card'></span>
              </button>
              <button className='p-2 text-text-muted hover:bg-input-bg rounded-lg transition-colors cursor-pointer'>
                <Settings size={20}/>
              </button>
            </div>
          </div>
        </div>
      </header>
  );
}

export default Header;
