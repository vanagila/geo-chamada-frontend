import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import Signup from './pages/Signup'
import Login from './pages/Login'
import AdminDashboard from './pages/Admin/AdminDashboard'
import TeacherDashboard from './pages/Teacher/TeacherDashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/cadastro' element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/admin-dashboard' element={<AdminDashboard/>} />
            <Route path='/professor-dashboard' element={<TeacherDashboard/>} />
            <Route path='/' element={<Navigate to='/login' replace/>} />
            <Route path='*' element={<Navigate to="/login" replace/>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
