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
    <div className="card p-3 mb-3">
      <h3>{supplierToEdit ? "Editar Proveedor" : "Nuevo Proveedor"}</h3>

      <div className="mb-2">
        <label>Nombre</label>
        <input className="form-control" name="name" placeholder="Nombre"
          value={form.name || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Compañía</label>
        <input className="form-control" name="companyName" placeholder="Compañía"
          value={form.companyName || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Nombre Legal</label>
        <input className="form-control" name="legalName" placeholder="Nombre Legal"
          value={form.legalName || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Teléfono de Soporte</label>
        <input className="form-control" name="supportPhone" placeholder="Teléfono de Soporte"
          value={form.supportPhone || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Contacto de Negocios</label>
        <input className="form-control" name="bussinesContactName" placeholder="Contacto de Negocios"
          value={form.bussinesContactName || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Correo Electrónico</label>
        <input className="form-control" name="email" placeholder="Correo Electrónico"
          value={form.email || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Ubicación</label>
        <input className="form-control" name="ubicacion" placeholder="Ubicación"
          value={form.ubicacion || ""} onChange={handleChange} />
      </div>

        {/* <div className="mb-2">
        <label>Administrador</label>
        <select className="form-select" name="adminId" 
            value={form.adminId || ""} 
            onChange={handleChange}>
            <option value="">Seleccione un Administrador</option>
            {admins.map((admin) => (
            <option key={admin.id} value={admin.id}>
                {admin.name}
            </option>
            ))}
        </select>
        </div> */}

      <div className="mt-3">
        <button className="btn btn-success me-2" onClick={handleSubmit}>Guardar</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default SupplierForm;