import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import Signup from './pages/Signup'
import Login from './pages/Login'
import AdminDashboard from './pages/Admin/AdminDashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/cadastro' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
