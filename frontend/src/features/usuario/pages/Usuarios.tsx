import { Link } from "react-router-dom";

import "../css/usuario.css";

import useUsers from "../hooks/useUsers";

export default function Users() {
    const {
        usuarios,
        carregando,
        erro,
        deleteUser,
    } = useUsers();

    return (
        <main className="usuarios-container">

            {/* HEADER */}
            <section className="usuarios-header">

                <div>
                    <h1>Usuários</h1>

                    <p>
                        Gerenciamento completo de usuários do sistema
                    </p>
                </div>

                <Link
                    to="/cadastro"
                    className="btn-novo"
                >
                    <i className="fas fa-user-plus"></i>
                    Novo Usuário
                </Link>

            </section>

            {/* TABELA */}
            <section className="usuarios-card">

                <div className="table-container">

                    {carregando && (
                        <p>
                            Carregando usuários...
                        </p>
                    )}

                    {erro && (
                        <p>
                            {erro}
                        </p>
                    )}

                    {!carregando && !erro && (
                        <table className="usuarios-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Email</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {usuarios.map((usuario) => (

                                    <tr
                                        key={usuario.id_Usuario}
                                    >

                                        {/* ID */}
                                        <td
                                            className="text-center"
                                            data-label="ID"
                                        >
                                            {usuario.id_Usuario}
                                        </td>

                                        {/* NOME */}
                                        <td data-label="Nome">
                                            {usuario.nome_Usuario}
                                        </td>

                                        {/* CPF */}
                                        <td data-label="CPF">
                                            {usuario.cpf_Usuario}
                                        </td>

                                        {/* EMAIL */}
                                        <td data-label="Email">
                                            {usuario.email_Usuario}
                                        </td>

                                        {/* AÇÕES */}
                                        <td data-label="Ações">

                                            <div className="acoes">

                                                {/* EDITAR */}
                                                <Link
                                                    to={`/usuario/edit/${usuario.id_Usuario}`}
                                                    className="btn-editar"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                    Alterar
                                                </Link>

                                                {/* EXCLUIR */}
                                                <button
                                                    type="button"
                                                    className="btn-excluir"
                                                    title="Excluir"
                                                    onClick={() =>
                                                        deleteUser(
                                                            usuario.id_Usuario
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-trash"></i>
                                                    Excluir
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>
                    )}

                </div>

            </section>

        </main>
    );
}