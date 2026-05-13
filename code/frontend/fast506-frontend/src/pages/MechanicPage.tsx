import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import MechanicForm from "../components/MechanicForm";
import TableGeneric from "../components/TableGeneric";
import { getAll, deleteMechanic } from "../services/MechanicService";
import { Mechanic } from "../models/Mechanic";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MechanicPage = () => {

    const [mechanics, setMechanics] = useState<Mechanic[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [MechanicToEdit, setMechanicToEdit] = useState<Mechanic | undefined>(undefined);

    const loadMechanics = async () => {

        const data = await getAll();
        setMechanics(data);

    };

    useEffect(() => {

        loadMechanics();

    }, []);

    const handleSaveAndClose = async () => {
        await loadMechanics();
        setMechanicToEdit(undefined);
        setShowForm(false);
    };

    const handleClose = () => {
        setMechanicToEdit(undefined);
        setShowForm(false);
    };

    const handleEdit = (mechanic: Mechanic) => {
        setMechanicToEdit(mechanic);
        setShowForm(true);
    };

    const handleDelete = async (mechanic: Mechanic) => {
        if (!mechanic.employeeId) return;
        const confirmar = window.confirm(`¿Desea eliminar el mecánico ${mechanic.name}?`);
        if (!confirmar) return;
        await deleteMechanic(mechanic.employeeId!);
        await loadMechanics();
    };

    const columns: { key: keyof Mechanic; label: string }[] = [
        { key: "name", label: "Nombre" },
        { key: "email", label: "Email" },
        { key: "phoneNumber", label: "Telefono" },
        { key: "dateBirth", label: "Fecha de Nacimiento" },
        { key: "profileImage", label: "Imagen de Perfil" },
        { key: "employeeId", label: "ID de Empleado" },
        { key: "corporateEmail", label: "Email Corporativo" },
        { key: "certLevel", label: "Nivel de Certificación" },
        { key: "specialty", label: "Especialidad" },
    ];

    return (

        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#EEF1EF", }}>

            <Navbar />

            <main style={{ flex: 1 }}>
                <div className="container-fluid container-md mt-3 mt-md-4 mb-4 px-2 px-md-4">
                    <div className="card shadow-sm border-0">
                        <div
                            className="card-header d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-2"
                            style={{ backgroundColor: "#2C3E50" }}
                        >
                            <h5 className="mb-0 text-center text-md-start" style={{ color: "#EEF1EF" }}>
                                Gestión de Mecánicos
                            </h5>

                            <div className="d-flex justify-content-center justify-content-md-end">
                                <ButtonNew label="Nuevo" onClick={() => setShowForm(true)} />
                            </div>
                        </div>

                        <div
                            className="card-body p-2 p-md-4"
                            style={{ backgroundColor: "#EEF1EF" }}
                        >
                            {!showForm ? (
                                <TableGeneric
                                    data={mechanics}
                                    columns={columns}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                            ) : (
                                <MechanicForm
                                    onClose={handleClose}
                                    onRefresh={handleSaveAndClose}
                                    mechanicToEdit={MechanicToEdit}
                                    //mechanics={mechanics}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>

    );

}

export default MechanicPage;