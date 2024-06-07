import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GerenciarSuino = () => {
  const [suinos, setSuinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchSuinos = async () => {
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

        const response = await axios.get('http://localhost:8080/porkManagerApi/suino/getAllSuinos', config);
        setSuinos(response.data);
        setError(null);
      } catch (error) {
        setError('Erro ao carregar suínos. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuinos();
  }, []);

  const handleDeleteSuino = async (suinoId) => {
    if (window.confirm('Tem certeza que deseja excluir o suíno?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token JWT não encontrado no armazenamento local.');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        await axios.delete(`http://localhost:8080/porkManagerApi/suino/deleteSuino/${suinoId}`, config);
        setSuinos(suinos.filter(suino => suino.id !== suinoId));
        setSuccessMessage('Suíno deletado com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar suíno:', error);
      }
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200 min-h-screen">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl mx-auto">
          Gerenciar Suínos
        </h1>
        <a href="/cadastrarSuino" className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Cadastrar Suíno</a>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="hidden md:table w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
          <tr className="border-b">
              <th className="text-left p-3 px-5">Identificação de Orelha</th>
              <th className="text-left p-3 px-5">Data de Nascimento</th>
              <th className="text-left p-3 px-5">Sexo</th>
              <th className="text-left p-3 px-5">Observações</th>
              <th className="text-left p-3 px-5">Tipo de Suíno</th>
              <th className="text-left p-3 px-5">ID do Usuário</th>
              <th className="text-left p-3 px-5">ID do Alojamento</th>
              <th className="text-left p-3 px-5">ID da Raça</th>
              <th className="text-left p-3 px-5">Ações</th>
            </tr>
            {suinos.map((suino) => (
              <tr key={suino.id} className="border-b hover:bg-orange-100 bg-gray-100">
                <td className="p-3 px-5">{suino.identificacaoOrelha}</td>
                <td className="p-3 px-5">{suino.dataNasc}</td>
                <td className="p-3 px-5">{suino.sexo}</td>
                <td className="p-3 px-5">{suino.observacoes}</td>
                <td className="p-3 px-5">{suino.tipoSuino}</td>
                <td className="p-3 px-5">{suino.idUsuario}</td>
                <td className="p-3 px-5">{suino.alojamentoId}</td>
                <td className="p-3 px-5">{suino.idRaca}</td>
                <td className="p-3 px-5 flex justify-end">
                  <a href={`/editarSuino/${suino.id}`} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</a>
                  <button onClick={() => handleDeleteSuino(suino.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="md:hidden w-full">
          {suinos.map((suino) => (
            <div key={suino.id} className="bg-white shadow-md rounded mb-4 p-4">
              <p><strong>Identificação de Orelha:</strong> {suino.identificacaoOrelha}</p>
              <p><strong>Data de Nascimento:</strong> {suino.dataNasc}</p>
              <p><strong>Sexo:</strong> {suino.sexo}</p>
              <p><strong>Observações:</strong> {suino.observacoes}</p>
              <p><strong>Tipo de Suíno:</strong> {suino.tipoSuino}</p>
              <p><strong>ID do Usuário:</strong> {suino.idUsuario}</p>
              <p><strong>ID do Alojamento:</strong> {suino.alojamentoId}</p>
              <p><strong>ID da Raça:</strong> {suino.idRaca}</p>
              <div className="flex justify-end mt-2">
                <a href={`/editarSuino/${suino.id}`} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</a>
                <button onClick={() => handleDeleteSuino(suino.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Excluir</button>
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
              <path d="M14.348 5.652a1 1 0 00-1.415 0L10 8.586 7.067 5.652a1 1 0 10-1.415 1.415L8.586 10l-2.934 2.933a1 1 0 101.415 1.415L10 11.414l2.933 2.933a1 1 0 001.415-1.415L11.414 10l2.934-2.933a1 1 0 000-1.415z" />
            </svg>
          </span>
        </div>
      )}
      {loading && <p className="text-center">Carregando suínos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default GerenciarSuino;
