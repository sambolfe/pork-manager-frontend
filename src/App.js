import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthenticatedLayout from './components/AuthenticatedLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import GerenciarUsuario from './pages/GerenciarUsuario';
import CadastrarUsuario from './pages/CadastrarUsuario';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <AuthenticatedLayout>
              <Home />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/gerenciarUsuario"
          element={
            <AuthenticatedLayout>
              <GerenciarUsuario />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/cadastrarUsuario"
          element={
            <AuthenticatedLayout>
              <CadastrarUsuario />
            </AuthenticatedLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
