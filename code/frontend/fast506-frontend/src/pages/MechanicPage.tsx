import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import MechanicForm from "../components/MechanicForm";
import TableGeneric from "../components/TableGeneric";
import { getAll, deleteMechanic } from "../services/MechanicService";
import { Mechanic } from "../models/Mechanic";

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
        { key: "password", label: "Contraseña" },
        { key: "phoneNumber", label: "Telefono" },
        { key: "dateBirth", label: "Fecha de Nacimiento" },
        { key: "profileImage", label: "Imagen de Perfil" },
        { key: "employeeId", label: "ID de Empleado" },
        { key: "corporateEmail", label: "Email Corporativo" },
        {key: "certLevel", label: "Nivel de Certificación" },
        {key: "specialty", label: "Especialidad" },
    ];

    return (

        <div>
            {!showForm ? (
                <>
                    <ButtonNew label="Nuevo Mecánico" onClick={() => setShowForm(true)} />
                    <TableGeneric
                        data={mechanics}
                        columns={columns}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </>
            ) : (
                <MechanicForm
                    onClose={handleClose}
                    onRefresh={handleSaveAndClose}
                    mechanicToEdit={MechanicToEdit}
                />
            )}
        </div>

    );

}

export default MechanicPage;