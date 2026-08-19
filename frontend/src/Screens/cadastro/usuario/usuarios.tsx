import { Link } from "react-router-dom";
import "../../../css/usuario/usuario.css";

interface Usuario {
  idUsuario: number;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
}

export default function usuarios() {
  const usuarios: Usuario[] = [
    {
      idUsuario: 1,
      nome: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@email.com",
      dataNascimento: "1995-05-20",
    },
    {
      idUsuario: 2,
      nome: "Maria Santos",
      cpf: "987.654.321-00",
      email: "maria@email.com",
      dataNascimento: "1998-10-15",
    },
  ];

  return (
    <main className="usuarios-container">

      <section className="usuarios-header">
        <div>
          <h1>Usuários</h1>
          <p>
            Gerenciamento completo de usuários do sistema
          </p>
        </div>

        <Link to="/NovoUsuario" className="btn-novo">
          <i className="fas fa-user-plus"></i>
          Novo Usuário
        </Link>
      </section>

      <section className="usuarios-card">
        <div className="table-container">

          <table className="usuarios-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Nascimento</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.idUsuario}>

                  <td className="text-center">
                    {usuario.idUsuario}
                  </td>

                  <td>{usuario.nome}</td>

                  <td>{usuario.cpf}</td>

                  <td>{usuario.email}</td>

                  <td className="text-center">
                    {new Date(
                      usuario.dataNascimento
                    ).toLocaleDateString("pt-BR")}
                  </td>

                  <td className="acoes">

                    <Link
                      to={`/usuario/editar/${usuario.idUsuario}`}
                      className="btn-editar"
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>

                    <button
                      type="button"
                      className="btn-excluir"
                      title="Excluir"
                    >
                      <i className="fas fa-trash"></i>
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </section>

    </main>
  );
}
