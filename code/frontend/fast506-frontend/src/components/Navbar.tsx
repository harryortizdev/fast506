import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#1A2633" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" width="80" height="40" />
        </Link>

        <button
          className="navbar-toggler border-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span style={{ color: "#EEF1EF", fontSize: "1.8rem" }}>☰</span>
        </button>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav mx-auto text-center">

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ color: "#EEF1EF" }}>
                AUTOS
              </a>
              <ul className="dropdown-menu text-center" style={{ backgroundColor: "#1A2633" }}>
                <li><a className="dropdown-item" href="#" style={{ color: "#EEF1EF" }}>CATALOGO 1</a></li>
                <li><a className="dropdown-item" href="#" style={{ color: "#EEF1EF" }}>CATALOGO 2</a></li>
                <li><a className="dropdown-item" href="#" style={{ color: "#EEF1EF" }}>CATALOGO 3</a></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ color: "#EEF1EF" }}>
                SERVICIOS
              </a>
              <ul className="dropdown-menu text-center" style={{ backgroundColor: "#1A2633" }}>
                <li><a className="dropdown-item" href="#" style={{ color: "#EEF1EF" }}>TEST DRIVE</a></li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: "#EEF1EF" }}>CITAS TALLER</a>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/branches" style={{ color: "#EEF1EF" }}>SUCURSALES</Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ color: "#EEF1EF" }}>
                ADMINISTRACIÓN
              </a>
              <ul className="dropdown-menu text-center" style={{ backgroundColor: "#1A2633" }}>
                <li><Link className="dropdown-item" to="/admin/units" style={{ color: "#EEF1EF" }}>UNIDADES</Link></li>
                <li><Link className="dropdown-item" to="/admin/branches" style={{ color: "#EEF1EF" }}>SUCURSALES</Link></li>
                <li><Link className="dropdown-item" to="/admin/suppliers" style={{ color: "#EEF1EF" }}>PROVEEDORES</Link></li>
                <li><Link className="dropdown-item" to="/admin/administrators" style={{ color: "#EEF1EF" }}>ADMINISTRADORES</Link></li>
                <li><Link className="dropdown-item" to="/admin/clients" style={{ color: "#EEF1EF" }}>CLIENTES</Link></li>
                <li><Link className="dropdown-item" to="/admin/mechanics" style={{ color: "#EEF1EF" }}>MECANICOS</Link></li>
              </ul>
            </li>

          </ul>

          <ul className="navbar-nav text-center">
            <li className="nav-item dropdown">
              <a href="#" role="button" data-bs-toggle="dropdown">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="Usuario"
                  width="35"
                  height="35"
                  style={{ borderRadius: "50%", cursor: "pointer" }}
                />
              </a>
              <ul className="dropdown-menu dropdown-menu-end text-center" style={{ backgroundColor: "#1A2633" }}>
                <li><a className="dropdown-item" href="#" style={{ color: "#EEF1EF" }}>Editar perfil</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" style={{ color: "#EEF1EF" }}>Eliminar cuenta</a></li>
                <li><a className="dropdown-item" href="#" style={{ color: "#EEF1EF" }}>Cerrar sesión</a></li>
              </ul>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;