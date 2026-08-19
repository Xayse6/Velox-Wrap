import { Routes, Route } from "react-router-dom";
import "./css/App.css";


import Home from "./Screens/home";
import Usuarios from "./Screens/cadastro/usuario/usuarios";
import Veiculos from "./Screens/cadastro/veiculo/veiculos";


import Modelos from "./Screens/cadastro/modelo/modelo";
import Marcas from "./Screens/cadastro/marca/marca";


import Navbar from "./Screens/fragments/navbar";
import Footer from "./Screens/fragments/footer";

import Cadastro from "./Screens/cadastro/usuario/usuarioForm";

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
      <Route path="/Veiculos" element={<Veiculos />} />
      <Route path="/Modelos" element={<Modelos />} />
      <Route path="/Marcas" element={<Marcas />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  </main>
  <footer>
  <Footer />
  </footer>
  </>
  );
}