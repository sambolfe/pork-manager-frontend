import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GerenciarAlojamento = () => {
  const [alojamentos, setAlojamentos] = useState([]);
  const [totalAlojamentos, setTotalAlojamentos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchAlojamentos = async () => {
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

        const response = await axios.get('http://localhost:8080/porkManagerApi/alojamento/getAllAlojamentos', config);
        setAlojamentos(response.data);
        setTotalAlojamentos(response.data.length);
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar alojamentos:', error);
        setError('Erro ao carregar alojamentos. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlojamentos();
  }, []);

  const handleDeleteAlojamento = async (id) => {
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

      await axios.delete(`http://localhost:8080/porkManagerApi/alojamento/deleteAlojamento/${id}`, config);

      setAlojamentos(alojamentos.filter(alojamento => alojamento.id !== id));
      setTotalAlojamentos(totalAlojamentos - 1);
      setSuccessMessage('Alojamento excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir alojamento:', error);
      setError('Não é possível excluir o alojamento!! Há suínos cadastrados nele.');
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200 min-h-screen">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl mx-auto">
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
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
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
      {loading && <p className="text-center">Carregando alojamentos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <p className="text-center">Total de Alojamentos cadastrados: {totalAlojamentos}</p>
    </div>
  );
};

export default GerenciarAlojamento;