import React, { useState } from 'react';
import axios from 'axios';

const CadastrarUsuario = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [role, setRole] = useState('');
    const [active, setActive] = useState('');
    

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

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

            // Convertendo active para booleano
            const activeBoolean = active === "true";

            console.log('Dados enviados:', {
                nome: nome,
                cpf: cpf,
                senha: senha,
                role: role,
                active: activeBoolean
            });

            const response = await axios.post('http://localhost:8080/porkManagerApi/usuario/saveUsuario', {
                nome: nome,
                cpf: cpf,
                senha: senha,
                role: role,
                active: activeBoolean // Enviando o booleano para o backend
            }, config);

            console.log('Usuário cadastrado com sucesso:', response.data);
            setSuccessMessage('Usuário cadastrado com sucesso!');
            // Limpar os campos do formulário
            setNome('');
            setCpf('');
            setSenha('');
            setRole('');
            setActive('');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            setError('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-4">Cadastrar Usuário</h1>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="role">
                                Tipo de Usuário
                            </label>
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    <option value="ADMIN">Administrador</option>
                                    <option value="CRIADOR">Criador de Suínos</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cpf">
                                CPF
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="cpf"
                                type="text"
                                placeholder="12345678901"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
                                Status
                            </label>
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="status"
                                    value={active}
                                    onChange={(e) => setActive(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    <option value="true">Ativo</option>
                                    <option value="false">Inativo</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="senha">
                                Senha
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="senha"
                                type="password"
                                placeholder="******************"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
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

export default CadastrarUsuario;
