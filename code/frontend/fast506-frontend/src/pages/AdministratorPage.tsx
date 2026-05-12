import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import AdministratorForm from "../components/AdministratorForm";
import TableGeneric from "../components/TableGeneric";
import { getAll, deleteAdministrator } from "../services/AdministratorService";
import { Administrator } from "../models/Administrator";

const AdministratorPage = () => {

    const [administrators, setAdministrators] = useState<Administrator[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [administratorToEdit, setAdministratorToEdit] = useState<Administrator | undefined>(undefined);

    const loadAdministrators = async () => {

        const data = await getAll();
        setAdministrators(data);

    };

    useEffect(() => {

        loadAdministrators();

    }, []);

    const handleSaveAndClose = async () => {
        await loadAdministrators();
        setAdministratorToEdit(undefined);
        setShowForm(false);
    };

    const handleClose = () => {
        setAdministratorToEdit(undefined);
        setShowForm(false);
    };

    const handleEdit = (administrator: Administrator) => {
        setAdministratorToEdit(administrator);
        setShowForm(true);
    };

    const handleDelete = async (administrator: Administrator) => {
        if (!administrator.employeeId) return;
        const confirmar = window.confirm(`¿Desea eliminar el administrador ${administrator.name}?`);
        if (!confirmar) return;
        await deleteAdministrator(administrator.employeeId!);
        await loadAdministrators();
    };

    const columns: { key: keyof Administrator; label: string }[] = [
        { key: "name", label: "Nombre" },
        { key: "email", label: "Email" },
        { key: "password", label: "Contraseña" },
        { key: "phoneNumber", label: "Telefono" },
        { key: "dateBirth", label: "Fecha de Nacimiento" },
        { key: "profileImage", label: "Imagen de Perfil" },
        { key: "employeeId", label: "ID de Empleado" },
        { key: "corporateEmail", label: "Email Corporativo" },
    ];

    return (

        <div>
            {!showForm ? (
                <>
                    <ButtonNew label="Nuevo Administrador" onClick={() => setShowForm(true)} />
                    <TableGeneric
                        data={administrators}
                        columns={columns}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </>
            ) : (
                <AdministratorForm
                    onClose={handleClose}
                    onRefresh={handleSaveAndClose}
                    administratorToEdit={administratorToEdit}
                />
            )}
        </div>

    );

}

export default AdministratorPage;