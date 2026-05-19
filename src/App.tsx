import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Signup } from './pages/Signup'
export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/cadastro" element={<Signup/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}
