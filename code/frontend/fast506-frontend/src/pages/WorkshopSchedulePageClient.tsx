import { useEffect, useState } from "react";
import WorkshopScheduleForm from "../components/organisms/WorkshopScheduleForm";
import RepairReportForm from "../components/organisms/RepairReportForm";
import WorkshopScheduleCard from "../components/molecules/WorkshopScheduleCard";
import { getAll, deleteWorkshopSchedule } from "../services/WorkshopScheduleService";
import { getAll as getAllClients } from "../services/ClientService";
import { getAll as getAllBranches } from "../services/BranchService";
import { getAll as getAllRepairReports } from "../services/RepairReportService";
import { WorkshopSchedule } from "../models/WorkshopSchedule";
import { RepairReport } from "../models/RepairReport";
import { Client } from "../models/Client";
import { Branch } from "../models/Branch";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import AlertSuccess from "../components/atoms/AlertSuccess";
import ButtonIcon from "../components/molecules/ButtonIcon";
import { useAuth } from "../context/AuthContext";

const WorkshopSchedulePageClient = () => {
  const { user } = useAuth();
  const [workshopSchedules, setWorkshopSchedules] = useState<WorkshopSchedule[]>([]);
  const [repairReports, setRepairReports] = useState<RepairReport[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [workshopScheduleToEdit, setWorkshopScheduleToEdit] =
    useState<WorkshopSchedule | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<"todos" | "activos" | "completados">("todos");
  const [selectedReport, setSelectedReport] = useState<RepairReport | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportAppointmentId, setReportAppointmentId] = useState<number | null>(null);

  const loadWorkshopSchedules = async () => {
    try {
      const data = await getAll();
      setWorkshopSchedules(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando agendas del taller:", error);
      setWorkshopSchedules([]);
    }
  };

  const loadRepairReports = async () => {
    try {
      const data = await getAllRepairReports();
      setRepairReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando reportes:", error);
      setRepairReports([]);
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
    loadRepairReports();
  }, []);

  const getClientName = (idClient: number): string => {
    const client = clients.find((c) => c.idUser === idClient);
    return client?.name || `Cliente #${idClient}`;
  };

  const getBranchName = (idBranch: number): string => {
    const branch = branches.find((b) => b.idBranch === idBranch);
    return branch?.name || `Sucursal #${idBranch}`;
  };

  const normalizedRole = (user?.roleName ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const isClient = normalizedRole.includes("cliente") || normalizedRole.includes("client");
  const isMechanic = normalizedRole.includes("mecanico") || normalizedRole.includes("mechanic");
  const isAdmin = !isClient && !isMechanic;

  const mechanicAppointmentIds = new Set(
    repairReports
      .filter((rr) => rr.idMechanic === user?.userId)
      .map((rr) => rr.idAppointment)
  );

  const getReportForAppointment = (idAppointment?: number): RepairReport | undefined => {
    if (idAppointment === undefined) return undefined;
    return repairReports.find(
      (rr) => rr.idAppointment === idAppointment && rr.isActive !== false
    );
  };

  const visibleSchedules = workshopSchedules.filter((ws) => {
    if (ws.isActive === false) return false;
    if (isClient) return ws.idClient === user?.userId;
    if (isMechanic) {
      const report = getReportForAppointment(ws.idAppointment);
      if (!report) return true;
      return report.idMechanic === user?.userId;
    }
    return true;
  }).filter((ws) => {
    if (filterStatus === "activos") return !getReportForAppointment(ws.idAppointment);
    if (filterStatus === "completados") return !!getReportForAppointment(ws.idAppointment);
    return true; // "todos"
  });

  const handleSaveAndClose = async () => {
    await loadWorkshopSchedules();
    await loadRepairReports();
    setWorkshopScheduleToEdit(undefined);
    setShowForm(false);
    setShowReportForm(false);
    setReportAppointmentId(null);
  };

  const handleCreateReport = (appointment: WorkshopSchedule) => {
    setReportAppointmentId(appointment.idAppointment ?? null);
    setShowReportForm(true);
  };

  const handleClose = () => {
    setWorkshopScheduleToEdit(undefined);
    setShowForm(false);
    setShowReportForm(false);
    setReportAppointmentId(null);
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
    AlertSuccess("Cita eliminada correctamente.");
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
          {showReportForm ? (
            <RepairReportForm
              onClose={handleClose}
              onRefresh={handleSaveAndClose}
              idAppointmentFromWorkshop={reportAppointmentId}
            />
          ) : showForm ? (
            <WorkshopScheduleForm
              onClose={handleClose}
              onRefresh={handleSaveAndClose}
              workshopScheduleToEdit={workshopScheduleToEdit}
            />
          ) : (
            <>
              {/* Header */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                <div>
                  <h2 style={{ color: "#2C3E50", fontWeight: "700", marginBottom: "8px" }}>
                    Agenda de Citas - Taller
                  </h2>
                  <p style={{ color: "#5E6572", marginBottom: "0" }}>
                    {isClient ? "Tus citas en el taller" : isMechanic ? "Citas asignadas a ti" : "Gestión de citas"}
                  </p>
                </div>

                {!isMechanic && (
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
                )}
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
              {visibleSchedules.length === 0 ? (
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
                  {visibleSchedules.map((appointment) => (
                    <div key={appointment.idAppointment} className="col-12 col-md-6 col-lg-4">
                      <WorkshopScheduleCard
                        appointment={appointment}
                        clientName={getClientName(appointment.idClient)}
                        branchName={getBranchName(appointment.idBranch)}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        formatDate={formatDate}
                        repairReport={getReportForAppointment(appointment.idAppointment)}
                        onViewReport={(report) => setSelectedReport(report)}
                        onCreateReport={isMechanic ? handleCreateReport : undefined}
                        canEdit={isAdmin}
                        canDelete={isAdmin}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Modal de Reporte */}
      {selectedReport && (
        <div
          style={{
            position: "fixed", inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1050,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setSelectedReport(null)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "520px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ backgroundColor: "#2C3E50", padding: "16px 20px", color: "#EEF1EF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h5 style={{ margin: 0, fontWeight: "700" }}>
                  <i className="bi bi-file-medical me-2"></i>
                  Reporte de Reparación
                </h5>
                <small style={{ color: "#A9B4C2" }}>Ref. #{selectedReport.numberReference}</small>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                style={{ background: "none", border: "none", color: "#EEF1EF", fontSize: "20px", cursor: "pointer", lineHeight: 1 }}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "20px" }}>
              <div className="row g-3">
                {selectedReport.technicalDiagnosis && (
                  <div className="col-12">
                    <label style={{ fontSize: "11px", color: "#A9B4C2", fontWeight: "600", textTransform: "uppercase" }}>Diagnóstico Técnico</label>
                    <p style={{ margin: 0, color: "#2C3E50" }}>{selectedReport.technicalDiagnosis}</p>
                  </div>
                )}
                {selectedReport.spareParts && (
                  <div className="col-12">
                    <label style={{ fontSize: "11px", color: "#A9B4C2", fontWeight: "600", textTransform: "uppercase" }}>Repuestos</label>
                    <p style={{ margin: 0, color: "#2C3E50" }}>{selectedReport.spareParts}</p>
                  </div>
                )}
                {selectedReport.observations && (
                  <div className="col-12">
                    <label style={{ fontSize: "11px", color: "#A9B4C2", fontWeight: "600", textTransform: "uppercase" }}>Observaciones</label>
                    <p style={{ margin: 0, color: "#2C3E50" }}>{selectedReport.observations}</p>
                  </div>
                )}
                <div className="col-4">
                  <label style={{ fontSize: "11px", color: "#A9B4C2", fontWeight: "600", textTransform: "uppercase" }}>Costo</label>
                  <p style={{ margin: 0, fontWeight: "600", color: "#2C3E50" }}>₡{selectedReport.cost.toLocaleString()}</p>
                </div>
                <div className="col-4">
                  <label style={{ fontSize: "11px", color: "#A9B4C2", fontWeight: "600", textTransform: "uppercase" }}>Impuestos</label>
                  <p style={{ margin: 0, fontWeight: "600", color: "#2C3E50" }}>₡{selectedReport.taxes.toLocaleString()}</p>
                </div>
                <div className="col-4">
                  <label style={{ fontSize: "11px", color: "#A9B4C2", fontWeight: "600", textTransform: "uppercase" }}>Total</label>
                  <p style={{ margin: 0, fontWeight: "700", color: "#198754", fontSize: "16px" }}>₡{selectedReport.totalPayment.toLocaleString()}</p>
                </div>
                <div className="col-12">
                  <label style={{ fontSize: "11px", color: "#A9B4C2", fontWeight: "600", textTransform: "uppercase" }}>Fecha de Finalización</label>
                  <p style={{ margin: 0, color: "#2C3E50" }}>{formatDate(selectedReport.completionDate)}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: "12px 20px", borderTop: "1px solid #EEF1EF", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSelectedReport(null)}
                style={{ padding: "8px 20px", backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default WorkshopSchedulePageClient;