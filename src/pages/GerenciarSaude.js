import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GerenciarSaude = () => {
  const [saudes, setSaudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchSaudes = async () => {
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
        const response = await axios.get('http://localhost:8080/porkManagerApi/saude/getAllSaudes', config);
        setSaudes(response.data);
        setError(null);
      } catch (error) {
        setError('Erro ao carregar registros de saúde. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchSaudes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este registro de saúde?')) {
        return;
    }
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        await axios.delete(`http://localhost:8080/porkManagerApi/saude/deleteSaude/${id}`, config);
        setSaudes(saudes.filter(saude => saude.id !== id));
        setSuccessMessage('Registro de saúde deletado com sucesso!');
    } catch (error) {
        console.error('Erro ao deletar registro de saúde:', error);
        setError('Erro ao deletar o registro de saúde.');
    }
};

  return (
    <div className="text-gray-900 bg-gray-200 min-h-screen">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl mx-auto">Controle de Saúde</h1>
        <a href="/cadastrarSaude" className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Cadastrar Saúde</a>
      </div>
      <div className="px-3 py-4 flex justify-center">
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="hidden md:table w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Tipo de Tratamento</th>
                <th className="text-left p-3 px-5">Data Início</th>
                <th className="text-left p-3 px-5">Observações</th>
                <th className="text-left p-3 px-5">Data Entrada no Cio</th>
                <th className="text-left p-3 px-5">Peso</th>
                <th className="text-left p-3 px-5">Identificação de Orelha</th>
                <th className="text-right p-3 px-5 align-top">Ações</th>
              </tr>
              {saudes.map((saude) => (
                <tr key={saude.id} className="border-b hover:bg-orange-100 bg-gray-100">
                  <td className="p-3 px-5">{saude.tipoTratamento}</td>
                  <td className="p-3 px-5">{saude.dataInicioTratamento}</td>
                  <td className="p-3 px-5">{saude.observacoes}</td>
                  <td className="p-3 px-5">{saude.dataEntradaCio}</td>
                  <td className="p-3 px-5">{saude.peso}</td>
                  <td className="p-3 px-5">{saude.identificadorOrelha}</td>
                  <td className="p-3 px-5 flex justify-end">
                    <a href={`/editarSaude/${saude.id}`} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</a>
                    <button onClick={() => handleDelete(saude.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="md:hidden w-full">
          {saudes.map((saude) => (
            <div key={saude.id} className="bg-white shadow-md rounded mb-4 p-4">
              <p><strong>Tipo de Tratamento:</strong> {saude.tipoTratamento}</p>
              <p><strong>Data Início:</strong> {saude.dataInicioTratamento}</p>
              <p><strong>Observações:</strong> {saude.observacoes}</p>
              <p><strong>Data Entrada no Cio:</strong> {saude.dataEntradaCio}</p>
              <p><strong>Peso:</strong> {saude.peso}</p>
              <p><strong>Identificação de Orelha:</strong> {saude.identificadorOrelha}</p>
              <div className="flex justify-end mt-2">
                <a href={`/editarSaude/${saude.id}`} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</a>
                <button onClick={() => handleDelete(saude.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Excluir</button>
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

export default GerenciarSaude;
