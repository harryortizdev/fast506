import { useState } from "react";
import { Supplier } from "../models/Supplier";
import { create, updateSupplier } from "../services/SupplierService";

interface SupplierFormProps {
  onClose: () => void;
  onRefresh: () => void;
  supplierToEdit?: Supplier;
}

const SupplierForm = ({ onClose, onRefresh, supplierToEdit }: SupplierFormProps) => {
  const [form, setForm] = useState<Partial<Supplier>>(
    supplierToEdit || { isActive: true }  // Asignar valor por defecto si no hay proveedor a editar
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (supplierToEdit) {
        await updateSupplier(form as Supplier);
        alert("Proveedor actualizado correctamente");
      } else {
        await create(form as Supplier);
        alert("Proveedor creado correctamente");
      }
      onRefresh();
      onClose();
    } catch (error) {
      alert("Error al guardar");
    }
  };

  return (
    
    

    <div className="container d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-4">{supplierToEdit ? "Editar Proveedor" : "Nuevo Proveedor"}</h3>

        <div className="mb-3">
          <label>Nombre:</label>
          <h1/>
          <input className="form-control" name="name" placeholder="Nombre"
            value={form.name || ""} onChange={handleChange} />
        </div>
<h1/>
        <div className="mb-3">
          <label>Compañía:</label>
                    <h1/>
          <input className="form-control" name="companyName" placeholder="Compañía"
            value={form.companyName || ""} onChange={handleChange} />
        </div>
<h1/>
        <div className="mb-3">
          <label>Nombre Legal:</label>
                    <h1/>
          <input className="form-control" name="legalName" placeholder="Nombre Legal"
            value={form.legalName || ""} onChange={handleChange} />
        </div>
<h1/>
        <div className="mb-3">
          <label>Teléfono de Soporte:</label>
                    <h1/>
          <input className="form-control" name="supportPhone" placeholder="Teléfono de Soporte"
            value={form.supportPhone || ""} onChange={handleChange} />
        </div>
<h1/>
        <div className="mb-3">
          <label>Nombre de Contacto de Negocios:</label>
          <h1/>
          <input className="form-control" name="bussinesContactName" placeholder="Contacto de Negocios"
            value={form.bussinesContactName || ""} onChange={handleChange} />
        </div>
<h1/>
        <div className="mb-3">
          <label>Correo Electrónico:</label>
                    <h1/>
          <input className="form-control" name="email" placeholder="Correo Electrónico"
            value={form.email || ""} onChange={handleChange} />
        </div>
<h1/>
        <div className="mb-3">
          <label>Ubicación:</label>
                    <h1/>
          <input className="form-control" name="ubicacion" placeholder="Ubicación"
            value={form.ubicacion || ""} onChange={handleChange} />
        </div>
<h1/>
        <div className="text-center mt-4">
          <button className="btn btn-success me-2" onClick={handleSubmit}>Guardar</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};


export default SupplierForm;