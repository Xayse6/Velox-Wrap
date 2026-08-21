import { Routes, Route } from "react-router-dom";

import "./styles/global.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProtectedRoute from "./features/auth/pages/ProtectedRoute";

import Home from "./features/home/pages/Home";

import Usuarios from "./features/usuario/pages/Usuarios";
import Cadastro from "./features/auth/pages/Cadastro";

import Marcas from "./features/marca/pages/Marcas";
import CadastroMarcas from "./features/marca/pages/CadastroMarcas";

import Modelos from "./features/modelo/pages/Modelos";
import CadastroModelos from "./features/modelo/pages/CadastroModelos";

import Veiculos from "./features/veiculo/pages/Veiculos";
import CadastroVeiculos from "./features/veiculo/pages/CadastroVeiculos";

import Login from "./features/auth/pages/Login";

export default function App() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route
            path="/usuarios"
            element={
              <ProtectedRoute>
                <Usuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuario/edit/:id"
            element={
              <ProtectedRoute>
                <Cadastro />
              </ProtectedRoute>
            }
          />

          <Route
            path="/marcas"
            element={
              <ProtectedRoute>
                <Marcas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cadastroMarcas"
            element={
              <ProtectedRoute>
                <CadastroMarcas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marca/edit/:id"
            element={
              <ProtectedRoute>
                <CadastroMarcas />
              </ProtectedRoute>
            }
          />

          <Route
            path="/modelos"
            element={
              <ProtectedRoute>
                <Modelos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cadastroModelos"
            element={
              <ProtectedRoute>
                <CadastroModelos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modelo/edit/:id"
            element={
              <ProtectedRoute>
                <CadastroModelos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/veiculos"
            element={
              <ProtectedRoute>
                <Veiculos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cadastroVeiculos"
            element={
              <ProtectedRoute>
                <CadastroVeiculos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/veiculo/edit/:id"
            element={
              <ProtectedRoute>
                <CadastroVeiculos />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}