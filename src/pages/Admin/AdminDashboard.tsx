import {  Users, User, GraduationCap, CheckCircle } from 'lucide-react';
import Header from '../../components/layout/Header'
import Sidebar from '../../components/layout/Sidebar';
import ActivityFeed from '../../components/ActivityFeed'
import ClassSummary from '../../components/ClassSummary'
import StatCard from '../../ui/StatCard';

const AdminDashboard = () => {
  return (
    <div className='flex flex-col h-screen overflow-hidden bg-app-bg font-sans'>
      {/*header*/}
      <Header/>
      <div className='flex flex-1 overflow-hidden'>
        {/*sidebar*/}
        <Sidebar/>

        <main className='flex-1 overflow-y-auto p-8 space-y-8'>
          {/*stat cards*/}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title='Total de turmas ativas'
              value='24'
              icon={<Users size={24}/>}
              trendValue='+2%'
              trendText='desde o mês passado'
              trendStatus='positive'
            />
            <StatCard
              title='Total de alunos'
              value='1.240'
              icon={<User size={24}/>}
              trendValue='-5%'
              trendText='redução anual'
              trendStatus='negative'
            />
            <StatCard 
              title='Total de professores'
              value='48'
              icon={<GraduationCap size={24}/>}
              trendValue='Estável'
              trendText='nas últimas 4 semanas'
              trendStatus='neutral'
            />
            <StatCard 
              title='Chamadas hoje'
              value='156'
              icon={<CheckCircle size={24}/>}
              trendValue='+12%'
              trendText='pico de frequência'
              trendStatus='positive'
            />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/*grafico*/}
            <div className='lg:col-span-2 bg-card p-6 rounded-lg border border-border shadow-sm flex flex-col justify-between'>
              <div>
                <div className='flex items-center justify-between mb-8'>
                  <div>
                    <h4 className='text-lg font-bold text-text-main'>Visão geral de frequência</h4>
                    <p className='text-sm text-text-muted'>Frequência semanal média de 92%</p>
                  </div>
                  <select className='bg-input-bg border border-border rounded-lg text-xs font-semibold py-1.5 px-3 text-text-main outline-none focus:ring-2 focus:ring-brand/20'>
                    <option>Últimos 7 dias</option>
                    <option>Último mês</option>
                  </select>
                </div>

                <div className='h-64 relative flex items-end justify-between gap-2 pt-4'>
                  {[85, 92, 88, 95, 90, 40, 35].map((height, index) => (
                    <div key={index} className='flex-1 flex flex-col items-center gap-2 group'>
                      <div className='w-full bg-brand/10 rounded-t-sm h-[85%] relative overflow-hidden'>
                        <div className='absolute bottom-0 w-full bg-brand transition-all duration-500' style={{ height: `${height}%` }}></div>
                        </div>
                        <span className='text-xs font-medium text-text-muted'>
                          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][index]}
                        </span>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* atividades recentes */}
            <div className='lg:col-span-1'>
              <ActivityFeed />
            </div>
          </div>
          {/*resumo das turmas*/}
          <ClassSummary/>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
