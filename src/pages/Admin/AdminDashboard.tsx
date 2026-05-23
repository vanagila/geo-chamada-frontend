import { Search, Bell, Settings, Users, User, GraduationCap, CheckCircle, MapPin } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import StatCard from '../../ui/StatCard';
import ProgressBar from '../../ui/ProgressBar';
import Badge from '../../ui/Badge';

const AdminDashboard = () => {
  return (
    <div className='flex flex-col h-screen overflow-hidden bg-app-bg font-sans'>
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
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-text-muted' size={18} />
              <input 
                className='w-full bg-input-bg border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-text-main transition-all'
                placeholder='Pesquisar...'
                type='text'
              />
            </div>
            <div className='flex items-center gap-3'>
              <button className='p-2 text-text-muted hover:bg-input-bg rounded-lg transition-colors relative cursor-pointer'>
                <Bell size={20} />
                <span className='absolute top-1.5 right-2 w-2 h-2 bg-error rounded-full border-2 border-card'></span>
              </button>
              <button className='p-2 text-text-muted hover:bg-input-bg rounded-lg transition-colors cursor-pointer'>
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />

        <main className='flex-1 overflow-y-auto p-8 space-y-8'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total de turmas ativas" 
              value="24" 
              icon={<Users size={24} />} 
              trendValue="+2%" 
              trendText="desde o mês passado" 
              trendStatus="positive" 
            />
            <StatCard 
              title="Total de alunos" 
              value="1.240" 
              icon={<User size={24} />} 
              trendValue="-5%" 
              trendText="redução anual" 
              trendStatus="negative" 
            />
            <StatCard 
              title="Total de professores" 
              value="48" 
              icon={<GraduationCap size={24} />} 
              trendValue="Estável" 
              trendText="nas últimas 4 semanas" 
              trendStatus="neutral" 
            />
            <StatCard 
              title="Chamadas hoje" 
              value="156" 
              icon={<CheckCircle size={24} />} 
              trendValue="+12%" 
              trendText="pico de frequência" 
              trendStatus="positive" 
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
