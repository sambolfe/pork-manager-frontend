import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastrarSuino = () => {
  const [formData, setFormData] = useState({
    idRaca: '',
    identificacaoOrelha: '',
    dataNasc: '',
    sexo: '',
    observacoes: '',
    tipoSuino: ''
  });

  const [racas, setRacas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function fetchRacas() {
      try {
        const response = await axios.get('URL_DO_ENDPOINT_DE_RACAS');
        setRacas(response.data);
      } catch (error) {
        console.error('Erro ao buscar raças:', error);
      }
    }

    fetchRacas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('URL_DO_ENDPOINT_DE_CADASTRO_DE_SUINO', formData);
      console.log('Suíno cadastrado com sucesso:', response.data);
      setSuccessMessage('Suíno cadastrado com sucesso!');
      // Limpar os campos do formulário
      setFormData({
        idRaca: '',
        identificacaoOrelha: '',
        dataNasc: '',
        sexo: '',
        observacoes: '',
        tipoSuino: ''
      });
    } catch (error) {
      console.error('Erro ao cadastrar suíno:', error);
      setError('Erro ao cadastrar suíno. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Cadastrar Suíno</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="idRaca">
                Raça
              </label>
              <select
                name="idRaca"
                value={formData.idRaca}
                onChange={handleChange}
                className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-4"
              >
                <option value="">Selecione a Raça</option>
                {racas.map((raca) => (
                  <option key={raca.id} value={raca.id}>{raca.nome}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Demais campos do formulário */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Aguarde...' : 'Cadastrar'}
            </button>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            {successMessage && (
              <p className="bg-green-200 text-green-800 px-4 py-2 rounded">{successMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastrarSuino;
