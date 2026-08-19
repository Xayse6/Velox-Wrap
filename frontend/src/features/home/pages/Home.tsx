import "../css/home.css";

import { Link } from "react-router-dom";

export default function Home() {
    // Depois você pode substituir isso pelo estado
    // real de autenticação do usuário.
    const clienteLogado = false;

    return (
        <main className="home-container">

            {/* HERO */}
            <section className="home-hero">

                <div className="hero-content">

                    <h1>Velox Wrap</h1>

                    <p>
                        Transforme seu veículo com estilo,
                        proteção e personalidade.
                    </p>

                    {clienteLogado ? (
                        <Link
                            to="/dashboard"
                            className="home-btn home-btn-primary"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <div className="hero-buttons">

                            <Link
                                to="/galeria"
                                className="home-btn home-btn-outline"
                            >
                                Ver Galeria
                            </Link>

                            <Link
                                to="/cadastro"
                                className="home-btn home-btn-primary"
                            >
                                Começar Agora
                            </Link>

                        </div>
                    )}

                </div>

            </section>

            {/* SERVIÇOS */}
            <section className="servicos">

                <div className="servicos-grid">

                    <div className="servico-card">

                        <i className="fas fa-paint-roller"></i>

                        <h3>Envelopamento Líquido</h3>

                        <p>
                            Cor nova sem danificar a pintura.
                        </p>

                    </div>

                    <div className="servico-card">

                        <i className="fas fa-film"></i>

                        <h3>Película PPF</h3>

                        <p>
                            Proteção invisível contra riscos.
                        </p>

                    </div>

                    <div className="servico-card">

                        <i className="fas fa-tools"></i>

                        <h3>Personalização Total</h3>

                        <p>
                            Tudo do seu jeito.
                        </p>

                    </div>

                </div>

            </section>

        </main>
    );
}