import { useEffect, useState } from "react";
import WorkshopScheduleForm from "../components/organisms/WorkshopScheduleForm";
import TableGeneric from "../components/organisms/TableGeneric";
import { getAll, deleteWorkshopSchedule } from "../services/WorkshopScheduleService";
import { getAll as getAllClients } from "../services/ClientService";
import { getAll as getAllBranches } from "../services/BranchService";
import { WorkshopSchedule } from "../models/WorkshopSchedule";
import { Client } from "../models/Client";
import { Branch } from "../models/Branch";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import ButtonIcon from "../components/molecules/ButtonIcon";

const WorkshopSchedulePage = () => {
  const [workshopSchedules, setWorkshopSchedules] = useState<WorkshopSchedule[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [workshopScheduleToEdit, setWorkshopScheduleToEdit] =
    useState<WorkshopSchedule | undefined>(undefined);

  const loadWorkshopSchedules = async () => {
    try {
      const data = await getAll();
      setWorkshopSchedules(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando agendas del taller:", error);
      setWorkshopSchedules([]);
    }
  };

  const loadClients = async () => {
    try {
      const data = await getAllClients();
      setClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando clientes:", error);
      setClients([]);
    }
  };

  const loadBranches = async () => {
    try {
      const data = await getAllBranches();
      setBranches(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando sucursales:", error);
      setBranches([]);
    }
  };

  useEffect(() => {
    loadWorkshopSchedules();
    loadClients();
    loadBranches();
  }, []);

  const getClientName = (idClient: number): string => {
    const client = clients.find((c) => c.idUser === idClient);
    return client?.name || `Cliente #${idClient}`;
  };

  const getBranchName = (idBranch: number): string => {
    const branch = branches.find((b) => b.idBranch === idBranch);
    return branch?.name || `Sucursal #${idBranch}`;
  };

  const transformedData = workshopSchedules.map((ws) => ({
    ...ws,
    clientName: getClientName(ws.idClient),
    branchName: getBranchName(ws.idBranch),
  }));

  const handleSaveAndClose = async () => {
    await loadWorkshopSchedules();
    setWorkshopScheduleToEdit(undefined);
    setShowForm(false);
  };

  const handleClose = () => {
    setWorkshopScheduleToEdit(undefined);
    setShowForm(false);
  };

  const handleEdit = (workshopSchedule: WorkshopSchedule) => {
    setWorkshopScheduleToEdit(workshopSchedule);
    setShowForm(true);
  };

  const handleDelete = async (workshopSchedule: WorkshopSchedule) => {
    if (!workshopSchedule.idAppointment) return;

    const confirmar = await AlertConfirm(
      `¿Desea eliminar la cita con referencia ${workshopSchedule.numberReference}?`
    );

    if (!confirmar) return;

    await deleteWorkshopSchedule(workshopSchedule.idAppointment);
    await loadWorkshopSchedules();
  };

  const columns: { key: keyof (WorkshopSchedule & { clientName: string; branchName: string }); label: string }[] = [
    { key: "idAppointment", label: "ID" },
    { key: "numberReference", label: "Referencia" },
    { key: "licensePlate", label: "Placa" },
    { key: "entryDate", label: "Fecha Ingreso" },
    { key: "reasonService", label: "Motivo" },
    { key: "receptionMileage", label: "Kilometraje" },
    { key: "clientName", label: "Cliente" },
    { key: "branchName", label: "Sucursal" },
  ] as any;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#EEF1EF" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container-fluid container-md mt-3 mt-md-4 mb-4 px-2 px-md-4">
          <div className="card shadow-sm border-0">
            <div
              className="card-header d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-2"
              style={{ backgroundColor: "#2C3E50" }}
            >
              <h5 className="mb-0 text-center text-md-start" style={{ color: "#EEF1EF" }}>
                Gestión de Agenda del Taller
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
                  style={{ backgroundColor: "#5E6572", color: "#EEF1EF", border: "none" }}
                />
              </div>
            </div>

            <div className="card-body p-2 p-md-4" style={{ backgroundColor: "#EEF1EF" }}>
              {!showForm ? (
                <TableGeneric
                  data={transformedData}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ) : (
                <WorkshopScheduleForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
                  workshopScheduleToEdit={workshopScheduleToEdit}
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

export default WorkshopSchedulePage;