import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./css/navbar.css";


export default function Navbar() {

    const navigate = useNavigate();
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [usuario, setUsuario] = useState(
        JSON.parse(
            localStorage.getItem("usuario") || "null"
        )
    );

    useEffect(() => {

        function atualizarNavbar(){
            setToken(
                localStorage.getItem("token")
            );
            setUsuario(
                JSON.parse(
                    localStorage.getItem("usuario") || "null"
                )
            );

        }
        window.addEventListener(
            "login",
            atualizarNavbar
        );

        return () => {

            window.removeEventListener(
                "login",
                atualizarNavbar
            );

        };


    }, []);

    function logout(){

        localStorage.removeItem("token");

        localStorage.removeItem("usuario");


        setToken(null);

        setUsuario(null);


        navigate("/login");

    }
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link 
                    className="navbar-brand" 
                    to="/"
                >
                    <img
                        src="/src/assets/logo.png"
                        alt="Velox Wrap"
                        className="navbar-logo"
                    />

                    <span className="navbar-title">
                        Velox Wrap
                    </span>
                </Link>
                <div className="navbar-menu">
                    <ul className="navbar-nav">
                        <li>
                            <Link 
                                className="nav-link"
                                to="/galeria"
                            >
                                Galeria
                            </Link>
                        </li>

                        <li>
                            <Link 
                                className="nav-link"
                                to="/servicos"
                            >
                                Serviços
                            </Link>
                        </li>

                        <li>
                            <Link 
                                className="nav-link"
                                to="/contato"
                            >
                                Contato
                            </Link>
                        </li>

                        {token && (

                            <>
                                <li>
                                    <Link className="nav-button" to="/veiculos"> Veículos </Link>
                                </li>

                                {usuario?.tipo === "admin" && (

                                    <>
                                    <li>
                                        <Link className="nav-button"to="/usuarios"> Usuários </Link>
                                    </li>

                                    <li>
                                        <Link className="nav-button"to="/modelos"> Modelos </Link>
                                    </li>

                                    <li>
                                        <Link className="nav-button" to="/marcas"> Marcas </Link>
                                    </li>
                                    </>
                                )}
                                <li>
                                    <button className="nav-button" onClick={logout}> Sair </button>
                                </li>
                            </>
                        )}
                        {!token && (
                            <>
                                <li>
                                    <Link className="nav-button" to="/cadastro"> Cadastro </Link>
                                </li>

                                <li>
                                    <Link className="nav-button" to="/login"> Login </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}