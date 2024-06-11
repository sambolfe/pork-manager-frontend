import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const EditarUsuario = () => {
    const navigate = useNavigate();

    const { userId } = useParams();
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [role, setRole] = useState('');
    const [active, setActive] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
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
            const response = await axios.get(`http://localhost:8080/porkManagerApi/usuario/getUsuario/${userId}`, config);
            const userData = response.data;
            setNome(userData.nome);
            setCpf(userData.cpf);
            setSenha(userData.senha);
            setRole(userData.role);
            setActive(userData.active);
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            setError('Erro ao buscar dados do usuário. Por favor, tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

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

            const activeBoolean = active === "true";

            const userData = {
                nome: nome,
                cpf: cpf,
                senha: senha,
                role: role,
                active: activeBoolean
            };

            await axios.put(`http://localhost:8080/porkManagerApi/usuario/updateUsuario/${userId}`, userData, config);
            setSuccessMessage('Usuário atualizado com sucesso! Redirecionando para página de usuarios em 5 segundos...');
            setTimeout(() => {
                navigate('/gerenciarUsuario');
            }, 5000);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            setError('Erro ao atualizar usuário. Por favor, tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
            <div className="w-full max-w-lg">
                <h1 className="text-3xl font-bold mb-4">Editar Usuário</h1>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nome">
                            Nome
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nome" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </div>
                    <div className="mb-4">
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
                    <div className="mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cpf">
                            CPF
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="cpf" type="text" placeholder="12345678901" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
                            Status
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="status"
                                value={active ? "true" : "false"}
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
                    <div className="mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="senha">
                            Senha
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="senha" type="password" placeholder="******************" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={loading}>
                            {loading ? 'Aguarde...' : 'Salvar'}
                        </button>
                        {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    </div>
                </form>
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative shadow-md mx-auto mt-4 w-full">
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
            </div>
        </div>
    );
};

export default EditarUsuario;
