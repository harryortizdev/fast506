import React, { useEffect, useState } from "react";
import { getAll } from "../services/BranchService";
import { Branch } from "../models/Branch";
import ButtonIcon from "../components/molecules/ButtonIcon";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";

const SucursalesSencillas = () => {
  const [sucursales, setSucursales] = useState<Branch[]>([]);

  useEffect(() => {
    const cargar = async () => {
      const data = await getAll();
      setSucursales(data);
    };
    cargar();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#EEF1EF" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container mt-4 mb-4" style={{ maxWidth: '600px' }}>
          <div className="card shadow-sm">
            <div className="card-body" style={{ backgroundColor: "#1A2633" }}>
              <h2 className="text-center" style={{ color: "#EEF1EF" }}>Sucursales</h2>
            </div>

            <div className="accordion" id="listaSucursales">
              {sucursales.map((s) => {
                const coords = s.coordinates ? s.coordinates.split(',') : ["10.2117", "-83.7847"];
                const lat = coords[0].trim();
                const lon = coords[1].trim();

                return (
                  <div className="accordion-item" key={s.idBranch}>
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

                    <div id={`sucursal${s.idBranch}`} className="accordion-collapse collapse" data-bs-parent="#listaSucursales">
                      <div className="accordion-body">
                        <p><strong>Ubicación:</strong> {s.ubication}</p>
                        <hr />
                        <p><strong>Dirección:</strong> {s.direction}</p>
                        <hr />
                        <p><strong>Horario:</strong> {s.operationSchedule}</p>
                        <hr />
                        <p>
                          <strong>Teléfono:</strong>{" "}
                          <a href={`tel:${s.branchPhoneNumber}`} style={{ textDecoration: 'none' }}>
                            {s.branchPhoneNumber}
                          </a>
                        </p>
                        <hr />

                        <div className="mt-3 d-flex justify-content-center gap-2">
                          <ButtonIcon
                            label="Abrir Waze"
                            color="#EEF1EF"
                            backgroundColor="#5E6572"
                            hoverColor="#2C3E50"
                            onClick={() => window.open(`https://waze.com/ul?ll=${lat},${lon}&navigate=yes`, "_blank")}
                            icon={<i className="bi bi-car-front-fill" />}
                            className=""
                          />
                          <ButtonIcon
                            label="Abrir Google Maps"
                            color="#EEF1EF"
                            backgroundColor="#5E6572"
                            hoverColor="#2C3E50"
                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`, "_blank")}
                            icon={<i className="bi bi-map-fill" />}
                            className=""
                          />
                        </div>

                        <div className="mt-3 d-flex justify-content-center">
                          <iframe
                            width="75%"
                            height="350"
                            title={`Mapa de ${s.name}`}
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(lon) - 0.005}%2C${parseFloat(lat) - 0.005}%2C${parseFloat(lon) + 0.005}%2C${parseFloat(lat) + 0.005}&layer=mapnik&marker=${lat}%2C${lon}`}
                            style={{ border: 0, borderRadius: '8px' }}
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SucursalesSencillas;