import "../css/modeloCadastro.css";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import type { FormEvent } from "react";

import useModeloForm from "../hooks/userModelosForm";

export default function CadastroModelos() {
    const { id } = useParams();

    const navigate = useNavigate();

    const {
        nomeModelo,
        anoModelo,
        idMarca,
        setNomeModelo,
        setAnoModelo,
        setIdMarca,
        marcas,
        carregando,
        cadastrar,
        editar,
        mensagem,
        tipoMensagem,
        limparMensagem,
        modoEdicao,
    } = useModeloForm(id);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const sucesso = modoEdicao
            ? await editar()
            : await cadastrar();

        if (sucesso) {
            navigate("/modelos");
        }
    };

    return (
        <main className="modelo-form-container">

            <div className="modelo-form-header">

                <h1>
                    {modoEdicao
                        ? "Editar Modelo"
                        : "Cadastrar Modelo"}
                </h1>

                <p>
                    {modoEdicao
                        ? "Altere os dados do modelo."
                        : "Preencha os dados para cadastrar um novo modelo."}
                </p>

            </div>

            <div className="modelo-form-card">

                {mensagem && (
                    <div
                        className={`modelo-mensagem ${tipoMensagem}`}
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

                <div className="modelo-form">

                    <form onSubmit={handleSubmit}>

                        {/* Nome do Modelo */}

                        <div className="modelo-form-group">

                            <label htmlFor="nomeModelo">
                                Nome do Modelo
                            </label>

                            <input
                                type="text"
                                id="nomeModelo"
                                value={nomeModelo}
                                onChange={(event) =>
                                    setNomeModelo(
                                        event.target.value
                                    )
                                }
                                placeholder="Digite o nome do modelo"
                                maxLength={100}
                                required
                            />

                        </div>

                        {/* Ano e Marca */}

                        <div className="modelo-form-row">

                            <div className="modelo-form-group">

                                <label htmlFor="anoModelo">
                                    Ano do Modelo
                                </label>

                                <input
                                    type="number"
                                    id="anoModelo"
                                    value={anoModelo}
                                    onChange={(event) =>
                                        setAnoModelo(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Ex: 2025"
                                    min="1900"
                                    max="2100"
                                    required
                                />

                            </div>

                            <div className="modelo-form-group">

                                <label htmlFor="marca">
                                    Marca
                                </label>

                                <select
                                    id="marca"
                                    value={idMarca}
                                    onChange={(event) =>
                                        setIdMarca(
                                            event.target.value
                                        )
                                    }
                                    required
                                >

                                    <option value="">
                                        Selecione uma marca
                                    </option>

                                    {marcas.map((marca) => (

                                        <option
                                            key={marca.id_Marca}
                                            value={marca.id_Marca}
                                        >
                                            {marca.nome_Marca} (
                                            {marca.sigla_Marca}
                                            )
                                        </option>

                                    ))}

                                </select>

                            </div>

                        </div>

                        {/* Botão */}

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
                                    : "Cadastrar Modelo"}
                        </button>

                    </form>

                </div>

                {/* Rodapé */}

                <div className="modelo-form-footer">

                    <p>
                        <Link to="/modelos">
                            Voltar para modelos
                        </Link>
                    </p>

                </div>

            </div>

        </main>
    );
}