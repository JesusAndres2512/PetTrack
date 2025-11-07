import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostConsultaRecompensas from "./pages/PostconsultaRecompensas";
import Recompensas from "./pages/recompensas";
import "./css/Navbar.css"; // 👈 importa tus estilos aquí

function App() {
  return (
    <Router>
      <nav className="navbar">
        <span className="navbar-logo">🐾 PetTrack</span>
        <Link to="/" className="navbar-link">
          Post-Consulta
        </Link>
        <Link to="/recompensas" className="navbar-link">
          Recompensas
        </Link>
      </nav>

      <div className="page-container">
        <Routes>
          <Route path="/" element={<PostConsultaRecompensas />} />
          <Route path="/recompensas" element={<Recompensas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
