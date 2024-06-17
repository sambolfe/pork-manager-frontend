import React, { useState } from 'react';
import axios from 'axios';

const CadastrarRaca = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [caracteristicas, setCaracteristicas] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const config = getTokenConfig();

            const racaData = {
                nome,
                descricao,
                caracteristicas
            };

            await axios.post('http://localhost:8080/porkManagerApi/raca/saveRaca', racaData, config);
            console.log('Raça cadastrada com sucesso!');
            setSuccessMessage('Raça cadastrada com sucesso! Redirecionando...');
            setTimeout(() => {
                setSuccessMessage('');
                window.location.href = '/gerenciarRaca';
            }, 3000);
        } catch (error) {
            console.error('Erro ao cadastrar raça:', error);
            setError('Erro ao cadastrar raça. Por favor, tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-4">Cadastrar Raça</h1>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
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
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="descricao">
                                Descrição
                            </label>
                            <textarea
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="descricao"
                                placeholder="Descrição"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="caracteristicas">
                                Características
                            </label>
                            <textarea
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="caracteristicas"
                                placeholder="Características"
                                value={caracteristicas}
                                onChange={(e) => setCaracteristicas(e.target.value)}
                                required
                            />
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

export default CadastrarRaca;
