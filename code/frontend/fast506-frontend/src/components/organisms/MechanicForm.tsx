import { useState, useEffect } from "react";
import { Mechanic } from "../../models/Mechanic";
import { create, updateMechanic } from "../../services/MechanicService";
import AlertSuccess from "../atoms/AlertSuccess";
import AlertWarning from "../atoms/AlertWarning";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import { Role } from "../../models/Role";
import * as RoleService from "../../services/RoleService";

interface MechanicFormProps {
  onClose: () => void;
  onRefresh: () => void;
  mechanicToEdit?: Mechanic;
}

const MechanicForm = ({ onClose, onRefresh, mechanicToEdit }: MechanicFormProps) => {
  const [form, setForm] = useState<Partial<Mechanic>>(
    mechanicToEdit || { isActive: true }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Mechanic, string>>>({});
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const rolesData = await RoleService.getAll();
        setRoles(rolesData);
      } catch {
        AlertWarning("Error al cargar los roles");
      }
    };
    loadRoles();
  }, []);

  const specialtyOptions = ["Motor", "Transmisión", "Electricidad", "Suspensión", "Frenos"];
  const certLevelOptions = ["Básico", "Intermedio", "Avanzado", "Experto"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "idRole") {
      setForm({ ...form, role: value === "" ? undefined : { idRole: Number(value) } });
      return;
    }
    const parsedValue =
      name === "dateBirth"
        ? new Date(value)
        : name === "id"
        ? value === "" ? "" : Number(value)
        : value;
    setForm({ ...form, [name]: parsedValue });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Mechanic, string>> = {};
    const lettersOnly = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    const alphanumeric = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numericOnly = /^[0-9]+$/;
    const today = new Date();

    if (!form.name || !lettersOnly.test(form.name) || form.name.length > 50) {
      newErrors.name = "Nombre inválido: solo letras y espacios, máximo 50 caracteres.";
    }
    if (form.id === undefined || form.id === null || !numericOnly.test(form.id.toString()) || form.id.toString().length !== 9) {
      newErrors.id = "Cédula inválida: debe ser numérica y tener exactamente 9 dígitos.";
    }
    if (!form.email || !emailRegex.test(form.email) || form.email.length > 100) {
      newErrors.email = "Email inválido: ingrese un email válido, máximo 100 caracteres.";
    }
    if (!form.password || form.password.length < 8 || form.password.length > 100 || !/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[0-9]/.test(form.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
      newErrors.password = "Contraseña inválida: debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.";
    }
    if (form.phoneNumber && (!numericOnly.test(form.phoneNumber.toString()) || form.phoneNumber.toString().length !== 8)) {
      newErrors.phoneNumber = "El número de teléfono debe ser numérico y tener exactamente 8 dígitos.";
    }
    if (!form.dateBirth || !(form.dateBirth instanceof Date) || isNaN(form.dateBirth.valueOf()) || form.dateBirth > today) {
      newErrors.dateBirth = "Fecha de nacimiento inválida.";
    }
    if (form.profileImage && form.profileImage.length > 200) {
      newErrors.profileImage = "La URL de la imagen debe tener máximo 200 caracteres.";
    }
    if (form.employeeId === undefined || form.employeeId === null || !alphanumeric.test(form.employeeId.toString()) || form.employeeId.toString().length > 20) {
      newErrors.employeeId = "Identificación de empleado inválida: solo letras y números, máximo 20 caracteres.";
    }
    if (!form.specialty || !specialtyOptions.includes(form.specialty.toString())) {
      newErrors.specialty = "Seleccione una especialidad válida.";
    }
    if (!form.certLevel || !certLevelOptions.includes(form.certLevel.toString())) {
      newErrors.certLevel = "Seleccione un nivel de certificación válido.";
    }
    const corporateEmailRegex = /^[^\s@]+@agenciafast\.cr$/;
    if (form.corporateEmail && (!corporateEmailRegex.test(form.corporateEmail) || form.corporateEmail.length > 100)) {
      newErrors.corporateEmail = "Email corporativo inválido: debe terminar en @agenciafast.cr y tener máximo 100 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      if (mechanicToEdit) {
        await updateMechanic(form as Mechanic);
        AlertSuccess("Mecánico actualizado correctamente");
      } else {
        await create(form as Mechanic);
        AlertSuccess("Mecánico creado correctamente");
      }
      onRefresh();
      onClose();
    } catch (error) {
      AlertWarning("Error al guardar");
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-4">{mechanicToEdit ? "Editar Mecánico" : "Nuevo Mecánico"}</h3>

        <div className="mb-3">
          <FormField
            label="Nombre:"
            name="name"
            placeholder="Nombre"
            value={form.name || ""}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Cédula:"
            name="id"
            placeholder="Cédula"
            value={form.id?.toString() || ""}
            onChange={handleChange}
          />
          {errors.id && <div className="invalid-feedback d-block">{errors.id}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Email:"
            name="email"
            placeholder="Email"
            type="email"
            value={form.email || ""}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Contraseña:"
            name="password"
            placeholder="Contraseña"
            type="password"
            value={form.password || ""}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Número de teléfono:"
            name="phoneNumber"
            placeholder="Número de teléfono"
            type="tel"
            value={form.phoneNumber || ""}
            onChange={handleChange}
          />
          {errors.phoneNumber && <div className="invalid-feedback d-block">{errors.phoneNumber}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Fecha de Nacimiento:"
            name="dateBirth"
            placeholder="Fecha de Nacimiento"
            type="date"
            value={form.dateBirth instanceof Date ? form.dateBirth.toISOString().split('T')[0] : form.dateBirth || ""}
            onChange={handleChange}
          />
          {errors.dateBirth && <div className="invalid-feedback d-block">{errors.dateBirth}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Imagen de perfil:"
            name="profileImage"
            placeholder="Imagen de perfil"
            value={form.profileImage || ""}
            onChange={handleChange}
          />
          {errors.profileImage && <div className="invalid-feedback d-block">{errors.profileImage}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Identificación de Empleado:"
            name="employeeId"
            placeholder="Identificación de Empleado"
            value={form.employeeId?.toString() || ""}
            onChange={handleChange}
          />
          {errors.employeeId && <div className="invalid-feedback d-block">{errors.employeeId}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Email Corporativo:"
            name="corporateEmail"
            placeholder="Email Corporativo"
            type="email"
            value={form.corporateEmail || ""}
            onChange={handleChange}
          />
          {errors.corporateEmail && <div className="invalid-feedback d-block">{errors.corporateEmail}</div>}
        </div>

        <div className="mb-3">
          <label>Especialidad:</label>
          <select
            className={`form-control ${errors.specialty ? "is-invalid" : ""}`}
            name="specialty"
            value={form.specialty || ""}
            onChange={handleChange}
          >
            <option value="">Seleccione una especialidad</option>
            {specialtyOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.specialty && <div className="invalid-feedback">{errors.specialty}</div>}
        </div>

        <div className="mb-3">
          <label>Nivel de Certificación:</label>
          <select
            className={`form-control ${errors.certLevel ? "is-invalid" : ""}`}
            name="certLevel"
            value={form.certLevel || ""}
            onChange={handleChange}
          >
            <option value="">Seleccione un nivel</option>
            {certLevelOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.certLevel && <div className="invalid-feedback">{errors.certLevel}</div>}
        </div>

        <div className="mb-3">
          <label>Rol:</label>
          <select
            className={`form-control ${errors.role ? "is-invalid" : ""}`}
            name="idRole"
            value={form.role?.idRole || ""}
            onChange={handleChange}
          >
            <option value="">Seleccione un rol</option>
            {roles.map((role) => (
              <option key={role.idRole} value={role.idRole}>{role.name}</option>
            ))}
          </select>
          {errors.role && <div className="invalid-feedback">{errors.role}</div>}
        </div>

        <div className="text-center mt-4">
             <Button
            label="Guardar"
            onClick={handleSubmit}
            backgroundColor="#198754"    
            hoverColor="#145c32"         
            color="#fff"     
            className="btn btn-success me-2"            
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

export default MechanicForm;