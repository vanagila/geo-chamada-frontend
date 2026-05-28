import { NavLink, useNavigate } from "react-router-dom";
import { MapPin, LayoutDashboard, BookOpen, Users, Presentation, GraduationCap, FileText, LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const getNavItems = () => {
    if (user?.tipo === 'ADMIN') {
      return [
        { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
        { label: 'Disciplinas', icon: <BookOpen size={20} />, path: '/admin/disciplinas' },
        { label: 'Turmas', icon: <Users size={20} />, path: '/admin/turmas' },
        { label: 'Professores', icon: <Presentation size={20} />, path: '/admin/professores' },
        { label: 'Alunos', icon: <GraduationCap size={20} />, path: '/admin/alunos' },
      ];
    }

    if (user?.tipo === 'PROFESSOR') {
      return [
        { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/professor/dashboard' },
        { label: 'Minhas Turmas', icon: <Users size={20} />, path: '/professor/turmas' },
      ];
    }

    return [
      { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/aluno/dashboard' },
      { label: 'Minhas Turmas', icon: <Users size={20} />, path: '/aluno/turmas' },
      { label: 'Histórico', icon: <FileText size={20} />, path: '/aluno/historico' },
    ];
  };

  const navItems = getNavItems();

  return (
    <aside className='w-64 h-full bg-card border-r border-border flex flex-col transition-colors'>
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
        <div onClick={logout} className='flex items-center gap-3 px-3 rounded-lg transition-colors cursor-pointer group hover:bg-error/10'>
          <div className='w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand text-sm'>
            {user?.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className='flex flex-col flex-1'>
            <p className='text-sm font-semibold text-text-main truncate max-w-[120px]'>
              {user?.nome || 'Usuário'}
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

export default Sidebar;
