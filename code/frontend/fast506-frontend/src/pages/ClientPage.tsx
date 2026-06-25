import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import ClientForm from "../components/organisms/ClientForm";
import TableGeneric from "../components/organisms/TableGeneric";
import { getAll, deleteClient } from "../services/ClientService";
import { Client } from "../models/Client";
import ButtonIcon from "../components/molecules/ButtonIcon";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

type ClientTable = Client & {
  dateFormatted: string;
};

const ClientPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | undefined>(
    undefined,
  );
  const [refreshKey, setRefreshKey] = useState(0);

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
    setRefreshKey((prev) => prev + 1);
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
    const confirmar = await AlertConfirm(
      `¿Desea eliminar el cliente ${client.name}?`,
    );
    if (!confirmar) return;
    await deleteClient(client.idUser!);
    await loadClients();
    setRefreshKey((prev) => prev + 1);
  };

  const formatDate = (date?: any) => {
    if (!date) return "";

    let dateObject: Date;

    //    Si la fecha viene como un arreglo de número[2026, 6, 23]
    if (Array.isArray(date)) {
      const [year, month, day] = date;

      dateObject = new Date(year, month - 1, day);
    } else {
      dateObject = new Date(String(date).split("T")[0] + "T00:00:00");
    }

    // corrupto o algo que no se pudo parsear bien getTime() devolve NaN es así, devolvemos el string original
    if (isNaN(dateObject.getTime())) {
      return String(date);
    }

    const formatted = dateObject.toLocaleDateString("es-CR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const transformedClient: ClientTable[] = clients.map((c) => ({
    ...c,
    dateFormatted: formatDate(c.dateBirth),
  }));

  useEffect(() => {
    if (showForm || clients.length === 0) return;

    const tableElement = document.querySelector("#ClientTable table");
    if (!tableElement) return;

    const hasRows =
      (tableElement as HTMLTableElement).querySelector("tbody tr") !== null;
    if (!hasRows) return;

    const table = new DataTable(tableElement as Element, {
      destroy: true,
      language: {
        search: "Buscar:",
        searchPlaceholder: "Escribe aquí...",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        infoEmpty: "No hay registros",
        zeroRecords: "No se encontraron resultados",
      },
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50],
    });

    return () => {
      table.destroy();
    };
  }, [showForm, clients.length, refreshKey]);

  const columns: { key: keyof ClientTable; label: string }[] = [
    { key: "index" as keyof Client, label: "#" },
    { key: "name", label: "Nombre" },
    { key: "id", label: "Cédula" },
    { key: "email", label: "Correo Electrónico" },
    { key: "phoneNumber", label: "Número de Teléfono" },
    { key: "dateFormatted", label: "Fecha de Nacimiento" },
    { key: "profileImage", label: "Foto de Perfil" },
    { key: "commInterest", label: "Intereses" },
    { key: "physicalAddress", label: "Dirección Física" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#EEF1EF",
      }}
    >
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container-fluid container-md mt-3 mt-md-4 mb-4 px-2 px-md-4">
          <div className="card shadow-sm border-0">
            <div
              className="card-header d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-2"
              style={{ backgroundColor: "#2C3E50" }}
            >
              <h5
                className="mb-0 text-center text-md-start"
                style={{ color: "#EEF1EF" }}
              >
                Gestión de Clientes
              </h5>

              <div className="d-flex justify-content-center justify-content-md-end">
                <ButtonIcon
                  label="Nuevo"
                  onClick={() => setShowForm(true)}
                  icon={<i className="bi bi-plus-circle" />}
                  className="btn mb-3 w-100 w-sm-auto d-flex align-items-center justify-content-center gap-2"
                  backgroundColor="#5E6572"
                  hoverColor="#2C3E50"
                  color="#EEF1EF"
                  style={{
                    backgroundColor: "#5E6572",
                    color: "#EEF1EF",
                    border: "none",
                  }}
                />
              </div>
            </div>

            <div
              className="card-body p-2 p-md-4"
              style={{ backgroundColor: "#EEF1EF" }}
            >
              {!showForm ? (
                <div id="ClientTable" key={refreshKey}>
                  <TableGeneric
                    data={transformedClient}
                    columns={columns}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
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
};

export default ClientPage;
