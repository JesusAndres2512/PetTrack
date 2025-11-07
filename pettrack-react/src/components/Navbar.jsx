import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="logo">🐾</div>
        <h1 className="nav-title">PetTrack</h1>
        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/seguimiento">Seguimiento & Recompensas</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
