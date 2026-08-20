import { Routes, Route } from "react-router-dom";

import "./styles/global.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./features/home/pages/Home";

import Usuarios from "./features/usuario/pages/Usuarios";
import Cadastro from "./features/auth/pages/Cadastro";

import Marcas from "./features/marca/pages/Marcas";
import CadastroMarcas from "./features/marca/pages/CadastroMarcas";

import Modelos from "./features/modelo/pages/Modelos";
import CadastroModelos from "./features/modelo/pages/CadastroModelos";

import Veiculos from "./features/veiculo/pages/Veiculos";
import CadastroVeiculos from "./features/veiculo/pages/CadastroVeiculos"


import Login from "./features/auth/pages/Login";

export default function App() {
    return (
        <>
            <nav>
                <Navbar />
            </nav>

            <main className="main-content">
                <Routes>

                    <Route path="/" element={<Home />}/>

                    <Route path="/login" element={<Login />}/>

                    <Route path="/usuarios" element={<Usuarios />}/>
                    <Route path="/cadastro"element={<Cadastro />}/>
                    <Route path="/usuario/edit/:id" element={<Cadastro />}/>

                    <Route path="/marcas" element={<Marcas />}/>
                    <Route path="/cadastroMarcas" element={<CadastroMarcas />}/>
                    <Route path="/marca/edit/:id" element={<CadastroMarcas />}/>

                    <Route path="/modelos" element={<Modelos />}/>
                    <Route path="/cadastroModelos" element={<CadastroModelos />}/>
                    <Route path="/modelo/edit/:id" element={<CadastroModelos />}/>

                    <Route path="/veiculos" element={<Veiculos />}/>
                    <Route path="/cadastroVeiculos" element={<CadastroVeiculos />}/>
                    <Route path="/veiculo/edit/:id" element={<CadastroVeiculos />}/>

                </Routes>
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    );
}