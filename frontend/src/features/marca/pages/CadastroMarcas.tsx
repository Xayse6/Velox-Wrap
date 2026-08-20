import "../css/marca.css";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import type { FormEvent } from "react";

import useMarcaForm from "../hooks/userMarcasForm";

export default function MarcaForm() {
    const { id } = useParams();

    const navigate = useNavigate();

    const {
        nome_Marca,
        sigla_Marca,
        setNome_Marca,
        setSigla_Marca,
        carregando,
        cadastrar,
        editar,
        mensagem,
        tipoMensagem,
        limparMensagem,
        modoEdicao,
    } = useMarcaForm(id);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const sucesso = modoEdicao
            ? await editar()
            : await cadastrar();

        if (sucesso) {
            navigate("/marcas");
        }
    };

    return (
        <main className="usuarios-form-container">

            <div className="usuarios-form-header">

                <h1>
                    {modoEdicao
                        ? "Editar Marca"
                        : "Cadastrar Marca"}
                </h1>

                <p>
                    {modoEdicao
                        ? "Altere os dados da marca."
                        : "Preencha os dados abaixo para cadastrar uma nova marca."}
                </p>

            </div>

            <div className="usuario-form-table">

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
                        ></i>

                        <span>
                            {mensagem}
                        </span>

                        <button
                            type="button"
                            onClick={limparMensagem}
                            aria-label="Fechar mensagem"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                )}

                <div className="UserForm-form">

                    <form onSubmit={handleSubmit}>

                        {/* Nome da Marca */}

                        <div>

                            <label htmlFor="nome_Marca">
                                Nome da Marca
                            </label>

                            <input
                                type="text"
                                id="nome_Marca"
                                name="nome_Marca"
                                placeholder="Digite o nome da marca"
                                value={nome_Marca}
                                onChange={(event) =>
                                    setNome_Marca(
                                        event.target.value
                                    )
                                }
                                maxLength={100}
                                required
                            />

                        </div>

                        {/* Sigla */}

                        <div>

                            <label htmlFor="sigla_Marca">
                                Sigla da Marca
                            </label>

                            <input
                                type="text"
                                id="sigla_Marca"
                                name="sigla_Marca"
                                placeholder="Digite a sigla da marca"
                                value={sigla_Marca}
                                onChange={(event) =>
                                    setSigla_Marca(
                                        event.target.value.toUpperCase()
                                    )
                                }
                                maxLength={5}
                                required
                            />

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
                                    : "Cadastrar Marca"}
                        </button>

                    </form>

                </div>

                {/* Rodapé */}

                <div className="UserForm-footer">

                    <p>

                        <Link
                            className="no-underline"
                            to="/marcas"
                        >
                            Voltar para marcas
                        </Link>

                    </p>

                </div>

            </div>

        </main>
    );
}