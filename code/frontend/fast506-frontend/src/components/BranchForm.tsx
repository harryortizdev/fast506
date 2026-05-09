import { useState } from "react";
import { Branch } from "../models/Branch";
import { create, updateBranch } from "../services/BranchService";

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

    const handleSubmit = async () => {

        if (!form.name || !form.ubication || !form.direction || !form.branchPhoneNumber || !form.operationSchedule || !form.idUser) {
            alert("Rellene todos los datos con información valida.")
            return;
        }

        if (form.name.length > 50) {
            alert("El nombre no puede tener más de 50 caracteres.");
            return;
        }

        if (form.ubication.length > 100) {
            alert("La ubicación no puede tener más de 100 caracteres.");
            return;
        }
        if (form.direction.length > 100) {
            alert("La Dirección no puede tener más de 100 caracteres.");
            return;
        }

        if (form.operationSchedule.length > 200) {
            alert("El horario no puede tener más de 200 caracteres.");
            return;
        }

        const cleanNumber = (form.branchPhoneNumber || "").toString().replace(/\D/g, "").slice(-8);

        if (cleanNumber.length !== 8) {
            alert("El número debe tener 8 dígitos.");
            return;
        }

        const finalNumber = `+506 ${cleanNumber.slice(0, 4)} ${cleanNumber.slice(4, 8)}`;


        try {
            if (branchToEdit) {
                await updateBranch({ ...form, branchPhoneNumber: finalNumber } as Branch);
                alert("Sucursal actualizada correctamente");
            } else {


                const branchToSave = {
                    ...form, branchPhoneNumber: finalNumber, is_Active: '1', idUser: 0
                } as Branch; await create(branchToSave);
                alert("Sucursal creada correctamente");
            }
            onRefresh();
            onClose();
        } catch (error) {
            alert("Error al guardar");
        }
    };


    return (
        <div className="card p-3 mb-3">
            <h3>{branchToEdit ? "Editar Sucursal" : "Nueva Sucursal"}</h3>

            <div className="mb-2">
                <label>Nombre</label>
                <input className="form-control" name="name" placeholder="Ejemplo: Fast506 San José"
                    value={form.name || ""} onChange={handleChange} required maxLength={50} type="text" />
            </div>

            <div className="mb-2">
                <label>Ubicación</label>
                <input className="form-control" name="ubication" placeholder="Ejemplo: San José, Zapote"
                    value={form.ubication || ""} onChange={handleChange} required maxLength={100} />
            </div>

            <div className="mb-2">
                <label>Dirección</label>
                <input className="form-control" name="direction" placeholder="Ejemplo: Frente al Hospital de Niños"
                    value={form.direction || ""} onChange={handleChange} required maxLength={100} />
            </div>


            <div className="mb-2">
                <label>Número de la sucursal</label>
                <input
                    className="form-control" name="branchPhoneNumber" value={(form.branchPhoneNumber || "").replace(/\D/g, "").slice(-8)}
                    onChange={handleChange} minLength={8} maxLength={8} placeholder="Ejemplo:88888888" type="number"
                />
            </div>

            <div className="mb-2">
                <label>Horario de la sucursal</label>
                <input className="form-control" name="operationSchedule" placeholder="Ejemplo: L-V: 9:00am-5:00pm, S-D: 8:00am-12:00pm"
                    value={form.operationSchedule || ""} onChange={handleChange} required maxLength={200} />
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
        </div>
    );
};

export default BranchForm;