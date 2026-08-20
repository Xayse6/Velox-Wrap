import { Link } from "react-router-dom";

import "../css/modelo.css";

import useModelos from "../hooks/useModelos";

export default function Modelos() {
    const {
        modelos,
        carregando,
        erro,
    } = useModelos();

    return (
        <main className="modelos-container">

            <section className="modelos-header">

                <div>
                    <h1>Modelos</h1>

                    <p>
                        Gerenciamento completo de modelos do sistema
                    </p>
                </div>

                <Link
                    to="/cadastroModelos"
                    className="btn-novo"
                >
                    <i className="fas fa-car"></i>
                    Novo Modelo
                </Link>

            </section>

            <section className="modelos-card">

                <div className="table-container">

                    {carregando && (
                        <p>Carregando modelos...</p>
                    )}

                    {erro && (
                        <p>{erro}</p>
                    )}

                    {!carregando && !erro && (

                        <table className="modelos-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome do Modelo</th>
                                    <th>Ano do Modelo</th>
                                    <th>Marca</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {modelos?.map((modelo) => (

                                    <tr key={modelo.id_modelo}>

                                        <td
                                            className="text-center"
                                            data-label="ID"
                                        >
                                            {modelo.id_modelo}
                                        </td>

                                        <td data-label="Nome do Modelo">
                                            {modelo.nome_modelo}
                                        </td>

                                        <td data-label="Ano do Modelo">
                                            {modelo.ano_modelo}
                                        </td>

                                        <td data-label="Marca">
                                            {modelo.nome_marca}
                                        </td>

                                        <td data-label="Ações">

                                            <div className="acoes">

                                                <Link
                                                    to={`/modelo/edit/${modelo.id_modelo}`}
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