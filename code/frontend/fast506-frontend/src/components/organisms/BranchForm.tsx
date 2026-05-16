import { useState, useEffect } from "react";
import { Branch } from "../../models/Branch";
import { Administrator } from "../../models/Administrator";
import { create, updateBranch } from "../../services/BranchService";
import { getAll } from "../../services/AdministratorService";
import AlertSuccess from "../atoms/AlertSuccess";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

interface BranchFormProps {
    onClose: () => void;
    onRefresh: () => void;
    branchToEdit?: Branch;
}

const BranchForm = ({ onClose, onRefresh, branchToEdit }: BranchFormProps) => {

    const [form, setForm] = useState<Partial<Branch>>(branchToEdit || {});
    const [Administrator, setAdministrator] = useState<Administrator[]>([]);
    const [errors, setErrors] = useState<Partial<Record<keyof Branch, string>>>({});

    useEffect(() => {
        getAll().then(setAdministrator);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === "idUser" ? Number(value) : value
        });
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof Branch, string>> = {};
        const cleanNumber = (form.branchPhoneNumber || "").toString().replace(/\D/g, "").slice(-8);
        const regex = /^\d{1,2}\.\d+,\s?-\d{1,2}\.\d+$/;

        if (!form.name || form.name.length > 50) {
            newErrors.name = "El nombre puede tener un máximo de 50 caracteres.";
        }
        if (!form.ubication || form.ubication.length > 100) {
            newErrors.ubication = "La ubicación puede tener un máximo de 100 caracteres.";
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
        if (!form.idUser) {
            newErrors.idUser = "Debe seleccionar un usuario.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            const cleanNumber = (form.branchPhoneNumber || "").toString().replace(/\D/g, "").slice(-8);
            const finalNumber = `+506 ${cleanNumber.slice(0, 4)} ${cleanNumber.slice(4, 8)}`;
            if (branchToEdit) {
                await updateBranch({ ...form, branchPhoneNumber: finalNumber } as Branch);
                AlertSuccess("Los cambios fueron guardados.");
            } else {
                const branchToSave = {
                    ...form, branchPhoneNumber: finalNumber, is_Active: '1'
                } as Branch;
                await create(branchToSave);
                AlertSuccess("Sucursal creada correctamente.");
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
                    <FormField
                        label="Nombre"
                        name="name"
                        placeholder="Ejemplo: Fast506 San José"
                        value={form.name || ""}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                </div>

                <div className="mb-2">
                    <FormField
                        label="Ubicación"
                        name="ubication"
                        placeholder="Ejemplo: San José, Zapote"
                        value={form.ubication || ""}
                        onChange={handleChange}
                    />
                    {errors.ubication && <div className="invalid-feedback d-block">{errors.ubication}</div>}
                </div>

                <div className="mb-2">
                    <FormField
                        label="Dirección"
                        name="direction"
                        placeholder="Ejemplo: Frente al Hospital de Niños"
                        value={form.direction || ""}
                        onChange={handleChange}
                    />
                    {errors.direction && <div className="invalid-feedback d-block">{errors.direction}</div>}
                </div>

                <div className="mb-2">
                    <FormField
                        label="Número de la sucursal"
                        name="branchPhoneNumber"
                        placeholder="Ejemplo: 88888888"
                        value={(form.branchPhoneNumber || "").toString().replace(/\D/g, "").slice(-8)}
                        onChange={handleChange}
                        type="number"
                    />
                    {errors.branchPhoneNumber && <div className="invalid-feedback d-block">{errors.branchPhoneNumber}</div>}
                </div>

                <div className="mb-2">
                    <FormField
                        label="Horario de la sucursal"
                        name="operationSchedule"
                        placeholder="Ejemplo: L-V: 9:00am-5:00pm, S-D: 8:00am-12:00pm"
                        value={form.operationSchedule || ""}
                        onChange={handleChange}
                    />
                    {errors.operationSchedule && <div className="invalid-feedback d-block">{errors.operationSchedule}</div>}
                </div>

                <div className="mb-2">
                    <FormField
                        label="Coordenadas de la sucursal"
                        name="coordinates"
                        placeholder="Formato: 10.2117, -83.7847"
                        value={form.coordinates || ""}
                        onChange={handleChange}
                    />
                    {errors.coordinates && <div className="invalid-feedback d-block">{errors.coordinates}</div>}
                </div>

                <div className="mb-2">
                    <label>Usuario Encargado del registro</label>
                    <select
                        className={`form-select ${errors.idUser ? "is-invalid" : ""}`}
                        name="idUser"
                        value={form.idUser ?? ""}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione un encargado</option>
                        {Administrator.map((s) => (
                            <option key={s.idUser} value={s.idUser}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                    {errors.idUser && <div className="invalid-feedback">{errors.idUser}</div>}
                </div>

                <div className="mt-3">
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

export default BranchForm;