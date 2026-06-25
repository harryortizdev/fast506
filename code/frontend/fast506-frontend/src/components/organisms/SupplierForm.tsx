import { useState, useEffect } from "react";
import { Supplier } from "../../models/Supplier";
import { Administrator } from "../../models/Administrator";
import { create, updateSupplier, getAll } from "../../services/SupplierService";
import { getAll as getAdmins } from "../../services/AdministratorService";
import AlertSuccess from "../atoms/AlertSuccess";
import AlertWarning from "../atoms/AlertWarning";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

interface SupplierFormProps {
  onClose: () => void;
  onRefresh: () => void;
  supplierToEdit?: Supplier;
}

const SupplierForm = ({ onClose, onRefresh, supplierToEdit }: SupplierFormProps) => {
  const [form, setForm] = useState<Partial<Supplier>>(supplierToEdit || { isActive: true });
  const [admins, setAdmins] = useState<Administrator[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof Supplier, string>>>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await getAdmins();
        const list = data.map((a: any) => ({ ...a, idUser: Number(a.idUser) }));
        setAdmins(list);
      } catch (error) {
        console.error("Error al obtener administradores:", error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const data = await getAll();
        setSuppliers(data);
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
      }
    };

    fetchAdmins();
    fetchSuppliers();
  }, []);

  const phoneRegex = /^[0-9-+\s()]{7,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const lettersRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  const existsByField = (field: keyof Supplier, value: string, formData: Partial<Supplier>) => {
    return suppliers.some((s) => {
      const supplierValue = String((s as any)[field] ?? "").toLowerCase().trim();
      return supplierValue === value.toLowerCase() && s.idSupplier !== formData.idSupplier;
    });
  };

  const validateField = (fieldName: keyof Supplier, formData: Partial<Supplier>): string => {
    const name = String(formData.name ?? "").trim();
    const companyName = String(formData.companyName ?? "").trim();
    const legalName = String(formData.legalName ?? "").trim();
    const supportPhone = String(formData.supportPhone ?? "").trim();
    const contactName = String(formData.bussinesContactName ?? "").trim();
    const email = String(formData.email ?? "").trim();
    const ubicacion = String(formData.ubicacion ?? "").trim();

    if (fieldName === "name") {
      if (!name) return "El nombre es obligatorio.";
      if (name.length > 50) return "El nombre no puede tener más de 50 caracteres.";
      if (existsByField("name", name, formData)) return "Ya existe un proveedor con ese nombre.";
      return "";
    }

    if (fieldName === "companyName") {
      if (!companyName) return "El nombre de la compañía es obligatorio.";
      if (companyName.length > 50) return "La compañía no puede tener más de 50 caracteres.";
      if (existsByField("companyName", companyName, formData)) return "Ya existe un proveedor con esa compañía.";
      return "";
    }

    if (fieldName === "legalName") {
      if (!legalName) return "El nombre legal es obligatorio.";
      if (legalName.length > 50) return "El nombre legal no puede tener más de 50 caracteres.";
      if (existsByField("legalName", legalName, formData)) return "Ya existe un proveedor con ese nombre legal.";
      return "";
    }

    if (fieldName === "supportPhone") {
      if (!supportPhone) return "El teléfono de soporte es obligatorio.";
      if (!phoneRegex.test(supportPhone)) {
        return "El teléfono debe tener un formato válido (solo números, espacios o signos básicos).";
      }
      return "";
    }

    if (fieldName === "bussinesContactName") {
      if (!contactName) return "El nombre de contacto es obligatorio.";
      if (!lettersRegex.test(contactName)) {
        return "El nombre de contacto solo puede incluir letras y espacios.";
      }
      if (contactName.length > 150) return "El nombre de contacto no puede tener más de 150 caracteres.";
      return "";
    }

    if (fieldName === "email") {
      if (!email) return "El correo electrónico es obligatorio.";
      if (!emailRegex.test(email)) {
        return "El correo debe tener un formato válido, por ejemplo: nombre@dominio.com.";
      }
      if (email.length > 100) return "El correo no puede tener más de 100 caracteres.";
      if (existsByField("email", email, formData)) return "Este correo ya está siendo usado por otro proveedor.";
      return "";
    }

    if (fieldName === "ubicacion") {
      if (!ubicacion) return "La ubicación es obligatoria.";
      if (ubicacion.length > 100) return "La ubicación no puede tener más de 100 caracteres.";
      return "";
    }

    if (fieldName === "adminId") {
      if (!formData.adminId || Number(formData.adminId) <= 0) return "Debe seleccionar un administrador.";
      return "";
    }

    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof Supplier;
    const parsedValue = name === "adminId" ? (value ? Number(value) : undefined) : value;
    const nextForm = {
      ...form,
      [name]: parsedValue,
    };

    setForm(nextForm);

    const fieldError = validateField(fieldName, nextForm);

    setErrors((prev) => ({
      ...prev,
      [fieldName]: fieldError,
    }));
    setSubmitError("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = e.target.name as keyof Supplier;
    const fieldError = validateField(fieldName, form);

    setErrors((prev) => ({
      ...prev,
      [fieldName]: fieldError,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Supplier, string>> = {};
    const fieldsToValidate: Array<keyof Supplier> = [
      "name",
      "companyName",
      "legalName",
      "supportPhone",
      "bussinesContactName",
      "email",
      "ubicacion",
      "adminId",
    ];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, form);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    setSubmitError(
      Object.keys(newErrors).length > 0
        ? "No se pudo guardar. Revisa los mensajes en rojo para saber exactamente qué corregir."
        : ""
    );
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitError("");
    setIsSubmitting(true);

    try {
      let dataToSend: any;

      const normalizedSupplier = {
        name: String(form.name ?? "").trim(),
        companyName: String(form.companyName ?? "").trim(),
        legalName: String(form.legalName ?? "").trim(),
        supportPhone: String(form.supportPhone ?? "").trim(),
        bussinesContactName: String(form.bussinesContactName ?? "").trim(),
        email: String(form.email ?? "").trim(),
        ubicacion: String(form.ubicacion ?? "").trim(),
      };

      if (supplierToEdit) {
        dataToSend = {
          idSupplier: form.idSupplier,
          ...normalizedSupplier,
          adminId: Number(form.adminId),
          active: form.isActive,
        };
      } else {
        dataToSend = {
          ...normalizedSupplier,
          adminId: Number(form.adminId),
          active: form.isActive,
        };
      }

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
      const backendError = error instanceof Error ? error.message : "Error desconocido";
      setSubmitError(`No se pudo guardar el proveedor: ${backendError}`);
      AlertWarning("Error al guardar proveedor.");
      console.error("Error al guardar proveedor:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4">
          {supplierToEdit ? "Editar Proveedor" : "Nuevo Proveedor"}
        </h3>

        {submitError && (
          <div className="alert alert-danger py-2 mb-3" role="alert">
            {submitError}
          </div>
        )}

        <div className="mb-3">
          <FormField
            label="Nombre:"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            inputClassName={errors.name ? "is-invalid" : ""}
          />
          {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Compañía:"
            name="companyName"
            value={form.companyName || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            inputClassName={errors.companyName ? "is-invalid" : ""}
          />
          {errors.companyName && <div className="invalid-feedback d-block">{errors.companyName}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Nombre Legal:"
            name="legalName"
            value={form.legalName || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            inputClassName={errors.legalName ? "is-invalid" : ""}
          />
          {errors.legalName && <div className="invalid-feedback d-block">{errors.legalName}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Teléfono de Soporte:"
            name="supportPhone"
            value={form.supportPhone || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            inputClassName={errors.supportPhone ? "is-invalid" : ""}
          />
          {errors.supportPhone && <div className="invalid-feedback d-block">{errors.supportPhone}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Nombre de Contacto de Negocios:"
            name="bussinesContactName"
            value={form.bussinesContactName || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            inputClassName={errors.bussinesContactName ? "is-invalid" : ""}
          />
          {errors.bussinesContactName && <div className="invalid-feedback d-block">{errors.bussinesContactName}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Correo Electrónico:"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            inputClassName={errors.email ? "is-invalid" : ""}
            type="email"
          />
          {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Ubicación:"
            name="ubicacion"
            value={form.ubicacion || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            inputClassName={errors.ubicacion ? "is-invalid" : ""}
          />
          {errors.ubicacion && <div className="invalid-feedback d-block">{errors.ubicacion}</div>}
        </div>

        <div className="mb-3">
          <label>Seleccionar Administrador:</label>
          <select
            className={`form-select ${errors.adminId ? "is-invalid" : ""}`}
            name="adminId"
            value={form.adminId ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Seleccione un administrador</option>
            {admins.map((a) => (
              <option key={a.idUser} value={a.idUser}>
                {a.name}
              </option>
            ))}
          </select>
          {errors.adminId && <div className="invalid-feedback">{errors.adminId}</div>}
        </div>

        <div className="text-center mt-4">
          <Button
            label={isSubmitting ? "Guardando..." : "Guardar"}
            onClick={handleSubmit}
            backgroundColor="#198754"
            hoverColor="#145c32"
            color="#fff"
            className="btn btn-success me-2"
            disabled={isSubmitting}
          />

          <Button
            label="Cancelar"
            onClick={onClose}
            backgroundColor="#6c757d"
            hoverColor="#495057"
            color="#fff"
            className="btn btn-secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierForm;