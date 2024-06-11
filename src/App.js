import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthenticatedLayout from './components/AuthenticatedLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import GerenciarUsuario from './pages/GerenciarUsuario';
import CadastrarUsuario from './pages/CadastrarUsuario';
import EditarUsuario from './pages/EditarUsuario';
import GerenciarAlojamentos from './pages/GerenciarAlojamento';
import GerenciarSuinos from './pages/GerenciarSuino';
import GerenciarRacas from './pages/GerenciarRaca';
import GerenciarSaude from './pages/GerenciarSaude';
import EditarAlojamento from './pages/EditarAlojamento';
import CadastrarAlojamento from './pages/CadastrarAlojamento';
import CadastrarRacas from './pages/CadastrarRaca';
import EditarRaca from './pages/EditarRaca';
import CadastrarSuino from './pages/CadastrarSuino';
import EditarSuino from './pages/EditarSuino';
import CadastrarSaude from './pages/CadastrarSaude';
import EditarSaude from './pages/EditarSaude';

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
        <Route
          path="/editarUsuario/:userId" 
          element={
            <AuthenticatedLayout>
              <EditarUsuario />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/gerenciarAlojamento"
          element={
            <AuthenticatedLayout>
              <GerenciarAlojamentos />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/cadastrarAlojamento"
          element={
            <AuthenticatedLayout>
              <CadastrarAlojamento />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/editarAlojamento/:alojamentoId" 
          element={
            <AuthenticatedLayout>
              <EditarAlojamento />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/gerenciarSuino"
          element={
            <AuthenticatedLayout>
              <GerenciarSuinos />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/editarSuino/:suinoId" 
          element={
            <AuthenticatedLayout>
              <EditarSuino />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/cadastrarSuino"
          element={
            <AuthenticatedLayout>
              <CadastrarSuino />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/gerenciarRaca"
          element={
            <AuthenticatedLayout>
              <GerenciarRacas />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/editarRaca/:racaId" 
          element={
            <AuthenticatedLayout>
              <EditarRaca />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/cadastrarRaca"
          element={
            <AuthenticatedLayout>
              <CadastrarRacas />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/gerenciarSaude"
          element={
            <AuthenticatedLayout>
              <GerenciarSaude />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/cadastrarSaude"
          element={
            <AuthenticatedLayout>
              <CadastrarSaude />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/editarSaude/:saudeId" 
          element={
            <AuthenticatedLayout>
              <EditarSaude />
            </AuthenticatedLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
