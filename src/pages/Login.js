import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados de login para o backend
    console.log('CPF:', cpf);
    console.log('Senha:', password);
    
    // Redirecionar para a página Home após o login bem-sucedido
    window.location.href = '/home';
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <div className="mb-6">
          <img
            src="/caminho/para/sua/imagem.jpg"
            alt="Logo"
            className="w-full h-auto"
          />
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="cpf" className="block mb-1">CPF:</label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
