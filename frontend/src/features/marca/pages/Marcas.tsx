import { Link } from "react-router-dom";

import "../css/marca.css";

import useMarca from "../hooks/useMarcas";

export default function Marcas() {
    const {
        marcas,
        carregando,
        erro,
    } = useMarca();

    return (
        <main className="marcas-container">

            <section className="marcas-header">

                <div>
                    <h1>Marcas</h1>

                    <p>
                        Gerenciamento completo de marcas do sistema
                    </p>
                </div>

                <Link
                    to="/cadastroMarcas"
                    className="btn-novo"
                >
                    <i className="fas fa-car"></i>
                    Nova Marca
                </Link>

            </section>

            <section className="marcas-card">

                <div className="table-container">

                    {carregando && (
                        <p>Carregando marcas...</p>
                    )}

                    {erro && (
                        <p>{erro}</p>
                    )}

                    {!carregando && !erro && (

                        <table className="marcas-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome da Marca</th>
                                    <th>Sigla</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {marcas?.map((marca) => (

                                    <tr key={marca.id_marca}>

                                        <td
                                            className="text-center"
                                            data-label="ID"
                                        >
                                            {marca.id_marca}
                                        </td>

                                        <td data-label="Nome da Marca">
                                            {marca.nome_marca}
                                        </td>

                                        <td data-label="Sigla">
                                            {marca.sigla_marca}
                                        </td>

                                        <td data-label="Ações">

                                            <div className="acoes">

                                                <Link
                                                    to={`/marca/edit/${marca.id_marca}`}
                                                    className="btn-editar"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                    Alterar
                                                </Link>

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