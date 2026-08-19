import { Routes, Route } from "react-router-dom";

import "./styles/global.css";

import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";

import Home from "./features/home/pages/Home.tsx";

import Usuarios from "./features/usuario/pages/Usuarios.tsx";

import Cadastro from "./features/auth/pages/Cadastro.tsx"

export default function App() {
  return (
  <>
  <nav>
    <Navbar />
  </nav>
  <main className="main-content">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Usuarios" element={<Usuarios />} />
      <Route path="/Cadastro" element={<Cadastro />} />
    </Routes>
  </main>
  <footer>
  <Footer />
  </footer>
  </>
  );
}