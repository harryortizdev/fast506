import { useState } from "react";
import { Role } from "../../models/Role";
import { create, updateRole } from "../../services/RoleService";
import Button from "../atoms/Button";
import AlertSuccess from "../atoms/AlertSuccess";
import AlertWarning from "../atoms/AlertWarning";
import FormField from "../molecules/FormField";

interface RoleFormProps {
  onClose: () => void;
  onRefresh: () => void;
  roleToEdit?: Role;
  roles: Role[];
}

const RoleForm = ({ onClose, onRefresh, roleToEdit, roles }: RoleFormProps) => {
  const [form, setForm] = useState<Partial<Role>>(
    roleToEdit || { isActive: true, isWorker: false, haveEmail: false },
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Role, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "idRole" || name === "levelHierarchy"
        ? value === ""
          ? ""
          : Number(value)
        : name === "isWorker" || name === "haveEmail" || name === "isActive"
          ? e.target.type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value === "true"
          : value;
    setForm({ ...form, [name]: parsedValue });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Role, string>> = {};
    const lettersOnly = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    const alphanumeric = /^[a-zA-Z0-9]+$/;

    if (!form.name || !lettersOnly.test(form.name) || form.name.length > 50) {
      newErrors.name =
        "Nombre inválido: solo letras y espacios, máximo 50 caracteres.";
    }
    if (form.description && form.description.length > 200) {
      newErrors.description =
        "La descripción debe tener máximo 200 caracteres.";
    }
    if (
      form.levelHierarchy === undefined ||
      form.levelHierarchy === null ||
      isNaN(form.levelHierarchy) ||
      form.levelHierarchy < 1 ||
      form.levelHierarchy > 10
    ) {
      newErrors.levelHierarchy =
        "Nivel de jerarquía inválido: debe ser entre 1 y 10.";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    if (!roleToEdit) {
      const existingRole = roles.find(
        (r) => r.name.toLowerCase() === form.name?.toLowerCase(),
      );
      if (existingRole) {
        AlertWarning("Ya existe un rol con ese nombre.");
        return;
      }
    }

    try {
      if (roleToEdit) {
        await updateRole(form as Role);
        AlertSuccess("Rol actualizado exitosamente.");
      } else {
        console.log(JSON.stringify(form, null, 2));
        await create(form as unknown as Role);
        AlertSuccess("Rol creado exitosamente.");
      }
      onRefresh();
      onClose();
    } catch (error) {
      AlertWarning("Ocurrió un error al guardar el rol.");
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h3 className="text-center mb-4">
          {roleToEdit ? "Editar Rol" : "Nuevo Rol"}
        </h3>

        <div className="mb-3">
          <FormField
            label="Nombre:"
            name="name"
            placeholder="Nombre del rol"
            value={form.name || ""}
            onChange={handleChange}
          />
          {errors.name && (
            <div className="invalid-feedback d-block">{errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <FormField
            label="Descripción:"
            name="description"
            placeholder="Descripción del rol"
            value={form.description || ""}
            onChange={handleChange}
          />
          {errors.description && (
            <div className="invalid-feedback d-block">{errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <FormField
            label="Nivel de Jerarquía:"
            name="levelHierarchy"
            type="number"
            placeholder="Nivel de jerarquía (1-10)"
            value={
              form.levelHierarchy !== undefined
                ? String(form.levelHierarchy)
                : ""
            }
            onChange={handleChange}
          />
          {errors.levelHierarchy && (
            <div className="invalid-feedback d-block">
              {errors.levelHierarchy}
            </div>
          )}
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isWorker"
            name="isWorker"
            checked={form.isWorker || false}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isWorker">
            Es para trabajadores
          </label>
          {errors.isWorker && (
            <div className="invalid-feedback d-block">{errors.isWorker}</div>
          )}
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="haveEmail"
            name="haveEmail"
            checked={form.haveEmail || false}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="haveEmail">
            Tiene email
          </label>
          {errors.haveEmail && (
            <div className="invalid-feedback d-block">{errors.haveEmail}</div>
          )}
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            name="isActive"
            checked={form.isActive || false}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isActive">
            Activo
          </label>
          {errors.isActive && (
            <div className="invalid-feedback d-block">{errors.isActive}</div>
          )}
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

export default RoleForm;
