// src/components/UnitForm.tsx
import { useState } from "react";
import { Unit } from "../models/Unit";
import { create } from "../services/UnitService";

interface UnitForm {
  onClose: () => void;
}

const UnitForm = ({ onClose }: UnitForm) => {
  const [form, setForm] = useState<Partial<Unit>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  try {
    const unitToSave = {
      ...form,
      stockStatus: true, // valor por defecto al crear
    };
    await create(unitToSave);
    alert("Unidad creada correctamente");
    onClose();
  } catch (error) {
    alert("Error al guardar");
  }
};

  return (
    <div className="card p-3 mb-3">
      <h3>Nueva Unidad</h3>

      <div className="mb-2">
        <label>VIN</label>
        <input className="form-control" name="VIN" placeholder="VIN" onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>No. Motor</label>
        <input className="form-control" name="engineNumber" placeholder="No. Motor" onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Marca</label>
        <input className="form-control" name="carBrand" placeholder="Marca" onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Nombre</label>
        <input className="form-control" name="carName" placeholder="Nombre" onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Nombre Legal</label>
        <input className="form-control" name="legalBrandName" placeholder="Nombre Legal" onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Año</label>
        <input className="form-control" name="yearManufacture" placeholder="Año" type="number" onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Color</label>
        <input className="form-control" name="color" placeholder="Color" onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Transmisión</label>
        <select className="form-select" name="transmission" onChange={handleChange}>
          <option value="">Seleccione transmisión</option>
          <option value="Manual">Manual</option>
          <option value="Automático">Automático</option>
          <option value="CVT">CVT</option>
          <option value="Semi-automático">Semi-automático</option>
          <option value="Doble embrague">Doble embrague (DCT)</option>
        </select>
      </div>

      <div className="mb-2">
        <label>Tracción</label>
        <select className="form-select" name="traction" onChange={handleChange}>
          <option value="">Seleccione tracción</option>
          <option value="FWD">FWD - Delantera</option>
          <option value="RWD">RWD - Trasera</option>
          <option value="AWD">AWD - Total permanente</option>
          <option value="4WD">4WD - Cuatro ruedas</option>
        </select>
      </div>

      <div className="mb-2">
        <label>Kilometraje</label>
        <input className="form-control" name="mileage" placeholder="Kilometraje" type="number" onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Carrocería</label>
        <input className="form-control" name="bodyWork" placeholder="Carrocería" onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Cilindraje</label>
        <input className="form-control" name="engineSize" placeholder="Cilindraje" onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Combustible</label>
        <select className="form-select" name="fuelType" onChange={handleChange}>
          <option value="">Seleccione combustible</option>
          <option value="Gasolina">Gasolina</option>
          <option value="Diesel">Diesel</option>
          <option value="Híbrido">Híbrido</option>
          <option value="Eléctrico">Eléctrico</option>
          <option value="Gas">Gas (GLP)</option>
          <option value="Híbrido enchufable">Híbrido enchufable (PHEV)</option>
        </select>
      </div>

      <div className="mb-2">
        <label>Proveedor</label>
        <select className="form-select" name="idSupplier" onChange={handleChange}>
          <option value="">Seleccione un proveedor</option>
          <option value="1">Proveedor 1</option>
          <option value="2">Proveedor 2</option>
          <option value="3">Proveedor 3</option>
        </select>
      </div>

      <div className="mt-3">
        <button className="btn btn-success me-2" onClick={handleSubmit}>Guardar</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default UnitForm;