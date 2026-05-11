import { useState } from "react";
import { Branch } from "../models/Branch";
import { create, updateBranch } from "../services/BranchService";
import AlertSuccess from "./AlertSuccess";

interface BranchFormProps {
    onClose: () => void;
    onRefresh: () => void;
    branchToEdit?: Branch;
}

const BranchForm = ({ onClose, onRefresh, branchToEdit }: BranchFormProps) => {

    const [form, setForm] = useState<Partial<Branch>>(branchToEdit || {});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const [errors, setErrors] = useState<Partial<Record<keyof Branch, string>>>({});


    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof Branch, string>> = {};
        const cleanNumber = (form.branchPhoneNumber || "").toString().replace(/\D/g, "").slice(-8);
        const regex = /^\d{1,2}\.\d+,\s?-\d{1,2}\.\d+$/;


        if (!form.name || form.name.length > 50) {
            newErrors.name = "El nombre puede tener un máximo de 50 caracteres.";
        }

        if (!form.ubication || form.ubication.length > 100) {
            newErrors.ubication = "La ubicación puede tener un máximo de de 100 caracteres.";
        }
        if (!form.direction || form.direction.length > 100) {
            newErrors.direction = "La dirección puede tener un máximo de 100 caracteres.";
        }

        if (!form.operationSchedule || form.operationSchedule.length > 200) {
            newErrors.operationSchedule = "El horario puede tener un máximo de 200 caracteres.";
        }

        if (cleanNumber.length !== 8) {
            newErrors.branchPhoneNumber = "El número de telefono puede tener un máximo de 8 dígitos.";
        }

        if (!form.coordinates || form.coordinates.length > 200 || !regex.test(form.coordinates)) {
            newErrors.coordinates = "Las coordenadas puede tener un máximo de 40 caracteres, formato debe ser: Latitud, -Longitud (ej: 10.2117, -83.7847)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;//valida que esté bien y completa la info

        try {
            const cleanNumber = (form.branchPhoneNumber || "").toString().replace(/\D/g, "").slice(-8);
            const finalNumber = `+506 ${cleanNumber.slice(0, 4)} ${cleanNumber.slice(4, 8)}`;
            if (branchToEdit) {
                await updateBranch({ ...form, branchPhoneNumber: finalNumber } as Branch);
                AlertSuccess("Los cambios fueron guardados.");
            } else {
                const branchToSave = {
                    ...form, branchPhoneNumber: finalNumber, is_Active: '1', idUser: 0
                } as Branch; await create(branchToSave);
                AlertSuccess("Sucursal creada correctamente.");//muestra el mensaje
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
                <h3>{branchToEdit ? "Editar Sucursal" : "Nueva Sucursal"}</h3>

                <div className="mb-2">
                    <label>Nombre</label>
                    <input className={`form-control ${errors.name ? "is-invalid" : ""}`} name="name" placeholder="Ejemplo: Fast506 San José"
                        value={form.name || ""} onChange={handleChange} required maxLength={50} type="text" />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}

                </div>

                <div className="mb-2">
                    <label>Ubicación</label>
                    <input className={`form-control ${errors.ubication ? "is-invalid" : ""}`} name="ubication" placeholder="Ejemplo: San José, Zapote"
                        value={form.ubication || ""} onChange={handleChange} required maxLength={100} />
                    {errors.ubication && <div className="invalid-feedback">{errors.ubication}</div>}
                </div>

                <div className="mb-2">
                    <label>Dirección</label>
                    <input className={`form-control ${errors.direction ? "is-invalid" : ""}`} name="direction" placeholder="Ejemplo: Frente al Hospital de Niños"
                        value={form.direction || ""} onChange={handleChange} required maxLength={100} />
                    {errors.direction && <div className="invalid-feedback">{errors.direction}</div>}

                </div>


                <div className="mb-2">
                    <label>Número de la sucursal</label>
                    <input className={`form-control ${errors.branchPhoneNumber ? "is-invalid" : ""}`} name="branchPhoneNumber" value={(form.branchPhoneNumber || "").replace(/\D/g, "").slice(-8)}
                        onChange={handleChange} minLength={8} maxLength={8} placeholder="Ejemplo:88888888" type="number"
                    />
                    {errors.branchPhoneNumber && <div className="invalid-feedback">{errors.branchPhoneNumber}</div>}

                </div>

                <div className="mb-2">
                    <label>Horario de la sucursal</label>
                    <input className={`form-control ${errors.operationSchedule ? "is-invalid" : ""}`} name="operationSchedule" placeholder="Ejemplo: L-V: 9:00am-5:00pm, S-D: 8:00am-12:00pm"
                        value={form.operationSchedule || ""} onChange={handleChange} required maxLength={200} />
                    {errors.operationSchedule && <div className="invalid-feedback">{errors.operationSchedule}</div>}

                </div>

                <div className="mb-2">
                    <label>Coordendas de la sucursal</label>
                    <input className={`form-control ${errors.coordinates ? "is-invalid" : ""}`} name="coordinates" placeholder="Formato: 10.2117, -83.7847)"
                        value={form.coordinates || ""} onChange={handleChange} required maxLength={40} />
                    {errors.coordinates && <div className="invalid-feedback">{errors.coordinates}</div>}

                </div>

                <div className="mb-2">
                    <label>Usuario Encargado del registro</label>
                    <select className="form-select" name="idUser"
                        value={form.idUser || ""} onChange={handleChange} required>
                        <option value="">Seleccione un encargado</option>
                        <option value="0">Encargado 1</option>
                        <option value="0">Encargado 2</option>
                        <option value="0">Encargado 3</option>
                    </select>
                </div>

                <div className="mt-3">
                    <button className="btn btn-success me-2" onClick={handleSubmit}>Guardar</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                </div>
            </div></div>
    );
};

export default BranchForm;