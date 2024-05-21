import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GerenciarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);

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
        setError(null);
      } catch (error) {
        setError('Erro ao carregar usuários. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    // Chamar a função de busca de usuários ao montar o componente
    fetchUsuarios();
  }, []);

  // Função para deletar usuário
  const handleDeleteUser = async (userId) => {
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
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl mx-auto"> {/* Adicionando a classe mx-auto para centralizar horizontalmente */}
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
    </div>
  );
};

export default GerenciarUsuario;
