import React, { useEffect, useState } from "react";
import { getAll } from "../services/BranchService";
import { Branch } from "../models/Branch";
import ButtonNew from "../components/ButtonIcon";

const SucursalesSencillas = () => {
  const [sucursales, setSucursales] = useState<Branch[]>([]);

  // Coordenadas fijas de Guápiles (por el momento)
  const latFija = 10.2117;
  const lonFija = -83.7847;

  const abrirWaze = () => {
    window.open(`https://waze.com/ul?ll=${latFija},${lonFija}&navigate=yes`, "_blank");
  };

  const abrirGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${latFija},${lonFija}`, "_blank");
  };

  useEffect(() => {
    const cargar = async () => {
      const data = await getAll();
      setSucursales(data);
    };
    cargar();
  }, []);

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Sucursales</h2>

      <div className="accordion" id="listaSucursales">
        {sucursales.map((s) => (
          <div className="accordion-item" key={s.idBranch}>

            {/* ENCABEZADO */}
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#sucursal${s.idBranch}`}
              >
                <strong>{s.name}</strong>
              </button>
            </h2>

            {/* CONTENIDO */}
            <div
              id={`sucursal${s.idBranch}`}
              className="accordion-collapse collapse"
              data-bs-parent="#listaSucursales"
            >
              <div className="accordion-body">
                <p><strong>Ubicación:</strong> {s.ubication}</p>
                <hr />
                <p><strong>Dirección:</strong> {s.direction}</p>
                <hr />

                <p><strong>Horario:</strong> {s.operationSchedule}</p>
                <hr />

                <p>
                  <strong>Teléfono:</strong>{" "}
                  <a href={`tel:${s.branchPhoneNumber}`}
                    style={{ textDecoration: 'none' }}>
                    {s.branchPhoneNumber}
                  </a>
                </p>
                <hr />

                <div className="mt-3 d-flex justify-content-center gap-2">
                  <ButtonNew
                    label="Abrir Waze"
                    onClick={abrirWaze}
                    icon="bi-car-front-fill"
                  />
                  <ButtonNew
                    label="Abrir Google Maps"
                    onClick={abrirGoogleMaps}
                    icon="bi-map-fill"
                  />
                </div>
                {/* EL MAPA (Justo al final del contenido) */}
                <div className="mt-3 d-flex justify-content-center">
                  <iframe
                    width="75%"
                    height="350"
                    title={`Mapa de ${s.name}`}
                    /* Usando las coordenadas fijas de Guápiles */
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${lonFija - 0.005}%2C${latFija - 0.005}%2C${lonFija + 0.005}%2C${latFija + 0.005}&layer=mapnik&marker=${latFija}%2C${lonFija}`}
                  ></iframe>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SucursalesSencillas;