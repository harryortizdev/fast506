import { useState } from "react";
import { Mechanic } from "../models/Mechanic";
import { create, updateMechanic } from "../services/MechanicService";

import AlertSuccess from "./AlertSuccess";
import AlertWarning from "./AlertWarning";

interface MechanicFormProps {

    onClose: () => void;
    onRefresh: () => void;
    mechanicToEdit?: Mechanic;

}

const MechanicForm = ({ onClose, onRefresh, mechanicToEdit }: MechanicFormProps) => {
    const [form, setForm] = useState<Partial<Mechanic>>(
        mechanicToEdit || { isActive: true }  // Asignar valor por defecto si no hay mecánico a editar
    );
    const [errors, setErrors] = useState<Partial<Record<keyof Mechanic, string>>>({});

    const specialtyOptions = ["Motor", "Transmisión", "Electricidad", "Suspensión", "Frenos"];
    const certLevelOptions = ["Básico", "Intermedio", "Avanzado", "Experto"];

    const getInputClass = (field: keyof Mechanic) => `form-control ${errors[field] ? "is-invalid" : ""}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const parsedValue = name === "dateBirth"
            ? new Date(value)
            : name === "id" || name === "employeeId"
                ? (value === "" ? "" : Number(value))
                : value;
        setForm({
            ...form,
            [name]: parsedValue,
        });
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

        if (form.id === undefined || form.id === null || !numericOnly.test(form.id.toString()) || form.id.toString().length < 5 || form.id.toString().length > 20) {
            newErrors.id = "Cédula inválida: debe ser numérica, entre 5 y 20 dígitos.";
        }

        if (!form.email || !emailRegex.test(form.email) || form.email.length > 100) {
            newErrors.email = "Email inválido: ingrese un email válido, máximo 100 caracteres.";
        }

        if (!form.password || form.password.length < 8 || form.password.length > 100) {
            newErrors.password = "Contraseña inválida: debe tener entre 8 y 100 caracteres.";
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

        <center>
            <h1></h1>

            <div className="container d-flex justify-content-center">
                <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
                    <h3 className="text-center mb-4">{mechanicToEdit ? "Editar Mecánico" : "Nuevo Mecánico"}</h3>

                    <div className="mb-3">
                        <label>Nombre:</label>
                        <h1 />
                        <input className={getInputClass("name")} name="name" placeholder="Nombre"
                            value={form.name || ""} onChange={handleChange} />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <h1 />

                    <div className="mb-3">
                        <label>Cedula:</label>
                        <h1 />
                        <input className={getInputClass("id")} name="id" placeholder="Cedula"
                            value={form.id || ""} onChange={handleChange} />
                        {errors.id && <div className="invalid-feedback">{errors.id}</div>}
                    </div>
                    <h1 />

                    <div className="mb-3">
                        <label>Email:</label>
                        <h1 />
                        <input className={getInputClass("email")} name="email" placeholder="Email" type="email"
                            value={form.email || ""} onChange={handleChange} />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <h1 />
                    <div className="mb-3">
                        <label>Contraseña:</label>
                        <h1 />
                        <input className={getInputClass("password")} name="password" placeholder="Contraseña" type="password"
                            value={form.password || ""} onChange={handleChange} />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <h1 />
                    <div className="mb-3">
                        <label>Número de telefono:</label>
                        <h1 />
                        <input className={getInputClass("phoneNumber")} name="phoneNumber" placeholder="Número de teléfono" type="tel"
                            value={form.phoneNumber || ""} onChange={handleChange} />
                        {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                    </div>
                    <h1 />
                    <div className="mb-3">
                        <label>Fecha de Nacimiento:</label>
                        <h1 />
                        <input className={getInputClass("dateBirth")} name="dateBirth" placeholder="Fecha de Nacimiento" type="date"
                            value={form.dateBirth instanceof Date ? form.dateBirth.toISOString().split('T')[0] : form.dateBirth || ""} onChange={handleChange} />
                        {errors.dateBirth && <div className="invalid-feedback">{errors.dateBirth}</div>}
                    </div>
                    <h1 />
                    <div className="mb-3">
                        <label>Imagen de perfil:</label>
                        <h1 />
                        <input className={getInputClass("profileImage")} name="profileImage" placeholder="Imagen de perfil"
                            value={form.profileImage || ""} onChange={handleChange} />
                        {errors.profileImage && <div className="invalid-feedback">{errors.profileImage}</div>}
                    </div>
                    <h1 />
                    <div className="mb-3">
                        <label>Identificación de Empleado:</label>
                        <h1 />
                        <input className={getInputClass("employeeId")} name="employeeId" placeholder="Identificación de Empleado"
                            value={form.employeeId || ""} onChange={handleChange} />
                        {errors.employeeId && <div className="invalid-feedback">{errors.employeeId}</div>}
                    </div>
                    <h1 />

                    <h1 />
                    <div className="mb-3">
                        <label>Email Corporativo:</label>
                        <h1 />
                        <input className={getInputClass("corporateEmail")} name="corporateEmail" placeholder="Email Corporativo" type="email"
                            value={form.corporateEmail || ""} onChange={handleChange} />
                        {errors.corporateEmail && <div className="invalid-feedback">{errors.corporateEmail}</div>}
                    </div>
                    <h1 />

                    <h1 />
                    <div className="mb-3">
                        <label>Especialidad:</label>
                        <h1 />
                        <select className={getInputClass("specialty")} name="specialty" value={form.specialty || ""} onChange={handleChange}>
                            <option value="">Seleccione una especialidad</option>
                            {specialtyOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {errors.specialty && <div className="invalid-feedback">{errors.specialty}</div>}
                    </div>
                    <h1 />

                    <h1 />
                    <div className="mb-3">
                        <label>Nivel de Certificación:</label>
                        <h1 />
                        <select className={getInputClass("certLevel")} name="certLevel" value={form.certLevel || ""} onChange={handleChange}>
                            <option value="">Seleccione un nivel</option>
                            {certLevelOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {errors.certLevel && <div className="invalid-feedback">{errors.certLevel}</div>}
                    </div>
                    <h1 />
                    <div className="text-center mt-4">
                        <button className="btn btn-success me-2" onClick={handleSubmit}>Guardar</button>
                        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </div>
        </center>

    );

};

export default MechanicForm;