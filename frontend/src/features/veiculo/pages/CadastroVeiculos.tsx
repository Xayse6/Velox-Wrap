import type { FormEvent } from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import "../css/veiculoCadastro.css";

import useVeiculoForm from "../hooks/useVeiculosForm";

export default function VeiculoForm() {
    const { id } = useParams();

    const navigate = useNavigate();

    const {
        idUsuario,
        idModelo,
        setIdUsuario,
        setIdModelo,
        usuarios,
        modelos,
        carregando,
        carregandoDados,
        cadastrar,
        editar,
        mensagem,
        tipoMensagem,
        limparMensagem,
        modoEdicao,
    } = useVeiculoForm(id);

    // ==========================================
    // ENVIO DO FORMULÁRIO
    // ==========================================

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const sucesso = modoEdicao
            ? await editar()
            : await cadastrar();

        if (sucesso) {
            navigate("/veiculos");
        }
    }

    // ==========================================
    // CARREGANDO DADOS
    // ==========================================

    if (carregandoDados) {
        return (
            <main className="veiculos-form-container">
                <div className="veiculos-form-loading">
                    <i className="fas fa-spinner fa-spin" />

                    <p>
                        Carregando dados...
                    </p>
                </div>
            </main>
        );
    }

    // ==========================================
    // FORMULÁRIO
    // ==========================================

    return (
        <main className="veiculos-form-container">

            {/* HEADER */}

            <div className="veiculos-form-header">

                <div>

                    <h1>
                        {modoEdicao
                            ? "Editar Veículo"
                            : "Cadastrar Veículo"}
                    </h1>

                    <p>
                        {modoEdicao
                            ? "Altere os dados do veículo."
                            : "Preencha os dados para cadastrar um novo veículo."}
                    </p>

                </div>

            </div>

            {/* CARD */}

            <div className="veiculo-form-card">

                {/* MENSAGEM */}

                {mensagem && (
                    <div
                        className={`mensagem ${tipoMensagem}`}
                    >

                        <i
                            className={
                                tipoMensagem === "sucesso"
                                    ? "fas fa-check-circle"
                                    : "fas fa-exclamation-circle"
                            }
                        />

                        <span>
                            {mensagem}
                        </span>

                        <button
                            type="button"
                            onClick={limparMensagem}
                            aria-label="Fechar mensagem"
                        >
                            <i className="fas fa-times" />
                        </button>

                    </div>
                )}

                {/* FORM */}

                <form onSubmit={handleSubmit}>

                    {/* ==================================
                        USUÁRIO
                    ================================== */}

                    <div className="campo">

                        <label htmlFor="usuario">
                            Usuário
                        </label>

                        <select
                            id="usuario"
                            value={idUsuario}
                            onChange={(event) =>
                                setIdUsuario(
                                    event.target.value
                                )
                            }
                            required
                        >

                            <option value="">
                                Selecione um usuário
                            </option>

                            {usuarios.map((usuario) => (

                                <option
                                    key={`usuario-${usuario.id_Usuario}`}
                                    value={usuario.id_Usuario}
                                >
                                    {usuario.nome_Usuario}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* ==================================
                        MODELO
                    ================================== */}

                    <div className="campo">

                        <label htmlFor="modelo">
                            Modelo
                        </label>

                        <select
                            id="modelo"
                            value={idModelo}
                            onChange={(event) =>
                                setIdModelo(
                                    event.target.value
                                )
                            }
                            required
                        >

                            <option value="">
                                Selecione um modelo
                            </option>

                            {modelos.map((modelo) => (

                                <option
                                    key={`modelo-${modelo.id_Modelo}`}
                                    value={modelo.id_Modelo}
                                >
                                    {modelo.nome_Modelo}
                                    {" - "}
                                    {modelo.ano_Modelo}
                                    {" - "}
                                    {modelo.nome_Marca}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* ==================================
                        BOTÃO
                    ================================== */}

                    <button
                        type="submit"
                        disabled={carregando}
                    >

                        {carregando
                            ? modoEdicao
                                ? "Salvando..."
                                : "Cadastrando..."
                            : modoEdicao
                                ? "Salvar Alterações"
                                : "Cadastrar Veículo"}

                    </button>

                </form>

                {/* ==================================
                    RODAPÉ
                ================================== */}

                <div className="veiculos-form-footer">

                    <Link
                        className="no-underline"
                        to="/veiculos"
                    >
                        Voltar para veículos
                    </Link>

                </div>

            </div>

        </main>
    );
}