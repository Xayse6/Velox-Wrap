import { Link } from "react-router-dom";

import "../css/veiculo.css";

import useVeiculos from "../hooks/useVeiculos";

export default function Veiculos() {

    const {
        veiculos,
        carregando,
        erro,
        deleteVeiculo,
    } = useVeiculos();

    return (
        <main className="veiculos-container">

            <section className="veiculos-header">

                <div>
                    <h1>Veículos</h1>

                    <p>
                        Gerenciamento completo de veículos do sistema
                    </p>
                </div>

                <Link
                    to="/cadastroVeiculos"
                    className="btn-novo"
                >
                    <i className="fas fa-car"></i>
                    Novo Veículo
                </Link>

            </section>

            <section className="veiculos-card">

                <div className="table-container">

                    {carregando && (
                        <p>Carregando veículos...</p>
                    )}

                    {erro && (
                        <p>{erro}</p>
                    )}

                    {!carregando && !erro && (

                        <table className="veiculos-table">

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Usuário</th>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Ano</th>
                                    <th>Ações</th>
                                </tr>

                            </thead>

                            <tbody>

                                {veiculos.map((veiculo) => (

                                    <tr
                                        key={veiculo.id_veiculo}
                                    >

                                        <td
                                            className="text-center"
                                            data-label="ID"
                                        >
                                            {veiculo.id_veiculo}
                                        </td>

                                        <td data-label="Usuário">
                                            {veiculo.nome_usuario}
                                        </td>

                                        <td data-label="Marca">
                                            {veiculo.nome_marca}
                                        </td>

                                        <td data-label="Modelo">
                                            {veiculo.nome_modelo}
                                        </td>

                                        <td data-label="Ano">
                                            {veiculo.ano_modelo}
                                        </td>

                                        <td data-label="Ações">

                                            <div className="acoes">

                                                <Link
                                                    to={`/veiculo/edit/${veiculo.id_veiculo}`}
                                                    className="btn-editar"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                    Alterar
                                                </Link>

                                                <button
                                                    type="button"
                                                    className="btn-excluir"
                                                    title="Excluir"
                                                    onClick={() =>
                                                        deleteVeiculo(veiculo.id_veiculo)
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