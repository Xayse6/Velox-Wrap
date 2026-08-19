import { Link } from "react-router-dom";
import "../../../css/usuario/usuario.css";
import  Users  from "../../../hooks/users";

export default function Marca() {

    const {
        usuarios,
        carregando,
        erro,
        exUser,
    } = Users();

    return (
        <main className="usuarios-container">

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

            <section className="usuarios-card">

                <div className="table-container">

                    {carregando && (
                        <p>Carregando usuários...</p>
                    )}

                    {erro && (
                        <p>{erro}</p>
                    )}

                    {!carregando && !erro && (

                        <table className="usuarios-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {usuarios?.map((usuario) => (

                                    <tr key={usuario.idUsuario}>

                                        <td className="text-center">
                                            {usuario.idUsuario}
                                        </td>

                                        <td>
                                            {usuario.nome}
                                        </td>

                                        <td>
                                            {usuario.cpf}
                                        </td>

                                        <td className="acoes">

                                          <Link
                                              to={`/usuario/editar/${usuario.idUsuario}`}
                                              className="btn-editar"
                                              title="Alterar"
                                          >
                                              <i className="fas fa-edit"></i>
                                              Alterar
                                          </Link>

                                          <button
                                              type="button"
                                              className="btn-excluir"
                                              title="Excluir"
                                              onClick={() =>
                                                  exUser(usuario.idUsuario)
                                              }
                                          >
                                              <i className="fas fa-trash"></i>
                                              Excluir
                                          </button>

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