import { useEffect, useState } from "react";
import WorkshopScheduleForm from "../components/organisms/WorkshopScheduleForm";
import WorkshopScheduleCard from "../components/molecules/WorkshopScheduleCard";
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
  const [filterStatus, setFilterStatus] = useState<"todos" | "activos" | "completados">("todos");

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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#EEF1EF" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container-fluid container-lg mt-3 mt-md-4 mb-4 px-2 px-md-4">
          {!showForm ? (
            <>
              {/* Header */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                <div>
                  <h2 style={{ color: "#2C3E50", fontWeight: "700", marginBottom: "8px" }}>
                    Agenda de Citas - Taller
                  </h2>
                  <p style={{ color: "#5E6572", marginBottom: "0" }}>
                    Gestión de citas 
                  </p>
                </div>

                <ButtonIcon
                  label="Nueva Cita"
                  onClick={() => setShowForm(true)}
                  icon={<i className="bi bi-calendar-plus" />}
                  className="btn d-flex align-items-center justify-content-center gap-2"
                  backgroundColor="#2C3E50"
                  hoverColor="#1a252f"
                  color="#EEF1EF"
                  style={{
                    backgroundColor: "#2C3E50",
                    color: "#EEF1EF",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* Filtros */}
              <div className="d-flex gap-2 mb-4 flex-wrap">
                {["todos", "activos", "completados"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status as any)}
                    style={{
                      padding: "8px 16px",
                      border: "1px solid #A9B4C2",
                      borderRadius: "6px",
                      backgroundColor: filterStatus === status ? "#2C3E50" : "#fff",
                      color: filterStatus === status ? "#EEF1EF" : "#2C3E50",
                      cursor: "pointer",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>

              {/* Grid de Tarjetas */}
              {workshopSchedules.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "2px dashed #A9B4C2",
                  }}
                >
                  <i
                    className="bi bi-calendar-x"
                    style={{ fontSize: "48px", color: "#A9B4C2", display: "block", marginBottom: "16px" }}
                  ></i>
                  <p style={{ color: "#5E6572", fontSize: "18px", marginBottom: "0" }}>
                    No hay citas agendadas
                  </p>
                </div>
              ) : (
                <div className="row g-3">
                  {workshopSchedules.map((appointment) => (
                    <div key={appointment.idAppointment} className="col-12 col-md-6 col-lg-4">
                      <WorkshopScheduleCard
                        appointment={appointment}
                        clientName={getClientName(appointment.idClient)}
                        branchName={getBranchName(appointment.idBranch)}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        formatDate={formatDate}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <WorkshopScheduleForm
              onClose={handleClose}
              onRefresh={handleSaveAndClose}
              workshopScheduleToEdit={workshopScheduleToEdit}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WorkshopSchedulePage;