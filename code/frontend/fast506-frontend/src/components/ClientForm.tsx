import { useState } from "react";
import { Client } from "../models/Client";
import { create, updateClient } from "../services/ClientService";

interface ClientFormProps {

    onClose: () => void;
    onRefresh: () => void;
    clientToEdit?: Client;

}

const ClientForm = ({ onClose, onRefresh, clientToEdit }: ClientFormProps) => {
    const [form, setForm] = useState<Partial<Client>>(
        clientToEdit || { isActive: true }  // Asignar valor por defecto si no hay cliente a editar
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {

        try {
            if (clientToEdit) {
                await updateClient(form as Client);
                alert("Cliente actualizado correctamente");
            } else {
                await create(form as Client);
                alert("Cliente creado correctamente");
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
                    <h3 className="text-center mb-4">{clientToEdit ? "Editar Cliente" : "Nuevo Cliente"}</h3>

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
                            value={form.profileImage || ""} onChange={handleChange} />
                    </div>
                    <h1 />
                    <div className="mb-3">
                        <label>Intereses:</label>
                        <h1 />
                        <input className="form-control" name="interests" placeholder="Intereses"
                            value={form.commInterest || ""} onChange={handleChange} />
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
        </center>

    );

};

export default ClientForm;