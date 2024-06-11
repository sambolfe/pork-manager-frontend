import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditarSuino = () => {
    const { suinoId } = useParams();
    const navigate = useNavigate();

    const [identificacaoOrelha, setIdentificacaoOrelha] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [sexo, setSexo] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [tipoSuino, setTipoSuino] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [idRaca, setIdRaca] = useState('');
    const [nomeRaca, setNomeRaca] = useState('');
    const [racas, setRacas] = useState([]);
    const [alojamentoId, setAlojamentoId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [alojamentos, setAlojamentos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
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

                const responseSuino = await axios.get(`http://localhost:8080/porkManagerApi/suino/getSuino/${suinoId}`, config);
                const suinoData = responseSuino.data;
                setIdentificacaoOrelha(suinoData.identificacaoOrelha);
                setDataNasc(suinoData.dataNasc);
                setSexo(suinoData.sexo);
                setObservacoes(suinoData.observacoes);
                setTipoSuino(suinoData.tipoSuino);
                setIdUsuario(suinoData.idUsuario);
                setAlojamentoId(suinoData.alojamentoId);
                setNomeRaca(suinoData.nomeRaca);

                const responseUsuarios = await axios.get('http://localhost:8080/porkManagerApi/usuario/getAllUsuarios', config);
                setUsuarios(responseUsuarios.data);

                const responseAlojamentos = await axios.get('http://localhost:8080/porkManagerApi/alojamento/getAllAlojamentos', config);
                setAlojamentos(responseAlojamentos.data);

                const responseRacas = await axios.get('http://localhost:8080/porkManagerApi/raca/getAllRacas', config);
                setRacas(responseRacas.data);


                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados do suíno:', error);
                setError('Erro ao carregar dados para edição. Por favor, tente novamente mais tarde.');
            }
        };

        fetchData();
    }, [suinoId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Lógica para atualizar o suíno
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token JWT não encontrado no armazenamento local.');
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const suinoData = {
                identificacaoOrelha,
                dataNasc,
                sexo,
                observacoes,
                tipoSuino,
                idUsuario,
                alojamentoId,
                idRaca: idRaca
            };
            await axios.put(`http://localhost:8080/porkManagerApi/suino/updateSuino/${suinoId}`, suinoData, config);

            // Definir mensagem de sucesso e redirecionar após 5 segundos
            setSuccessMessage('Suíno atualizado com sucesso! Redirecionando para a página de gerenciamento...');
            setShowSuccessMessage(true);
            setTimeout(() => {
                navigate('/gerenciarSuino');
            }, 5000);
        } catch (error) {
            console.error('Erro ao atualizar suíno:', error);
            setError('Erro ao atualizar suíno. Por favor, tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-4">Editar Suíno</h1>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="identificacaoOrelha">
                                Identificação de Orelha
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="identificacaoOrelha"
                                type="text"
                                value={identificacaoOrelha}
                                onChange={(e) => setIdentificacaoOrelha(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dataNasc">
                                Data de Nascimento
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="dataNasc"
                                type="date"
                                value={dataNasc}
                                onChange={(e) => setDataNasc(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sexo">
                                Sexo
                            </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="sexo"
                                value={sexo}
                                onChange={(e) => setSexo(e.target.value)}
                                required
                            >
                                <option value="">Selecione o sexo</option>
                                <option value="MACHO">Macho</option>
                                <option value="FEMEA">Fêmea</option>
                            </select>
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
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tipoSuino">
                                Tipo de Suíno
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="tipoSuino"
                                type="text"
                                placeholder="Tipo de Suíno"
                                value={tipoSuino}
                                onChange={(e) => setTipoSuino(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="idUsuario">
                                Usuário
                            </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="idUsuario"
                                value={idUsuario}
                                onChange={(e) => setIdUsuario(e.target.value)}
                                required
                            >
                                <option value="">Selecione um usuário</option>
                                {usuarios.map(usuario => (
                                    <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="raca">
                                Raça
                            </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="raca"
                                value={idRaca}
                                onChange={(e) => setIdRaca(e.target.value)}
                                required
                            >
                                <option value="">Selecione uma raça</option>
                                {racas.map(raca => (
                                    <option key={raca.id} value={raca.id}>{raca.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="alojamentoId">
                                Alojamento
                            </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="alojamentoId"
                                value={alojamentoId}
                                onChange={(e) => setAlojamentoId(e.target.value)}
                                required
                            >
                                <option value="">Selecione um alojamento</option>
                                {alojamentos.map(alojamento => (
                                    <option key={alojamento.id} value={alojamento.id}>{alojamento.nome}</option>
                                ))}
                            </select>
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

export default EditarSuino;
