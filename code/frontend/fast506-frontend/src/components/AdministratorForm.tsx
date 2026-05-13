import { useState } from "react";
import { Administrator } from "../models/Administrator";
import { create, updateAdministrator } from "../services/AdministratorService";
import AlertSuccess from "./AlertSuccess";
import AlertWarning from "./AlertWarning";

interface AdministratorFormProps {

    onClose: () => void;
    onRefresh: () => void;
    administratorToEdit?: Administrator;
    administrators: Administrator[];

}

const AdministratorForm = ({ onClose, onRefresh, administratorToEdit, administrators }: AdministratorFormProps) => {
    const [form, setForm] = useState<Partial<Administrator>>(
        administratorToEdit || { isActive: true }  // Asignar valor por defecto si no hay administrador a editar
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {

        try {
            if (administratorToEdit) {
                const { profileImage, ...formWithoutImage } = form;
                await updateAdministrator(formWithoutImage as Administrator);
                alert("Administrador actualizado correctamente");
            } else {
                await create(form as Administrator);
                alert("Administrador creado correctamente");
            }
            onRefresh();
            onClose();
        } catch (error) {
            alert("Error al guardar");
        }

    };

    return (

        <center>
            <h1></h1>

            <div className="container d-flex justify-content-center">
                <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
                    <h3 className="text-center mb-4">{administratorToEdit ? "Editar Administrador" : "Nuevo Administrador"}</h3>

                    <div className="mb-3">
                        <label>Nombre:</label>
                        <h1 />
                        <input className="form-control" name="name" placeholder="Nombre"
                            value={form.name || ""} onChange={handleChange} />
                    </div>
                    <h1 />
                    <div className="mb-3">
                        <label>Email:</label>
                        <h1 />
                        <input className="form-control" name="email" placeholder="Email" type="email"
                            value={form.email || ""} onChange={handleChange} />
                    </div>
                    <h1 />
                    <div className="mb-3">
                        <label>Contraseña:</label>
                        <h1 />
                        <input className="form-control" name="password" placeholder="Contraseña" type="password"
                            value={form.password || ""} onChange={handleChange} />
                    </div>
                    <h1 />
                    <div className="mb-3">
                        <label>Número de telefono:</label>
                        <h1 />
                        <input className="form-control" name="phoneNumber" placeholder="Número de teléfono" type="tel"
                            value={form.phoneNumber || ""} onChange={handleChange} />
                    </div>
                    <h1 />
                    <div className="mb-3">
                        <label>Fecha de Nacimiento:</label>
                        <h1 />
                        <input className="form-control" name="dateBirth" placeholder="Fecha de Nacimiento" type="date"
                            value={form.dateBirth instanceof Date ? form.dateBirth.toISOString().split('T')[0] : form.dateBirth || ""} onChange={handleChange} />
                    </div>
                    <h1 />
                    <div className="mb-3">
                        <label>Imagen de perfil:</label>
                        <h1 />
                        <input className="form-control" name="profileImage" placeholder="Imagen de perfil" type="file" accept="image/*"
                            onChange={handleChange} />
                    </div>
                    <h1 />
                    <div className="mb-3">
                        <label>Identificación de Empleado:</label>
                        <h1 />
                        <input className="form-control" name="employeeId" placeholder="Identificación de Empleado"
                            value={form.employeeId || ""} onChange={handleChange} />
                    </div>
                    <h1 />

                    <h1 />
                    <div className="mb-3">
                        <label>Email Corporativo:</label>
                        <h1 />
                        <input className="form-control" name="corporateEmail" placeholder="Email Corporativo" type="email"
                            value={form.corporateEmail || ""} onChange={handleChange} />
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

export default AdministratorForm;