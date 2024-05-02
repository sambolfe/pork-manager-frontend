import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthenticatedLayout from './components/AuthenticatedLayout';
import Login from './pages/Login';
import Home from './pages/Home';

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
      </Routes>
    </Router>
  );
};

export default App;
