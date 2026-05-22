import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/logo.png";
import "../../index.css";

import Categories from "../molecules/Categories";
import { getCategories } from "../../services/CatalogService";
import { CategoriesCatalog } from "../../models/CategoriesCatalog";

const Navbar = () => {

  const [showModels, setShowModels] = useState(false);
  const [categories, setCategories] = useState<CategoriesCatalog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (showModels) fetchCategories();
  }, [showModels]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);

      if (data.length > 0) {
        setSelectedCategory(data[0].bodyWork);
      }

    } catch (error) {
      console.error(error);
    }
  };

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

              <li className="nav-item">
                <button
                  onClick={() => setShowModels(!showModels)}
                  className="nav-link magic-link"
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    fontWeight: 500,
                  }}
                >
                  MODELOS
                </button>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle magic-link" href="#" data-bs-toggle="dropdown">
                  SERVICIOS
                </a>
                <ul className="dropdown-menu custom-dropdown text-center">
                  <li>
                    <a className="dropdown-item" href="/testdrive">
                      TEST DRIVE
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link magic-link" href="#">
                  CITAS TALLER
                </a>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link magic-link" to="/branches">
                  SUCURSALES
                </NavLink>
              </li>

            </ul>


            <ul className="navbar-nav ms-auto text-center mt-3 mt-lg-0">

              <li className="nav-item dropdown">

                <a
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  className="nav-link d-flex align-items-center justify-content-center justify-content-lg-end"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="Usuario"
                    className="user-icon"
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                    }}
                  />
                </a>

                <ul className="dropdown-menu dropdown-menu-end custom-dropdown text-center">

                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Editar perfil
                    </Link>
                  </li>

                  <li><hr className="dropdown-divider" /></li>

                  <li>
                    <button className="dropdown-item">
                      Eliminar cuenta
                    </button>
                  </li>

                  <li>
                    <button className="dropdown-item">
                      Cerrar sesión
                    </button>
                  </li>

                </ul>

              </li>

            </ul>

          </div>
        </div>
      </nav>

      <div
        style={{
          maxHeight: showModels ? "800px" : "0px", // ← más espacio para los cards
          overflow: "hidden",
          transition: "all 0.5s ease",
          backgroundColor: "#fff",
          boxShadow: showModels ? "0 6px 16px rgba(0,0,0,0.12)" : "none",
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