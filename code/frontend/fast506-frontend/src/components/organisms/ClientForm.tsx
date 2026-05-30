import { useState } from "react";
import { Client } from "../../models/Client";
import { create, updateClient } from "../../services/ClientService";
import AlertSuccess from "../atoms/AlertSuccess";
import AlertWarning from "../atoms/AlertWarning";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

interface ClientFormProps {
  onClose: () => void;
  onRefresh: () => void;
  clientToEdit?: Client;
}

const ClientForm = ({ onClose, onRefresh, clientToEdit }: ClientFormProps) => {
  const [form, setForm] = useState<Partial<Client>>(
    clientToEdit || { isActive: true }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Client, string>>>({});

  const commInterestOptions = ["Sedán", "SUV", "Camioneta", "Deportivo", "Híbrido", "Eléctrico", "Convertible", "Todoterreno"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === "dateBirth"
      ? new Date(value)
      : name === "id"
        ? (value === "" ? "" : Number(value))
        : value;
    setForm({ ...form, [name]: parsedValue });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Client, string>> = {};
    const lettersOnly = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numericOnly = /^[0-9]+$/;
    const today = new Date();

    if (!form.name || !lettersOnly.test(form.name) || form.name.length > 50) {
      newErrors.name = "Nombre inválido: solo letras y espacios, máximo 50 caracteres.";
    }
    if (form.id === undefined || form.id === null || !numericOnly.test(form.id.toString()) || form.id.toString().length < 5 || form.id.toString().length > 20) {
      newErrors.id = "Cédula inválida: debe ser numérica, entre 5 y 20 dígitos.";
    }
    if (!form.email || !emailRegex.test(form.email) || form.email.length > 100) {
      newErrors.email = "Email inválido: ingrese un email válido, máximo 100 caracteres.";
    }
    if (!form.password || form.password.length < 8 || form.password.length > 100 || !/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[0-9]/.test(form.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
      newErrors.password = "Contraseña inválida: debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.";
    }
    if (form.phoneNumber && (!numericOnly.test(form.phoneNumber.toString()) || form.phoneNumber.toString().length > 15)) {
      newErrors.phoneNumber = "El número de teléfono debe ser numérico y tener máximo 15 dígitos.";
    }
    if (!form.dateBirth || !(form.dateBirth instanceof Date) || isNaN(form.dateBirth.valueOf()) || form.dateBirth > today) {
      newErrors.dateBirth = "Fecha de nacimiento inválida.";
    }
    if (form.profileImage && form.profileImage.length > 200) {
      newErrors.profileImage = "La URL de la imagen debe tener máximo 200 caracteres.";
    }
    if (!form.commInterest || !commInterestOptions.includes(form.commInterest.toString())) {
      newErrors.commInterest = "Seleccione un interés válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      if (clientToEdit) {
        await updateClient(form as Client);
        AlertSuccess("Cliente actualizado correctamente");
      } else {
        await create(form as Client);
        AlertSuccess("Cliente creado correctamente");
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
        <h3 className="text-center mb-4">{clientToEdit ? "Editar Cliente" : "Nuevo Cliente"}</h3>

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
          <label>Intereses de autos:</label>
          <select
            className={`form-control ${errors.commInterest ? "is-invalid" : ""}`}
            name="commInterest"
            value={form.commInterest || ""}
            onChange={handleChange}
          >
            <option value="">Seleccione un tipo de auto</option>
            {commInterestOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.commInterest && <div className="invalid-feedback">{errors.commInterest}</div>}
        </div>

        <div className="mb-3">
          <FormField
            label="Dirección física:"
            name="physicalAddress"
            placeholder="Dirección Física"
            value={form.physicalAddress || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <FormField
            label="Ocupación:"
            name="occupation"
            placeholder="Ocupación"
            value={form.occupation || ""}
            onChange={handleChange}
          />
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

export default ClientForm;