import { useState } from "react";
import { Client } from "../models/Client";
import { create, updateClient } from "../services/ClientService";

import AlertSuccess from "./AlertSuccess";
import AlertWarning from "./AlertWarning";

interface ClientFormProps {

    onClose: () => void;
    onRefresh: () => void;
    clientToEdit?: Client;

}

const ClientForm = ({ onClose, onRefresh, clientToEdit }: ClientFormProps) => {
    const [form, setForm] = useState<Partial<Client>>(
        clientToEdit || { isActive: true }  // Asignar valor por defecto si no hay cliente a editar
    );
    const [errors, setErrors] = useState<Partial<Record<keyof Client, string>>>({});

    const getInputClass = (field: keyof Client) => `form-control ${errors[field] ? "is-invalid" : ""}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const parsedValue = name === "dateBirth"
            ? new Date(value)
            : name === "id"
                ? (value === "" ? "" : Number(value))
                : value;
        setForm({
            ...form,
            [name]: parsedValue,
        });
    };

    const commInterestOptions = ["Sedán", "SUV", "Camioneta", "Deportivo", "Híbrido", "Eléctrico", "Convertible", "Todoterreno"];

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
                        <label>Intereses de autos:</label>
                        <h1 />
                        <select className={getInputClass("commInterest" as keyof Client)} name="commInterest" value={form.commInterest || ""} onChange={handleChange}>
                            <option value="">Seleccione un tipo de auto</option>
                            {commInterestOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {errors.commInterest && <div className="invalid-feedback">{errors.commInterest}</div>}
                    </div>
                    <h1 />

                    <h1 />
                    <div className="mb-3">
                        <label>Dirección física:</label>
                        <h1 />
                        <input className="form-control" name="physicalAddress" placeholder="Dirección Física" type="text"
                            value={form.physicalAddress || ""} onChange={handleChange} />
                    </div>
                    <h1 />

                    <h1 />
                    <div className="mb-3">
                        <label>Ocupación:</label>
                        <h1 />
                        <input className="form-control" name="occupation" placeholder="Ocupación" type="text"
                            value={form.occupation || ""} onChange={handleChange} />
                    </div>
                    <h1 />


                    <div className="text-center mt-4">
                        <button className="btn btn-success me-2" onClick={handleSubmit}>Guardar</button>
                        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </div>
    );

};

export default ClientForm;