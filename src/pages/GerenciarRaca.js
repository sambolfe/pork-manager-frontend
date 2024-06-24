import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GerenciarRaca = () => {
  const [racas, setRacas] = useState([]);
  const [totalRacas, setTotalRacas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchRacas = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token JWT não encontrado no armazenamento local.');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('http://localhost:8080/porkManagerApi/raca/getAllRacas', config);
        setRacas(response.data);
        setTotalRacas(response.data.length); 
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar raças:', error);
        setError('Erro ao carregar raças. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchRacas();
  }, []);

  const handleDeleteRaca = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir a raça?')) {
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
  
        // Enviar solicitação para deletar a raça
        await axios.delete(`http://localhost:8080/porkManagerApi/raca/deleteRaca/${id}`, config);
  
        // Atualizar a lista de raças após deletar a raça com sucesso
        setRacas(racas.filter(raca => raca.id !== id));
        setTotalRacas(totalRacas - 1); // Atualizar o contador de raças após exclusão
  
        // Definir mensagem de sucesso
        setSuccessMessage('Raça excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir raça:', error);
        setError('Não é possível excluir a raça!! Há suínos cadastrados com essa raça.');
      }
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200 min-h-screen">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl mx-auto">
          Gerenciar Raças
        </h1>
        <a href="/cadastrarRaca" className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Cadastrar Raça</a>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="hidden md:table w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Nome</th>
              <th className="text-left p-3 px-5">Descrição</th>
              <th className="text-left p-3 px-5">Características</th>
              <th className="text-right p-3 px-5 align-top">Ações</th>
            </tr>
            {racas.map((raca) => (
              <tr key={raca.id} className="border-b hover:bg-orange-100 bg-gray-100">
                <td className="p-3 px-5">{raca.nome}</td>
                <td className="p-3 px-5">{raca.descricao}</td>
                <td className="p-3 px-5">{raca.caracteristicas}</td>
                <td className="p-3 px-5 flex justify-end">
                  <a href={`/editarRaca/${raca.id}`} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</a>
                  <button onClick={() => handleDeleteRaca(raca.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="md:hidden w-full">
          {racas.map((raca) => (
            <div key={raca.id} className="bg-white shadow-md rounded mb-4 p-4">
              <p><strong>Nome:</strong> {raca.nome}</p>
              <p><strong>Descrição:</strong> {raca.descricao}</p>
              <p><strong>Características:</strong> {raca.caracteristicas}</p>
              <div className="flex justify-end mt-2">
                <a href={`/editarRaca/${raca.id}`} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</a>
                <button onClick={() => handleDeleteRaca(raca.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Excluir</button>
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
      {loading && <p className="text-center">Carregando raças...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <p className="text-center">Total de Raças Cadastradas: {totalRacas}</p>
    </div>
  );
};

export default GerenciarRaca;
