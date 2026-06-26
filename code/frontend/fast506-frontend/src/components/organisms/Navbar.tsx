import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import "../../index.css";

import Categories from "../molecules/Categories";
import { getCategories } from "../../services/CatalogService";
import { CategoriesCatalog } from "../../models/CategoriesCatalog";
import { useAuth } from "../../context/AuthContext";
import AlertSuccess from "../atoms/AlertSuccess";
import { useLocation } from "react-router-dom";

const ADMIN_MODULES = [
  "roles",
  "users",
  "catalog",
  "units",
  "suppliers",
  "branches",
  "quotation",
  "sales",
  "testdrive",
  "adds",
];

const Navbar = () => {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModels, setShowModels] = useState(false);
  const [categories, setCategories] = useState<CategoriesCatalog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (showModels) fetchCategories();
  }, [showModels]);

  useEffect(() => {
    setShowModels(false);
  }, [location.pathname]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
      if (data.length > 0) setSelectedCategory(data[0].bodyWork);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await logout();
    AlertSuccess("Sesión cerrada correctamente");
    navigate("/login");
  };

  const isAdmin = user?.roleName === "Administrador";
  const isMechanic = user?.roleName === "Mecánico";
  const isClient = user?.roleName === "Cliente";

  const hasMechanicAccess =
    isMechanic && (hasPermission("mechanic") || hasPermission("repairreport"));

  const hasAdminAccess =
    isAdmin && ADMIN_MODULES.some((m) => hasPermission(m));

  const isActive = (path: string) => !showModels && location.pathname === path;

  return (
    <>
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
              {/* Opciones generales */}

              <>
                <li className="nav-item">
                  <button
                    onClick={() => setShowModels(!showModels)}
                    className={`nav-link magic-link ${showModels ? "active-link" : ""}`}
                  >
                    MODELOS
                  </button>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link magic-link ${isActive("/testdrive") ? "active-link" : ""}`}
                    to="/testdrive"
                  >
                    TESTDRIVE
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link magic-link ${isActive("/quotation") ? "active-link" : ""}`}
                    to="/quotation"
                  >
                    COTIZACIONES
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link magic-link ${isActive("/workshopSchedules") ? "active-link" : ""}`}
                    to="/workshopSchedules"
                  >
                    CITAS TALLER
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link magic-link ${isActive("/branches") ? "active-link" : ""}`}
                    to="/branches"
                  >
                    SUCURSALES
                  </Link>
                </li>

                {isClient&&(
                <li className="nav-item">
                  <Link
                    className={`nav-link magic-link ${isActive("/catalog/client/sales") ? "active-link" : ""}`}
                    to="/catalog/client/sales"
                  >
                    COMPRAS
                  </Link>
                </li>
                )}
              </>

              {hasMechanicAccess && (
                <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle magic-link ${!showModels && location.pathname.startsWith("/mechanic") ? "active-link" : ""}`}
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    MECÁNICO
                  </a>
                  <ul className="dropdown-menu custom-dropdown text-center">
                    {hasPermission("repairreport") && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/mechanic/repair-reports"
                        >
                          REPORTES DE REPARACIÓN
                        </Link>
                      </li>
                    )}
                    {hasPermission("mechanic") && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/mechanic/workshop-schedules"
                        >
                          CITAS TALLER
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              )}

              {/* Menú de administración visible según permisos por módulo */}
              {hasAdminAccess && (
                <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle magic-link ${!showModels && location.pathname.startsWith("/admin") ? "active-link" : ""}`}
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    ADMINISTRACIÓN
                  </a>
                  <ul className="dropdown-menu custom-dropdown text-center">
                    {hasPermission("users") && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/administrators"
                        >
                          ADMINISTRADORES
                        </Link>
                      </li>
                    )}
                    {hasPermission("adds") && (
                      <li>
                        <Link className="dropdown-item" to="/admin/ad">
                          ANUNCIOS
                        </Link>
                      </li>
                    )}
                    {hasPermission("catalog") && (
                      <li>
                        <Link className="dropdown-item" to="/admin/catalogs">
                          CATÁLOGOS
                        </Link>
                      </li>
                    )}
                    {hasPermission("mechanic") && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/workshop-schedules"
                        >
                          CITAS TALLER
                        </Link>
                      </li>
                    )}
                    {hasPermission("users") && (
                      <li>
                        <Link className="dropdown-item" to="/admin/clients">
                          CLIENTES
                        </Link>
                      </li>
                    )}
                    {hasPermission("quotation") && (
                      <li>
                        <Link className="dropdown-item" to="/admin/quotations">
                          COTIZACIONES
                        </Link>
                      </li>
                    )}
                    {hasPermission("users") && (
                      <li>
                        <Link className="dropdown-item" to="/admin/mechanics">
                          MECÁNICOS
                        </Link>
                      </li>
                    )}
                    {hasPermission("suppliers") && (
                      <li>
                        <Link className="dropdown-item" to="/admin/suppliers">
                          PROVEEDORES
                        </Link>
                      </li>
                    )}
                    {hasPermission("repairreport") && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/repair-reports"
                        >
                          REPORTES DE REPARACIÓN
                        </Link>
                      </li>
                    )}
                    {hasPermission("roles") && (
                      <li>
                        <Link className="dropdown-item" to="/admin/roles">
                          ROLES
                        </Link>
                      </li>
                    )}
                    {hasPermission("branches") && (
                      <li>
                        <Link className="dropdown-item" to="/admin/branches">
                          SUCURSALES
                        </Link>
                      </li>
                    )}
                    {hasPermission("testdrive") && (
                      <li>
                        <Link className="dropdown-item" to="/admin/testdrive">
                          TESTDRIVE
                        </Link>
                      </li>
                    )}
                    {hasPermission("units") && (
                      <li>
                        <Link className="dropdown-item" to="/admin/units">
                          UNIDADES
                        </Link>
                      </li>
                    )}
                    {hasPermission("sales") && (
                      <li>
                        <Link className="dropdown-item" to="/admin/sales">
                          VENTAS
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              )}
            </ul>

            <ul className="navbar-nav text-center mt-3 mt-lg-0">
              {/* Si no hay sesion mostrar login y registro */}
              {!user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link magic-link" to="/login">
                      INICIAR SESIÓN
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link magic-link" to="/register">
                      REGISTRARSE
                    </Link>
                  </li>
                </>
              )}

              {/* Si hay sesion mostrar menu de usuario */}
              {user && (
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    className="nav-link d-flex align-items-center justify-content-center justify-content-lg-end"
                  >
                    <img
                      src={
                        user.profileImage
                          ? `http://localhost:8080/${user.profileImage}`
                          : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Usuario"
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <span className="ms-2 d-lg-none">{user.name}</span>
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end custom-dropdown text-center">
                    <li>
                      <span className="dropdown-item-text fw-semibold text-white">
                        {user.name}
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item-text small text-white">
                        {user.roleName ?? "Sin rol"}
                      </span>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Editar perfil
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div
        style={{
          maxHeight: showModels ? "800px" : "0px",
          overflow: "hidden",
          transition: "all 0.5s ease",
          backgroundColor: "#EEF1EF",
          boxShadow: showModels
            ? "0 6px 16px rgba(255, 255, 255, 0.12)"
            : "none",
        }}
      >
        <div style={{ paddingTop: "30px", paddingBottom: "40px" }}>
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
