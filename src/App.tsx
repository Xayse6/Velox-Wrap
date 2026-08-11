import { Routes, Route } from "react-router-dom";



import Home from "./Screens/Home";
import Usuarios from "./Screens/cadastro/usuario/usuarios";
import Veiculos from "./Screens/cadastro/veiculo/veiculos";

import "./css/App.css";
import Modelos from "./Screens/cadastro/modelo/modelo";
import Marcas from "./Screens/cadastro/marca/marca";

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Usuarios" element={<Usuarios />} />
        <Route path="/Veiculos" element={<Veiculos />} />
        <Route path="/Modelos" element={<Modelos />} />
        <Route path="/Marcas" element={<Marcas />} />

      </Routes>

    </>
  );
}

export default App;