import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import ClientForm from "../components/ClientForm";
import TableGeneric from "../components/TableGeneric";
import { getAll, deleteClient } from "../services/ClientService";
import { Client } from "../models/Client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    { key: "id", label: "Cedula" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Telefono" },
    { key: "dateBirth", label: "Fecha de Nacimiento" },
    { key: "profileImage", label: "Imagen de Perfil" },
    { key: "commInterest", label: "Intereses" },
    { key: "physicalAddress", label: "Dirección Física" },
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
                Gestión de Clientes
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
                  data={clients}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ) : (
                <ClientForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
                  clientToEdit={clientToEdit}
                //clients={clients}
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

export default ClientPage;