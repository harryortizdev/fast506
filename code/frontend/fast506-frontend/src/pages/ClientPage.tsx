import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import ClientForm from "../components/ClientForm";
import TableGeneric from "../components/TableGeneric";
import { getAll, deleteClient } from "../services/ClientService";
import { Client } from "../models/Client";

const ClientPage = () => {

    const [clients, setClients] = useState<Client[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [clientToEdit, setClientToEdit] = useState<Client | undefined>(undefined);

    const loadClients = async () => {

        const data = await getAll();
        setClients(data);

    };

    useEffect(() => {

        loadClients();

    }, []);

    const handleSaveAndClose = async () => {
        await loadClients();
        setClientToEdit(undefined);
        setShowForm(false);
    };

    const handleClose = () => {
        setClientToEdit(undefined);
        setShowForm(false);
    };

    const handleEdit = (client: Client) => {
        setClientToEdit(client);
        setShowForm(true);
    };

    const handleDelete = async (client: Client) => {
        if (!client.idUser) return;
        const confirmar = window.confirm(`¿Desea eliminar el cliente ${client.name}?`);
        if (!confirmar) return;
        await deleteClient(client.idUser!);
        await loadClients();
    };

    const columns: { key: keyof Client; label: string }[] = [
        { key: "name", label: "Nombre" },
        { key: "email", label: "Email" },
        { key: "password", label: "Contraseña" },
        { key: "phoneNumber", label: "Telefono" },
        { key: "dateBirth", label: "Fecha de Nacimiento" },
        { key: "profileImage", label: "Imagen de Perfil" },
        { key: "commInterest", label: "Intereses" },
        { key: "physicalAddress", label: "Dirección Física" },
    ];

    return (

        <div>
            {!showForm ? (
                <>
                    <ButtonNew label="Nuevo Cliente" onClick={() => setShowForm(true)} />
                    <TableGeneric
                        data={clients}
                        columns={columns}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </>
            ) : (
                <ClientForm
                    onClose={handleClose}
                    onRefresh={handleSaveAndClose}
                    clientToEdit={clientToEdit}
                />
            )}
        </div>

    );

}

export default ClientPage;