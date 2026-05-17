import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../../index.css";
import {
  IoCarSportOutline,
  IoBuildOutline,
  IoLocationOutline,
  IoSettingsOutline,
  IoPersonCircleOutline
} from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid px-4">

        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" width="80" height="40" />
        </Link>

        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
        >
          <span>☰</span>
        </button>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav mx-auto text-center nav-magic">

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle magic-link" href="#" role="button" data-bs-toggle="dropdown">
                AUTOS
              </a>
              <ul className="dropdown-menu custom-dropdown text-center">
                <li><a className="dropdown-item" href="#">CATÁLOGO 1</a></li>
                <li><a className="dropdown-item" href="#">CATÁLOGO 2</a></li>
                <li><a className="dropdown-item" href="#">CATÁLOGO 3</a></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle magic-link" href="#" role="button" data-bs-toggle="dropdown">
                SERVICIOS
              </a>
              <ul className="dropdown-menu custom-dropdown text-center">
                <li><a className="dropdown-item" href="#">TEST DRIVE</a></li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link magic-link" href="#">CITAS TALLER</a>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link magic-link" to="/branches">
                SUCURSALES
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle magic-link" href="#" role="button" data-bs-toggle="dropdown">
                ADMINISTRACIÓN
              </a>
              <ul className="dropdown-menu custom-dropdown text-center">
                <li><Link className="dropdown-item" to="/admin/units">UNIDADES</Link></li>
                <li><Link className="dropdown-item" to="/admin/branches">SUCURSALES</Link></li>
                <li><Link className="dropdown-item" to="/admin/suppliers">PROVEEDORES</Link></li>
                <li><Link className="dropdown-item" to="/admin/administrators">ADMINISTRADORES</Link></li>
                <li><Link className="dropdown-item" to="/admin/clients">CLIENTES</Link></li>
                <li><Link className="dropdown-item" to="/admin/mechanics">MECÁNICOS</Link></li>
              </ul>
            </li>

          </ul>

          <ul className="navbar-nav text-center">
            <li className="nav-item dropdown">
              <a href="#" role="button" data-bs-toggle="dropdown">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="Usuario"
                  className="user-icon"
                />
              </a>

              <ul className="dropdown-menu dropdown-menu-end custom-dropdown text-center">
                <li><a className="dropdown-item" href="#">Editar perfil</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Eliminar cuenta</a></li>
                <li><a className="dropdown-item" href="#">Cerrar sesión</a></li>
              </ul>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;