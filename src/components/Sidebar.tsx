import { NavLink, useNavigate } from "react-router-dom";
import { MapPin, LayoutDashboard, BookOpen, Users, Presentation, GraduationCap, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
  { label: 'Disciplinas', icon: <BookOpen size={20} />, path: '/disciplinas' },
  { label: 'Turmas', icon: <Users size={20} />, path: '/turmas' },
  { label: 'Professores', icon: <Presentation size={20} />, path: '/professores' },
  { label: 'Alunos', icon: <GraduationCap size={20} />, path: '/alunos' },
  { label: 'Relatórios', icon: <FileText size={20} />, path: '/relatorios' },
];

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className='w-64 min-h-screen bg-card border-r border-border flex flex-col transition-colors'>
      <div className='p-6 flex items-center gap-3'>
        <div className='bg-brand/10 p-2 rounded-lg text-brand flex items-center justify-center'>
          <MapPin size={24}/>
        </div>
        <div className='flex flex-col'>
          <h1 className='text-text-main text-lg font-bold leading-none tracking-tight'>
            GeoChamada
          </h1>
          <p className='text-text-muted text-ts font-medium uppercase tracking-wider mt-1'>
            Dashboard
          </p>
        </div>
      </div>

      <nav className='flex-1 px-4 py-4 flex flex-col gap-1.5'>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-brand text-white font-semibold shadow-md shadow-brand/20'
                  : 'text-text-muted hover:bg-input-bg hover:text-brand'
              }`
            }
          >
            {item.icon}
            <span className='text-sm'>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className='p-4 border-t border-border'>
        <div className='flex items-center gap-3 px-3 rounded-lg transition-colors cursor-pointer-group'>
          <div className='w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand text-sm'>
            U
          </div>
          <div className='flex flex-col flex-1'>
            <p className='text-sm font-semibold text-text-main truncate max-w-[120px]'>
              Usuário
            </p>
            <p className='text-xs text-text-muted group-hover:text-error transition-colors flex items-center gap-1 mt-0.5'>
              <LogOut size={12}/>
              Sair
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
