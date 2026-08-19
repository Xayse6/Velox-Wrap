import { Link } from "react-router-dom";
import "./css/navbar.css";

export default function navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="/src/assets/logo.png"
            alt="Velox Wrap"
            className="navbar-logo"
          />

          <span className="navbar-title">
            Velox Wrap
          </span>
        </Link>

        {/* Botão Mobile */}
        <button
          className="navbar-toggle"
          type="button"
          aria-label="Abrir menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu */}
        <div className="navbar-menu">
          <ul className="navbar-nav">

            <li>
              <Link className="nav-link" to="/galeria">
                Galeria
              </Link>
            </li>

            <li>
              <Link className="nav-link" to="/servicos">
                Serviços
              </Link>
            </li>

            <li>
              <Link className="nav-link" to="/contato">
                Contato
              </Link>
            </li>

            <li>
              <Link className="nav-button" to="/usuarios">
                Usuários
              </Link>
            </li>

            <li>
              <Link className="nav-button" to="/veiculos">
                Veículos
              </Link>
            </li>

            <li>
              <Link className="nav-button" to="/modelos">
                Modelos
              </Link>
            </li>

            <li>
              <Link className="nav-button" to="/marcas">
                Marcas
              </Link>
            </li>
            <li>
              <Link className="nav-button" to="/cadastro">
                Cadastro
              </Link>
            </li>
            <li>
              <Link className="nav-button" to="/login">
                Login
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}