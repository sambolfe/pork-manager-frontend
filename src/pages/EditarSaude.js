import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditarSaude = () => {
    const { saudeId } = useParams();
    const navigate = useNavigate();

    const [tipoTratamento, setTipoTratamento] = useState('');
    const [dataInicioTratamento, setDataInicioTratamento] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [dataEntradaCio, setDataEntradaCio] = useState('');
    const [peso, setPeso] = useState('');
    const [idSuino, setIdSuino] = useState('');
    const [identificadoresOrelha, setIdentificadoresOrelha] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [idOrelha, setIdOrelha] = useState('');
    const [idOrelhaTeste,setIdOrelhaTeste] = useState('')

    useEffect(() => {
        const fetchIdentificadoresSuino = async () => {
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
                const response = await axios.get('http://localhost:8080/porkManagerApi/suino/getAllIdentificadoresOrelha', config);
                setIdentificadoresOrelha(response.data);
                console.log(response.data);
                const saudeResponse = await axios.get(`http://localhost:8080/porkManagerApi/saude/getSaude/${saudeId}`, config);
                console.log(saudeResponse);
                const saudeData = saudeResponse.data;
                setTipoTratamento(saudeData.tipoTratamento);
                setDataInicioTratamento(saudeData.dataInicioTratamento);
                setObservacoes(saudeData.observacoes);
                setDataEntradaCio(saudeData.dataEntradaCio);
                setPeso(saudeData.peso);
                setIdSuino(saudeData.idSuino);
                  setIdOrelhaTeste(saudeData.identificadorOrelha)
                  console.log(idOrelhaTeste)
                 setIdOrelha(saudeData.identificadorOrelha)
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar identificadores de suíno ou dados de saúde:', error);
                setError('Erro ao carregar dados para edição. Por favor, tente novamente mais tarde.');
            }
        };

        fetchIdentificadoresSuino();
    }, [saudeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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

            const saudeData = {
                tipoTratamento,
                dataInicioTratamento,
                observacoes,
                dataEntradaCio,
                peso,
                idSuino,
                idOrelhaTeste
            };

            await axios.put(`http://localhost:8080/porkManagerApi/saude/updateSaude/${saudeId}`, saudeData, config);
            setSuccessMessage('Registro de saúde atualizado com sucesso! redirecionando...');
            setTimeout(() => {
                navigate('/gerenciarSaude');
            }, 3000);
        } catch (error) {
            console.error('Erro ao atualizar dados de saúde:', error);
            setError('Erro ao atualizar dados de saúde. Por favor, tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-4">Editar Saúde</h1>
                <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3"><label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="identificadorOrelha">
                            Identificador de Orelha
                        </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="identificadorOrelha"
                                value={idOrelhaTeste}  
                                onChange={(e) => setIdOrelhaTeste(e.target.value)}  
                            >
                                
                                {identificadoresOrelha.map(identificador => (
                                    <option key={identificador.idSuino} value={identificador.idSuino}> 
                                        {identificador.identificadorOrelha}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tipoTratamento">
                                Tipo de Tratamento
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="tipoTratamento"
                                type="text"
                                placeholder="Tipo de Tratamento"
                                value={tipoTratamento}
                                onChange={(e) => setTipoTratamento(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dataInicioTratamento">
                                Data de Início do Tratamento
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="dataInicioTratamento"
                                type="date"
                                value={dataInicioTratamento}
                                onChange={(e) => setDataInicioTratamento(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="observacoes">
                                Observações
                            </label>
                            <textarea
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="observacoes"
                                placeholder="Observações"
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dataEntradaCio">
                                Data de Entrada no Cio
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="dataEntradaCio"
                                type="date"
                                value={dataEntradaCio || ''}
                                onChange={(e) => setDataEntradaCio(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="peso">
                                Peso
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="peso"
                                type="number"
                                placeholder="Peso"
                                value={peso || ''}
                                onChange={(e) => setPeso(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Salvando...' : 'Salvar'}
                            </button>
                            {error && <p className="text-red-500 text-xs italic">{error}</p>}
                        {successMessage && (
                            <p className="bg-green-200 text-green-800 px-4 py-2 rounded">{successMessage}</p>
                        )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarSaude;

