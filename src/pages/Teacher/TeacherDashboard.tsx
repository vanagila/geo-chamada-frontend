import { BookOpen, Plus, Users } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import ClassCard from '../../components/ClassCard';
import GeofenceCard from '../../components/GeofenceCard';
import AttendanceHistoryTable from '../../components/AttendanceHistoryTable';

const TeacherDashboard = () => {
  return (
    <div className='flex flex-col h-screen overflow-hidden bg-app-bg font-sans'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto p-8 space-y-8'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div>
              <h2 className='text-2xl font-bold text-text-main tracking-tight'>
                Bem-vindo, Prof. Silva
              </h2>
              <p className='text-text-muted text-sm mt-1'>
                Gerencie as suas frequências e turmas em tempo real.
              </p>
            </div>
            <div className='flex flex-wrap items-center gap-3'>
              <div className='relative'>
                <BookOpen className='absolute left-3 top-1/2 -translate-y-1/2 text-text-muted' size={16} />
                <select className='pl-9 pr-8 py-2.5 rounded-lg border border-border bg-card text-sm font-medium text-text-main focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all cursor-pointer'>
                  <option>Todas as Turmas</option>
                  <option>Engenharia de Software - 4A</option>
                  <option>Arquitetura de Dados - 6B</option>
                  <option>Redes de Computadores - 2C</option>
                </select>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 space-y-8'>
              <section>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='font-bold text-lg flex items-center gap-2 text-text-main'>
                    <Users className='text-brand' size={20} />
                    Turmas do Dia
                  </h3>
                  <button className='text-brand text-sm font-medium hover:underline cursor-pointer bg-transparent border-none'>
                    Ver todas
                  </button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <ClassCard 
                    nome='Eng. de Software - 4A' 
                    horario='08:00 - 10:00' 
                    sala='Sala 204' 
                    totalAlunos={40} 
                    status='pronta' 
                  />
                  <ClassCard 
                    nome='Arquitetura de Dados - 6B' 
                    horario='10:15 - 12:15' 
                    sala='Lab 05' 
                    totalAlunos={28} 
                    status='aguardando' 
                  />
                </div>
              </section>
              <AttendanceHistoryTable />
            </div>
            <div className='lg:col-span-1 space-y-6'>
              <GeofenceCard />
              <div className='bg-card-dark text-white p-5 rounded-xl shadow-sm border border-border-dark'>
                <h4 className='text-text-muted text-xs font-bold uppercase tracking-widest mb-4'>
                  Métricas de Hoje
                </h4>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-slate-300'>Média de Presença</span>
                    <span className='text-lg font-bold text-success'>88%</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-slate-300'>Alertas de Evasão</span>
                    <span className='text-lg font-bold text-warning'>03</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;
