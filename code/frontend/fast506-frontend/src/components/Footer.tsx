import { useState, useEffect } from "react";

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#1A2633" }} className="text-white pt-5 pb-3">
            <div className="container">

                <div className="row text-center text-md-start mb-4">
                    <div className="col-md-2 col-lg-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold" style={{ color: "#A9B4C2" }}>Autos</h6>
                        <p><a href="#!" className="text-white text-decoration-none small"></a></p>
                    </div>

                    <div className="col-md-2 col-lg-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold" style={{ color: "#A9B4C2" }}>Servicios</h6>
                        <p><a href="#!" style={{ color: "#EEF1EF" }} className="text-white text-decoration-none small">Test Drive</a></p>
                    </div>

                    <div className="col-md-2 col-lg-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold" style={{ color: "#A9B4C2" }}>Citas Taller</h6>
                        <p><a href="#!" className="text-white text-decoration-none small"></a></p>
                    </div>

                    <div className="col-md-2 col-lg-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold" style={{ color: "#A9B4C2" }}>Sucursales</h6>
                        <p><a href="#!" className="text-white text-decoration-none small"></a></p>
                    </div>

                    <div className="col-md-2 col-lg-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold" style={{ color: "#A9B4C2" }}>Administración</h6>
                        <p><a href="/admin/units" style={{ color: "#EEF1EF" }} className="text-decoration-none small">Unidades</a></p>
                        <p><a href="/admin/branches" style={{ color: "#EEF1EF" }} className="text-decoration-none small">Sucursales</a></p>
                        <p><a href="/admin/suppliers" style={{ color: "#EEF1EF" }} className="text-decoration-none small">Proveedores</a></p>
                    </div>
                </div>

                <hr className="border-secondary mb-5" />


                <div className="row align-items-center justify-content-center text-center">
                    <div className="col-12 mb-3">
                        <h6 className="text-uppercase font-weight-bold mb-4" style={{ color: "#EEF1EF" }}>S&Iacute;GUENOS</h6>
                    </div>
                    <div className="col-12 d-flex justify-content-center gap-4 flex-wrap">
                        <a
                            href="https://www.facebook.com/share/17GtqQyedy/"
                            className="text-decoration-none d-flex align-items-center gap-2"
                            style={{ color: "#EEF1EF" }}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="bi bi-facebook fs-5"></i>
                            <span className="small fw-bold">FACEBOOK</span>
                        </a>
                        <a
                            href="https://www.instagram.com/agenciafast506?igsh=dWQ4eXZkdjdtdG9h"
                            className="text-decoration-none d-flex align-items-center gap-2"
                            style={{ color: "#EEF1EF" }}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="bi bi-instagram fs-5"></i>
                            <span className="small fw-bold">INSTAGRAM</span>
                        </a>
                        <a
                            href="mailto:agencia506@gmail.com"
                            className="text-decoration-none d-flex align-items-center gap-2"
                            style={{ color: "#EEF1EF" }}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="bi bi-envelope-at-fill fs-5"></i>
                            <span className="small fw-bold">EMAIL</span>
                        </a>
                        <a
                            href="https://wa.me/50661186130"
                            className="text-decoration-none d-flex align-items-center gap-2"
                            style={{ color: "#EEF1EF" }}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="bi bi-whatsapp fs-5"></i>
                            <span className="small fw-bold">WHATSAPP</span>
                        </a>
                    </div>
                </div>


                <div className="row mt-5">
                    <div className="col text-center">
                        <p className="small" style={{ color: "#5E6572" }}>© 2026 FAST506</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}; export default Footer;