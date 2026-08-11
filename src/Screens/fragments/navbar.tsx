import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">

        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
        >
          <img
            src="/src/assets/logo.png"
            height="55"
            className="me-3 rounded-3 shadow-lg"
            alt="Velox Wrap"
          />

          <span
            className="fw-bold fs-3 text-info"
            style={{ textShadow: "0 0 30px #00d4ff" }}
          >
            Velox Wrap
          </span>
        </Link>

        {/* Botão Mobile */}
        <button
          className="navbar-toggler border-info"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Abrir menu"
        >rios
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center gap-4">

            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/galeria"
              >
                Galeria
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/servicos"
              >
                Serviços
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/contato"
              >
                Contato
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/usuarios"
                className="btn btn-outline-info"
              >
                Usuários
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/veiculos"
                className="btn btn-outline-info"
              >
                Veículos
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/modelos"
                className="btn btn-outline-info"
              >
                Modelos
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/marcas"
                className="btn btn-outline-info"
              >
                Marcas
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default NavBar;

