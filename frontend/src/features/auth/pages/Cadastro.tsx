import "../css/usuarioForm.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import useUserForm from "../hooks/useUserForm";

export default function UsuarioForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        nome,
        cpf,
        email,
        senha,

        setNome,
        setCpf,
        setEmail,
        setSenha,

        carregando,
        cadastrar,
        editar,

        mensagem,
        tipoMensagem,
        limparMensagem,

        modoEdicao,
    } = useUserForm(id);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const sucesso = modoEdicao
            ? await editar()
            : await cadastrar();

        if (sucesso) {
            navigate("/usuarios");
        }
    };

    return (
        <main className="usuarios-form-container">

            <div className="usuarios-form-header">

                <h1>
                    {modoEdicao
                        ? "Editar Usuário"
                        : "Criar Conta"}
                </h1>

                <p>
                    {modoEdicao
                        ? "Altere os dados do usuário."
                        : "Preencha os dados abaixo para se cadastrar na plataforma."}
                </p>

            </div>

            <div className="usuario-form-table">

                {mensagem && (
                    <div className={`mensagem ${tipoMensagem}`}>

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

                        <div>
                            <label htmlFor="nome">
                                Nome Completo
                            </label>

                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Digite seu nome"
                                value={nome}
                                onChange={(event) =>
                                    setNome(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="cpf">
                                CPF
                            </label>

                            <input
                                type="text"
                                id="cpf"
                                name="cpf"
                                placeholder="Digite seu CPF"
                                value={cpf}
                                maxLength={11}
                                onChange={(event) =>
                                    setCpf(
                                        event.target.value.replace(/\D/g, "")
                                    )
                                }
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email">
                                E-mail
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="senha">
                                {modoEdicao
                                    ? "Nova Senha"
                                    : "Senha"}
                            </label>

                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder={
                                    modoEdicao
                                        ? "Deixe vazio para manter a senha"
                                        : "Digite sua senha"
                                }
                                value={senha}
                                onChange={(event) =>
                                    setSenha(event.target.value)
                                }
                                required={!modoEdicao}
                            />
                        </div>

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
                                    : "Cadastrar"}
                        </button>

                    </form>

                </div>

                <div className="UserForm-footer">
                    <p>
                        {modoEdicao ? (
                            <>
                                <Link
                                    className="no-underline"
                                    to="/usuarios"
                                >
                                    Voltar para usuários
                                </Link>
                            </>
                        ) : (
                            <>
                                Possui uma conta?{" "}
                                <Link
                                    className="no-underline"
                                    to="/login"
                                >
                                    Fazer Login
                                </Link>
                            </>
                        )}
                    </p>
                </div>

            </div>

        </main>
    );
}