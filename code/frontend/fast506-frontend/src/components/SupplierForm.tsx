import { useState, useEffect } from "react";
import { Supplier } from "../models/Supplier";
import { Administrator } from "../models/Administrator";
import { create, updateSupplier } from "../services/SupplierService";
import { getAll as getAdmins } from "../services/AdministratorService";
import AlertSuccess from "./AlertSuccess";
import AlertWarning from "./AlertWarning";

interface SupplierFormProps {
  onClose: () => void;
  onRefresh: () => void;
  supplierToEdit?: Supplier;
}

const SupplierForm = ({ onClose, onRefresh, supplierToEdit }: SupplierFormProps) => {
  const [form, setForm] = useState<Partial<Supplier>>(supplierToEdit || { isActive: true });
  const [admins, setAdmins] = useState<Administrator[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof Supplier, string>>>({});

  // Cargar administradores al iniciar
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await getAdmins();
        // Asegurar que idUser sea número
        const list = data.map((a: any) => ({ ...a, idUser: Number(a.idUser) }));
        setAdmins(list);
      } catch (error) {
        console.error("Error al obtener administradores:", error);
      }
    };
    fetchAdmins();
  }, []);

  // Manejo de cambios en inputs y select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "adminId" ? (value ? Number(value) : undefined) : value,
    });
  };

  // Validación de formulario
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Supplier, string>> = {};
    const phoneRegex = /^[0-9\-\+\s()]{7,20}$/; // Teléfono válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email válido
    const lettersOnly = /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]+$/; // Solo letras

    if (!form.name || form.name.trim().length === 0 || form.name.length > 50) {
      newErrors.name = "Nombre inválido: no puede estar vacío, máximo 50 caracteres.";
    }
    if (!form.companyName || form.companyName.trim().length === 0 || form.companyName.length > 50) {
      newErrors.companyName = "Compañía inválida: no puede estar vacía, máximo 50 caracteres.";
    }
    if (!form.legalName || form.legalName.trim().length === 0 || form.legalName.length > 50) {
      newErrors.legalName = "Nombre legal inválido: no puede estar vacío, máximo 50 caracteres.";
    }
    if (!form.supportPhone || !phoneRegex.test(form.supportPhone)) {
      newErrors.supportPhone = "Teléfono inválido: debe ser un número válido (7-20 caracteres).";
    }
    if (!form.bussinesContactName || form.bussinesContactName.trim().length === 0 || form.bussinesContactName.length > 150) {
      newErrors.bussinesContactName = "Contacto inválido: no puede estar vacío, máximo 150 caracteres.";
    }
    if (!form.email || !emailRegex.test(form.email) || form.email.length > 100) {
      newErrors.email = "Correo inválido: debe ser un email válido, máximo 100 caracteres.";
    }
    if (!form.ubicacion || form.ubicacion.trim().length === 0 || form.ubicacion.length > 100) {
      newErrors.ubicacion = "Ubicación inválida: no puede estar vacía, máximo 100 caracteres.";
    }
    if (!form.adminId) {
      newErrors.adminId = "Debe seleccionar un administrador.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Guardar formulario
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      // Construir objeto a enviar dependiendo si es crear o actualizar
      let dataToSend: any;

      if (supplierToEdit) {
        dataToSend = {
          idSupplier: form.idSupplier,
          name: form.name,
          companyName: form.companyName,
          legalName: form.legalName,
          supportPhone: form.supportPhone,
          bussinesContactName: form.bussinesContactName,
          email: form.email,
          ubicacion: form.ubicacion,
          adminId: Number(form.adminId),
          active: form.isActive,
        };
      } else {
        dataToSend = {
          name: form.name,
          companyName: form.companyName,
          legalName: form.legalName,
          supportPhone: form.supportPhone,
          bussinesContactName: form.bussinesContactName,
          email: form.email,
          ubicacion: form.ubicacion,
          adminId: Number(form.adminId),
          active: form.isActive,
        };
      }

      console.log("Formulario a enviar al backend:", dataToSend);

      if (supplierToEdit) {
        await updateSupplier(dataToSend as Supplier);
        AlertSuccess("Proveedor actualizado correctamente.");
      } else {
        await create(dataToSend as Supplier);
        AlertSuccess("Proveedor creado correctamente.");
      }

      onRefresh();
      onClose();
    } catch (error) {
      AlertWarning("Error al guardar proveedor.");
      console.error("Error al guardar proveedor:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4">{supplierToEdit ? "Editar Proveedor" : "Nuevo Proveedor"}</h3>

        <div className="mb-3">
          <label>Nombre:</label>
          <input
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            name="name"
            value={form.name || ""}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label>Compañía:</label>
          <input
            className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
            name="companyName"
            value={form.companyName || ""}
            onChange={handleChange}
          />
          {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
        </div>

        <div className="mb-3">
          <label>Nombre Legal:</label>
          <input
            className={`form-control ${errors.legalName ? "is-invalid" : ""}`}
            name="legalName"
            value={form.legalName || ""}
            onChange={handleChange}
          />
          {errors.legalName && <div className="invalid-feedback">{errors.legalName}</div>}
        </div>

        <div className="mb-3">
          <label>Teléfono de Soporte:</label>
          <input
            className={`form-control ${errors.supportPhone ? "is-invalid" : ""}`}
            name="supportPhone"
            value={form.supportPhone || ""}
            onChange={handleChange}
          />
          {errors.supportPhone && <div className="invalid-feedback">{errors.supportPhone}</div>}
        </div>

        <div className="mb-3">
          <label>Nombre de Contacto de Negocios:</label>
          <input
            className={`form-control ${errors.bussinesContactName ? "is-invalid" : ""}`}
            name="bussinesContactName"
            value={form.bussinesContactName || ""}
            onChange={handleChange}
          />
          {errors.bussinesContactName && <div className="invalid-feedback">{errors.bussinesContactName}</div>}
        </div>

        <div className="mb-3">
          <label>Correo Electrónico:</label>
          <input
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={form.email || ""}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label>Ubicación:</label>
          <input
            className={`form-control ${errors.ubicacion ? "is-invalid" : ""}`}
            name="ubicacion"
            value={form.ubicacion || ""}
            onChange={handleChange}
          />
          {errors.ubicacion && <div className="invalid-feedback">{errors.ubicacion}</div>}
        </div>

        <div className="mb-3">
          <label>Seleccionar Administrador:</label>
          <select
            className={`form-select ${errors.adminId ? "is-invalid" : ""}`}
            name="adminId" // debe coincidir con tu modelo Supplier
            value={form.adminId ?? ""}
            onChange={handleChange}
          >
            <option value="">Seleccione un administrador</option>
            {admins

              .map((a) => (
                <option key={a.idUser} value={a.idUser}>
                  {a.name}
                </option>
              ))}
          </select>
          {errors.adminId && <div className="invalid-feedback">{errors.adminId}</div>}
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-success me-2" onClick={handleSubmit}>
            Guardar
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierForm;