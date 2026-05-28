import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ProtectedRoute from './ProtectedRoute'
// Paginas publicas
import Login from '../pages/Login'
import Signup from '../pages/Signup'
// Admin
import AdminDashboard from '../pages/Admin/AdminDashboard'
// Professor
import TeacherDashboard from '../pages/Teacher/TeacherDashboard'
// Aluno
import StudentDashboard from '../pages/Student/StudentDashboard'

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-app-bg text-brand font-bold'>
        Carregando...
      </div>
    );
  }

  const getDefaultRoute = () => {
    if (!user) return '/login';
    switch (user.tipo) {
      case 'ADMIN': return '/admin/dashboard';
      case 'PROFESSOR': return '/professor/dashboard';
      case 'ALUNO': return '/aluno/dashboard';
      default: return '/login';
    }
  };

  return (
    <Routes>
      {/*Rotas publicas*/}
      <Route path='/cadastro' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Navigate to={getDefaultRoute()} replace />} />

      {/*Admin*/}
      <Route path='/admin/dashboard' 
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard/>
          </ProtectedRoute>
        }
      />

      {/*Professor*/}
      <Route path='/professor/dashboard' 
        element={
          <ProtectedRoute allowedRoles={['PROFESSOR']}>
            <TeacherDashboard/>
          </ProtectedRoute>
        }
      />

      {/*Aluno*/}
      <Route path='/aluno/dashboard'
        element={
          <ProtectedRoute allowedRoles={['ALUNO']}>
            <StudentDashboard/>
          </ProtectedRoute>
        }
      />

      <Route path='*' element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  )
}

export default AppRoutes;
