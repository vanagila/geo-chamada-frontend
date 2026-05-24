import { MoreVertical, Plus, Search, Bell, Settings, Users, User, GraduationCap, CheckCircle, MapPin, UserCheck, UserPlus, AlertTriangle, Edit } from 'lucide-react';
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar';
import StatCard from '../../ui/StatCard';
import ProgressBar from '../../ui/ProgressBar';
import Badge from '../../ui/Badge';

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

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
            {/*grafico*/}
            <div className='lg:col-span-2 bg-card p-6 rounded-lg border border-border shadow-sm'>
              <div className='flex items-center justify-between mb-8'>
                <div>
                  <h4 className='text-lg font-bold text-text-main'>Visão geral de frequência</h4>
                  <p className='text-sm text-text-muted'>Frequência semanal média de 92%</p>
                </div>
                <select className='bg-input-bg border border-border rounded-lg text-xs font-semibold py-1.5 px-3 text-text-main text-white outline-none focus:ring-2 focus:ring-brand/20'>
                  <option>Últimos 7 dias</option>
                  <option>Último mês</option>
                </select>
              </div>
              <div className='h-64 relative flex items-end justify-between gap-2'>
                {[85, 92, 88, 95, 90, 40, 35].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-brand/10 rounded-t-sm h-[85%] relative overflow-hidden">
                      <div className="absolute bottom-0 w-full bg-brand transition-all" style={{ height: `${height}%` }}></div>
                    </div>
                    <span className="text-xs font-medium text-text-muted">
                      {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/*atividades recentes*/}
          <div className='bg-card p-6 rounded-lg border border-border shadow-sm flex flex-col'>
            <h4 className='text-lg font-bold text-text-main mb-6'>Atividade Recente</h4>
            <div className='space-y-6 flex-1'>
              <div className='flex gap-4'>
                <div className='w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0 text-success'>
                  <UserCheck size={16}/>
                </div>
                <div>
                  <p className='text-sm text-text-main font-medium'>Chamada concluída</p>
                  <p className='text-xs text-text-muted mt-1'>Matemática - Prof. Ricardo • 10:30</p>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0 text-brand'>
                  <UserPlus size={16}/>
                </div>
                <div>
                  <p className='text-sm text-text-main font-medium'>Novo aluno registrado</p>
                  <p className='text-xs text-text-muted mt-1'>Ana Clara Santos - Turma B • 09:15</p>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center shrink-0 text-warning'>
                  <AlertTriangle size={16}/>
                </div>
                <div>
                  <p className='text-sm text-text-main font-medium'>Alerta de falta</p>
                  <p className="text-xs text-text-muted mt-1">5 alunos ausentes em História • 08:45</p>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 text-purple-500'>
                  <Edit size={16}/>
                </div>
                <div>
                  <p className='text-sm text-text-main font-medium'>Horário atualizado</p>
                  <p className='text-xs text-text-muted mt-1'>Turma 301 - Sala alterada • Ontem</p>
                </div>
              </div>
            </div>
            <button className='w-full mt-6 py-2 text-brand font-bold text-sm bg-brand/5 rounded-lg hover:bg-brand/10 transition-colors cursor-pointer'>
              Ver tudo
            </button>
          </div>

          {/*resumo das turmas*/}
          <div className="bg-card dark:bg-card-dark rounded-lg border border-border dark:border-border-dark overflow-hidden shadow-sm">
            <div className="p-6 border-b border-border dark:border-border-dark flex items-center justify-between">
              <h4 className="text-lg font-bold text-text-main dark:text-white">Resumo das Turmas Atuais</h4>
              <button className="flex items-center gap-2 text-brand text-sm font-bold hover:underline cursor-pointer">
                <Plus size={16} /> Nova Turma
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-input-bg dark:bg-app-bg-dark">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Turma</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Professor</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Presença</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-border-dark">
                  <tr className="hover:bg-input-bg/50 dark:hover:bg-app-bg-dark/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-text-main dark:text-white">3º Ano A - Matutino</td>
                    <td className="px-6 py-4 text-sm text-text-muted">Dr. Marcos Oliveira</td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-border dark:bg-border-dark h-2 rounded-full max-w-[80px]">
                          <div className="bg-success h-2 rounded-full w-[94%]"></div>
                        </div>
                        <span className="font-medium text-text-main dark:text-white">94%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-success/10 text-success text-[10px] font-bold uppercase rounded-md border border-success/20">Ativa</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-text-muted hover:text-brand transition-colors cursor-pointer">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-input-bg/50 dark:hover:bg-app-bg-dark/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-text-main dark:text-white">1º Ano C - Vespertino</td>
                    <td className="px-6 py-4 text-sm text-text-muted">Dra. Eliane Rocha</td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-border dark:bg-border-dark h-2 rounded-full max-w-[80px]">
                          <div className="bg-brand h-2 rounded-full w-[88%]"></div>
                        </div>
                        <span className="font-medium text-text-main dark:text-white">88%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-success/10 text-success text-[10px] font-bold uppercase rounded-md border border-success/20">Ativa</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-text-muted hover:text-brand transition-colors cursor-pointer">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-input-bg/50 dark:hover:bg-app-bg-dark/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-text-main dark:text-white">2º Ano B - Matutino</td>
                    <td className="px-6 py-4 text-sm text-text-muted">Prof. Sandra Lima</td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-border dark:bg-border-dark h-2 rounded-full max-w-[80px]">
                          <div className="bg-warning h-2 rounded-full w-[72%]"></div>
                        </div>
                        <span className="font-medium text-text-main dark:text-white">72%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-input-bg dark:bg-border-dark text-text-muted text-[10px] font-bold uppercase rounded-md border border-border">Pendente</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-text-muted hover:text-brand transition-colors cursor-pointer">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
