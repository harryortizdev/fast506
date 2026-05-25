const Footer = () => {

  
  return (
    <footer style={{ backgroundColor: "#1A2633" }} className="text-white pt-5 pb-3">

  <div className="container py-5">

    <div className="row justify-content-center text-center  gy-4">

      <div className="col-6 col-md-4 col-lg-3 " >
        <h6 className="text-uppercase mb-3 fw-bold" style={{ color: "#A9B4C2" }}>
          Autos
        </h6>

        <p>
          <a href="#!" className="text-decoration-none small" style={{ color: "#EEF1EF" }}>
            Catálogo
          </a>
        </p>
      </div>

      <div className="col-6 col-md-4 col-lg-3">
        <h6 className="text-uppercase mb-3 fw-bold" style={{ color: "#A9B4C2" }}>
          Servicios
        </h6>

        <p>
          <a href="/quotation" className="text-decoration-none small" style={{ color: "#EEF1EF" }}>
            Cotizaciones
          </a>
        </p>

        <p>
          <a href="/testdrive" className="text-decoration-none small" style={{ color: "#EEF1EF" }}>
            Cita Testdrive
          </a>
        </p>

        <p>
          <a href="#!" className="text-decoration-none small" style={{ color: "#EEF1EF" }}>
            Cita Taller
          </a>
        </p>

        
      </div>

      <div className="col-6 col-md-4 col-lg-3">
        <h6 className="text-uppercase mb-3 fw-bold" style={{ color: "#A9B4C2" }}>
          Pendiente
        </h6>

        <p>
          <a href="#!" className="text-decoration-none small" style={{ color: "#EEF1EF" }}>
            Pendiente
          </a>
        </p>
      </div>

      <div className="col-6 col-md-4 col-lg-3">
        <h6 className="text-uppercase mb-3 fw-bold" style={{ color: "#A9B4C2" }}>
          Sucursales
        </h6>

        <p>
          <a href="/branches" className="text-decoration-none small" style={{ color: "#EEF1EF" }}>
            Ver sucursales
          </a>
        </p>
      </div>


    </div>

    <hr className="border-secondary my-5" />

    <div className="row justify-content-center text-center">
      <div className="col-12 mb-3">
        <h6 className="text-uppercase fw-bold mb-4" style={{ color: "#EEF1EF" }}>
          SÍGUENOS
        </h6>
      </div>

      <div className="col-12 d-flex justify-content-center gap-4 flex-wrap">

        <a href="https://www.facebook.com/share/17GtqQyedy/" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-center gap-2"
          style={{ color: "#EEF1EF" }}>
          <i className="bi bi-facebook fs-5"></i>
          <span className="small fw-bold">FACEBOOK</span>
        </a>

        <a href="https://www.instagram.com/agenciafast506?igsh=dWQ4eXZkdjdtdG9h" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-center gap-2"
          style={{ color: "#EEF1EF" }}>
          <i className="bi bi-instagram fs-5"></i>
          <span className="small fw-bold">INSTAGRAM</span>
        </a>

        <a href="mailto:agenciafast506@gmail.com" className="text-decoration-none d-flex align-items-center gap-2"
          style={{ color: "#EEF1EF" }}>
          <i className="bi bi-envelope-at-fill fs-5"></i>
          <span className="small fw-bold">EMAIL</span>
        </a>

        <a href="https://wa.me/50661186130" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-center gap-2"
          style={{ color: "#EEF1EF" }}>
          <i className="bi bi-whatsapp fs-5"></i>
          <span className="small fw-bold">WHATSAPP</span>
        </a>

      </div>
    </div>

    <div className="row mt-5">
      <div className="col text-center">
        <p className="small mb-0" style={{ color: "#5E6572" }}>
          © 2026 FAST506
        </p>
      </div>
    </div>

  </div>
</footer>
  );
};

export default Footer;