import { Routes, Route } from "react-router-dom";

import "./styles/global.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./features/home/pages/Home";
import Usuarios from "./features/usuario/pages/Usuarios";
import Cadastro from "./features/auth/pages/Cadastro";
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

                    <Route path="/usuarios" element={<Usuarios />}/>

                    <Route path="/cadastro"element={<Cadastro />}/>

                    <Route path="/usuario/edit/:id" element={<Cadastro />}/>

                    <Route path="/login" element={<Login />}/>

                </Routes>
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    );
}