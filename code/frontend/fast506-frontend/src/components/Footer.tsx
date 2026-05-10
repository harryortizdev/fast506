import { useState, useEffect } from "react";

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-3">
            <div className="container">
          
                <div className="row text-center text-md-start mb-4">
                    <div className="col-md-2 col-lg-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold text-danger">Racing</h6>
                        <p><a href="#!" className="text-white text-decoration-none small">Scuderia</a></p>
                    </div>

                    <div className="col-md-2 col-lg-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold text-danger">Sports Cars</h6>
                        <p><a href="#!" className="text-white text-decoration-none small">Range</a></p>
                    </div>

                    <div className="col-md-2 col-lg-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold text-danger">Collections</h6>
                        <p><a href="#!" className="text-white text-decoration-none small">Men</a></p>
                    </div>

                    <div className="col-md-2 col-lg-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold text-danger">Experiences</h6>
                        <p><a href="#!" className="text-white text-decoration-none small">Museums</a></p>
                    </div>

                    <div className="col-md-2 col-lg-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold text-danger">About Us</h6>
                        <p><a href="#!" className="text-white text-decoration-none small">History</a></p>
                    </div>
                </div>

                <hr className="border-secondary mb-5" />

               
                <div className="row align-items-center justify-content-center text-center">
                    <div className="col-12 mb-3">
                        <h6 className="text-uppercase font-weight-bold mb-4">Follow us</h6>
                    </div>
                    <div className="col-12 d-flex justify-content-center gap-4 flex-wrap">
                        <a href="#!" className="text-white text-decoration-none d-flex align-items-center gap-2">
                            <i className="bi bi-facebook fs-5"></i> <span className="small fw-bold">FACEBOOK</span>
                        </a>
                        <a href="#!" className="text-white text-decoration-none d-flex align-items-center gap-2">
                            <i className="bi bi-instagram fs-5"></i> <span className="small fw-bold">INSTAGRAM</span>
                        </a>
                        <a href="#!" className="text-white text-decoration-none d-flex align-items-center gap-2">
                            <i className="bi bi-linkedin fs-5"></i> <span className="small fw-bold">LINKEDIN</span>
                        </a>
                        <a href="#!" className="text-white text-decoration-none d-flex align-items-center gap-2">
                            <i className="bi bi-tiktok fs-5"></i> <span className="small fw-bold">TIK TOK</span>
                        </a>
                        <a href="#!" className="text-white text-decoration-none d-flex align-items-center gap-2">
                            <i className="bi bi-youtube fs-5"></i> <span className="small fw-bold">YOUTUBE</span>
                        </a>
                        <a href="#!" className="text-white text-decoration-none d-flex align-items-center gap-2">
                            <i className="bi bi-twitter-x fs-5"></i> <span className="small fw-bold">X</span>
                        </a>
                    </div>
                </div>

            
                <div className="row mt-5">
                    <div className="col text-center">
                        <p className="text-secondary small">© 2026 FAST506</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}; export default Footer;