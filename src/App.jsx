import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importar componente Encabezado.
import Encabezado from "./components/navegacion/Encabezado";
// Importar las vistas.
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Empleados from "./views/Empleados";
import Categorias from "./views/Categorias";
import Clientes from "./views/Clientes";
import Productos from "./views/Productos";
import Usuarios from "./views/Usuarios";
import Ventas from "./views/Ventas";
import Compras from "./views/Compras";
import Catalogo from "./views/Catalogo";
import RutaProtegida from "./components/rutas/RutaProtegida";

// Importar archivo de estilos.
import "./App.css";

const App = () => {
  return (
    <Router>
      <Encabezado />
      <main className="margen-superior-main">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/inicio" element={<RutaProtegida vista={<Inicio />} />} />
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
