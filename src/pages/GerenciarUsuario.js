import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GerenciarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); 

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Obter token do armazenamento local
        const token = localStorage.getItem('token');

        // Verificar se o token está presente
        if (!token) {
          throw new Error('Token JWT não encontrado no armazenamento local.');
        }

        // Configurar o cabeçalho de autorização
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // Fazer o pedido usando o token de autorização
        const response = await axios.get('http://localhost:8080/porkManagerApi/usuario/getAllUsuarios', config);

        // Definir os usuários com base na resposta
        setUsuarios(response.data);
        setTotalUsuarios(response.data.length); 
        setError(null);
      } catch (error) {
        setError('Erro ao carregar usuários. Por favor, tente novamente mais tarde.');
      }
    };

    // Chamar a função de busca de usuários ao montar o componente
    fetchUsuarios();
  }, []);

  // Função para deletar usuário
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Tem certeza que deseja excluir o usuário?')) { // Adicionando confirmação
      try {
        // Obter token do armazenamento local
        const token = localStorage.getItem('token');

        // Verificar se o token está presente
        if (!token) {
          throw new Error('Token JWT não encontrado no armazenamento local.');
        }

        // Configurar o cabeçalho de autorização
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // Enviar solicitação para deletar o usuário
        await axios.delete(`http://localhost:8080/porkManagerApi/usuario/deleteUsuario/${userId}`, config);

        // Atualizar a lista de usuários após deletar o usuário com sucesso
        setUsuarios(usuarios.filter(user => user.id !== userId));
        setTotalUsuarios(totalUsuarios - 1);

        // Definir mensagem de sucesso
        setSuccessMessage('Usuário deletado com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        setError('Não é possível deletar o usuário!! Há suínos relacionados a ele, exclua ou troque os suínos de usuário e tente novamente.');
      }
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200 min-h-screen">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl mx-auto">
          Controle de Usuário
        </h1>
        <a href="/cadastrarUsuario" className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Cadastrar Usuário</a>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="hidden md:table w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Nome</th>
              <th className="text-left p-3 px-5">CPF</th>
              <th className="text-left p-3 px-5">Status</th>
              <th className="text-left p-3 px-5">Tipo de Usuário</th>
              <th className="text-left p-3 px-5">Senha</th>
              <th className="text-right p-3 px-5 align-top">Ações</th>
            </tr>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-b hover:bg-orange-100 bg-gray-100">
                <td className="p-3 px-5">{usuario.nome}</td>
                <td className="p-3 px-5">{usuario.cpf}</td>
                <td className="p-3 px-5">{usuario.active ? 'Ativo' : 'Inativo'}</td>
                <td className="p-3 px-5">{usuario.role}</td>
                <td className="p-3 px-5">*****</td>
                <td className="p-3 px-5 flex justify-end">
                  <a href={`/editarUsuario/${usuario.id}`} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</a>
                  <button onClick={() => handleDeleteUser(usuario.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="md:hidden w-full">
          {usuarios.map((usuario) => (
            <div key={usuario.id} className="bg-white shadow-md rounded mb-4 p-4">
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>CPF:</strong> {usuario.cpf}</p>
              <p><strong>Status:</strong> {usuario.active ? 'Ativo' : 'Inativo'}</p>
              <p><strong>Tipo de Usuário:</strong> {usuario.role}</p>
              <div className="flex justify-end mt-2">
                <a href={`/editarUsuario/${usuario.id}`} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</a>
                <button onClick={() => handleDeleteUser(usuario.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative shadow-md mx-auto mt-4 w-1/2">
          <span className="block sm:inline">{successMessage}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setSuccessMessage('')}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M14.348 5.652a1 1 0 00-1.415 0L10 8.586 7.067 5.652a1 1 0 10-1.415 1.415L8.586 10l-2.934 2.933a1 1 0 101.415 1.415L10 11.414l2.933 2.934a1 1 0 101.415-1.415L11.414 10l2.934-2.933a1 1 0 000-1.415z" />
            </svg>
          </span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative shadow-md mx-auto mt-4 w-1/2">
          <span className="block sm:inline">{error}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M14.348 5.652a1 1 0 00-1.415 0L10 8.586 7.067 5.652a1 1 0 10-1.415 1.415L8.586 10l-2.934 2.933a1 1 0 101.415 1.415L10 11.414l2.933 2.934a1 1 0 101.415-1.415L11.414 10l2.934-2.933a1 1 0 000-1.415z" />
            </svg>
          </span>
        </div>
      )}
            <p className="text-center">Total de Usuários cadastrados: {totalUsuarios}</p>
    </div>
  );
};

export default GerenciarUsuario;
