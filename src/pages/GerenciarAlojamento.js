import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GerenciarAlojamento = () => {
  const [alojamentos, setAlojamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // Estado para mensagem de sucesso

  useEffect(() => {
    const fetchAlojamentos = async () => {
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
        const response = await axios.get('http://localhost:8080/porkManagerApi/alojamento/getAllAlojamentos', config);

        // Definir os alojamentos com base na resposta
        setAlojamentos(response.data);
        setError(null);
      } catch (error) {
        setError('Erro ao carregar alojamentos. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    // Chamar a função de busca de alojamentos ao montar o componente
    fetchAlojamentos();
  }, []);

  // Função para deletar alojamento
  const handleDeleteAlojamento = async (alojamentoId) => {
    if (window.confirm('Tem certeza que deseja excluir o alojamento?')) { // Adicionando confirmação
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

        // Enviar solicitação para deletar o alojamento
        await axios.delete(`http://localhost:8080/porkManagerApi/alojamento/deleteAlojamento/${alojamentoId}`, config);

        // Atualizar a lista de alojamentos após deletar o alojamento com sucesso
        setAlojamentos(alojamentos.filter(alojamento => alojamento.id !== alojamentoId));

        // Definir mensagem de sucesso
        setSuccessMessage('Alojamento deletado com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar alojamento:', error);
      }
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200 min-h-screen">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl mx-auto"> {/* Adicionando a classe mx-auto para centralizar horizontalmente */}
          Controle de Alojamento
        </h1>
        <a href="/cadastrarAlojamento" className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Cadastrar Alojamento</a>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="hidden md:table w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Nome</th>
              <th className="text-left p-3 px-5">Tipo</th>
              <th className="text-left p-3 px-5">Capacidade</th>
              <th className="text-left p-3 px-5">Status</th>
              <th className="text-right p-3 px-5 align-top">Ações</th>
            </tr>
            {alojamentos.map((alojamento) => (
              <tr key={alojamento.id} className="border-b hover:bg-orange-100 bg-gray-100">
                <td className="p-3 px-5">{alojamento.nome}</td>
                <td className="p-3 px-5">{alojamento.tipo}</td>
                <td className="p-3 px-5">{alojamento.capacidade}</td>
                <td className="p-3 px-5">{alojamento.status}</td>
                <td className="p-3 px-5 flex justify-end">
                  <a href={`/editarAlojamento/${alojamento.id}`} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</a>
                  <button onClick={() => handleDeleteAlojamento(alojamento.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="md:hidden w-full">
          {alojamentos.map((alojamento) => (
            <div key={alojamento.id} className="bg-white shadow-md rounded mb-4 p-4">
              <p><strong>Nome:</strong> {alojamento.nome}</p>
              <p><strong>Tipo:</strong> {alojamento.tipo}</p>
              <p><strong>Capacidade:</strong> {alojamento.capacidade}</p>
              <p><strong>Status:</strong> {alojamento.status}</p>
              <div className="flex justify-end mt-2">
                <a href={`/editarAlojamento/${alojamento.id}`} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</a>
                <button onClick={() => handleDeleteAlojamento(alojamento.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Excluir</button>
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
    </div>
  );
};

export default GerenciarAlojamento;
