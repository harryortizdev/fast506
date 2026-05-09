import { useState } from "react";
import { Unit } from "../models/Unit";
import { create, updateUnit } from "../services/UnitService";

interface UnitFormProps {
  onClose: () => void;
  onRefresh: () => void;
  unitToEdit?: Unit;
}

const UnitForm = ({ onClose, onRefresh, unitToEdit }: UnitFormProps) => {
  const currentYear = new Date().getFullYear();
  const [form, setForm] = useState<Partial<Unit>>(
    unitToEdit || { yearManufacture: currentYear }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (unitToEdit) {
        await updateUnit(form as Unit);
        alert("Unidad actualizada correctamente");
      } else {
        const unitToSave = {
          ...form,
          stockStatus: true,
          yearManufacture: currentYear,
        };
        await create(unitToSave);
        alert("Unidad creada correctamente");
      }
      onRefresh();
      onClose();
    } catch (error) {
      alert("Error al guardar");
    }
  };

  return (
    
<div className="container d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>      <h3>{unitToEdit ? "Editar Unidad" : "Nueva Unidad"}</h3>

      <div className="mb-2">
        <label>VIN</label>
        <input className="form-control" name="VIN" placeholder="VIN"
          value={form.VIN || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>No. Motor</label>
        <input className="form-control" name="engineNumber" placeholder="No. Motor"
          value={form.engineNumber || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Marca</label>
        <input className="form-control" name="carBrand" placeholder="Marca"
          value={form.carBrand || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Nombre</label>
        <input className="form-control" name="carName" placeholder="Nombre"
          value={form.carName || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Nombre Legal</label>
        <input className="form-control" name="legalBrandName" placeholder="Nombre Legal"
          value={form.legalBrandName || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Color</label>
        <input className="form-control" name="color" placeholder="Color"
          value={form.color || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Transmisión</label>
        <select className="form-select" name="transmission"
          value={form.transmission || ""} onChange={handleChange}>
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
        <select className="form-select" name="traction"
          value={form.traction || ""} onChange={handleChange}>
          <option value="">Seleccione tracción</option>
          <option value="FWD">FWD - Delantera</option>
          <option value="RWD">RWD - Trasera</option>
          <option value="AWD">AWD - Total permanente</option>
          <option value="4WD">4WD - Cuatro ruedas</option>
        </select>
      </div>

      <div className="mb-2">
        <label>Carrocería</label>
        <input className="form-control" name="bodyWork" placeholder="Carrocería"
          value={form.bodyWork || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Cilindraje</label>
        <input className="form-control" name="engineSize" placeholder="Cilindraje"
          value={form.engineSize || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Combustible</label>
        <select className="form-select" name="fuelType"
          value={form.fuelType || ""} onChange={handleChange}>
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
        <select className="form-select" name="idSupplier"
          value={form.idSupplier || ""} onChange={handleChange}>
          <option value="">Seleccione un proveedor</option>
          <option value="1">Proveedor 1</option>
          <option value="2">Proveedor 2</option>
          <option value="3">Proveedor 3</option>
        </select>
      </div>

      {unitToEdit && (
        <div className="mb-2">
          <label>En Stock</label>
          <select className="form-select" name="stockStatus"
            value={form.stockStatus ? "true" : "false"}
            onChange={(e) => setForm({ ...form, stockStatus: e.target.value === "true" })}>
            <option value="true">Disponible</option>
            <option value="false">No disponible</option>
          </select>
        </div>
      )}

      <div className="mt-3">
        <button className="btn btn-success me-2" onClick={handleSubmit}>Guardar</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
      </div>
    </div>
        </div>
  );
};

export default UnitForm;