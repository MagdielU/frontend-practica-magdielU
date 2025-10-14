import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importar componente Encabezado.
import Encabezado from "./components/navegacion/Encabezado";
// Importar las vistas.
import Login from "./components/views/Login";
import Inicio from "./components/views/Inicio";
import Empleados from "./components/views/Empleados";
import Categorias from "./components/views/Categorias";
import Clientes from "./components/views/Clientes";
import Productos from "./components/views/Productos";
import Usuarios from "./components/views/Usuarios";
import Ventas from "./components/views/Ventas";
import Compras from "./components/views/Compras";
import Catalogo from "./components/views/Catalogo";
// Importar archivo de estilos.
import "./App.css";

const App = () => {
  return (
    <Router>
      <Encabezado />
      <main className="margen-superior-main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
