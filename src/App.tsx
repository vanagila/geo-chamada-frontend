import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/cadastro' element={<Signup/>}/>
            <Route path='/login' element={<Login/>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
