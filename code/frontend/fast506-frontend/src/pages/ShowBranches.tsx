import React, { useEffect, useState } from "react";
import { getAll } from "../services/BranchService";
import { Branch } from "../models/Branch";

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
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Sucursales</h2>
      
      <div className="accordion" id="listaSucursales">
        {sucursales.map((s) => (
          <div className="accordion-item" key={s.idBranch}>
            
            {/* ENCABEZADO: El título que se toca */}
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

            {/* CONTENIDO: Lo que se despliega */}
            <div 
              id={`sucursal${s.idBranch}`} 
              className="accordion-collapse collapse" 
              data-bs-parent="#listaSucursales"
            >
              <div className="accordion-body">
                <p><strong>Ubicación:</strong> {s.ubication}</p>
                <p><strong>Dirección:</strong> {s.direction}</p>
                <p><strong>Horario:</strong> {s.operationSchedule}</p>
                <p><strong>Teléfono:</strong> {s.branchPhoneNumber}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SucursalesSencillas;