import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditarAlojamento = () => {
    const { alojamentoId } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchAlojamentoData();
    }, []);

    const getTokenConfig = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token JWT não encontrado no armazenamento local.');
        }
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    const fetchAlojamentoData = async () => {
        setLoading(true);
        try {
            const config = getTokenConfig();
            const response = await axios.get(`http://localhost:8080/porkManagerApi/alojamento/getAlojamento/${alojamentoId}`, config);
            const alojamentoData = response.data;
            
            setNome(alojamentoData.nome);
            setStatus(alojamentoData.status);
        } catch (error) {
            console.error('Erro ao buscar dados do alojamento:', error);
            setError('Erro ao buscar dados do alojamento. Por favor, tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const config = getTokenConfig();
    
            const statusEnviado = status.toUpperCase() === "ATIVO" ? "ATIVO" : "INATIVO";
            console.log('Status enviado para o backend:', statusEnviado);
    
            const alojamentoData = {
                nome,
                status: statusEnviado
            };
    
            await axios.put(`http://localhost:8080/porkManagerApi/alojamento/updateAlojamento/${alojamentoId}`, alojamentoData, config);
            console.log('Alojamento atualizado com sucesso!');
            setSuccessMessage('Alojamento atualizado com sucesso! Redirecionando para a página de Alojamentos');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/gerenciarAlojamentos');
            }, 5000);
        } catch (error) {
            console.error('Erro ao atualizar alojamento:', error);
            setError('Erro ao atualizar alojamento. Por favor, tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-4">Editar Alojamento</h1>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nome">
                                Nome
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="nome"
                                type="text"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
                                Status
                            </label>
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Aguarde...' : 'Salvar'}
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

export default EditarAlojamento;
