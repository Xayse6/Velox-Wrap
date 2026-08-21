import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario") || "null")
  );

  useEffect(() => {
    function atualizarNavbar() {
      setToken(localStorage.getItem("token"));
      setUsuario(JSON.parse(localStorage.getItem("usuario") || "null"));
    }

    window.addEventListener("login", atualizarNavbar);

    return () => {
      window.removeEventListener("login", atualizarNavbar);
    };
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
    setMenuAberto(false);
    navigate("/login");
  }

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/" onClick={fecharMenu}>
          <img
            src="/src/assets/logo.png"
            alt="Velox Wrap"
            className="navbar-logo"
          />
          <span className="navbar-title">Velox Wrap</span>
        </Link>

        <button
          className={`navbar-toggle ${menuAberto ? "open" : ""}`}
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${menuAberto ? "open" : ""}`}>
          <ul className="navbar-nav">
            <li>
              <Link className="nav-link" to="/galeria" onClick={fecharMenu}>
                Galeria
              </Link>
            </li>

            <li>
              <Link className="nav-link" to="/servicos" onClick={fecharMenu}>
                Serviços
              </Link>
            </li>

            <li>
              <Link className="nav-link" to="/contato" onClick={fecharMenu}>
                Contato
              </Link>
            </li>

            {token && (
              <>
                <li>
                  <Link className="nav-button" to="/veiculos" onClick={fecharMenu}>
                    Veículos
                  </Link>
                </li>

                {usuario?.tipo === "admin" && (
                  <>
                    <li>
                      <Link className="nav-button" to="/usuarios" onClick={fecharMenu}>
                        Usuários
                      </Link>
                    </li>

                    <li>
                      <Link className="nav-button" to="/modelos" onClick={fecharMenu}>
                        Modelos
                      </Link>
                    </li>

                    <li>
                      <Link className="nav-button" to="/marcas" onClick={fecharMenu}>
                        Marcas
                      </Link>
                    </li>
                  </>
                )}

                <li>
                    <Link className="nav-button" to="/profile" onClick={fecharMenu}>
                        Perfil
                      </Link>
                </li>

                <li>
                  <button className="nav-button" onClick={logout}>
                    Sair
                  </button>
                </li>
              </>
            )}

            {!token && (
              <>
                <li>
                  <Link className="nav-button" to="/cadastro" onClick={fecharMenu}>
                    Cadastro
                  </Link>
                </li>

                <li>
                  <Link className="nav-button" to="/login" onClick={fecharMenu}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}