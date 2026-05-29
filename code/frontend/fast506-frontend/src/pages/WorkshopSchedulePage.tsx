import { useEffect, useState } from "react";
import WorkshopScheduleForm from "../components/organisms/WorkshopScheduleForm";
import RepairReportForm from "../components/organisms/RepairReportForm";
import { getAll, deleteWorkshopSchedule } from "../services/WorkshopScheduleService";
import { getAll as getAllClients } from "../services/ClientService";
import { getAll as getAllBranches } from "../services/BranchService";
import { getAll as getAllRepairReports } from "../services/RepairReportService";
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
  const [repairReports, setRepairReports] = useState<any[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [showRepairReportForm, setShowRepairReportForm] = useState(false);

  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState<number | undefined>(undefined);

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

  const loadRepairReports = async () => {
    try {
      const data = await getAllRepairReports();
      setRepairReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando reportes de reparación:", error);
      setRepairReports([]);
    }
  };

  useEffect(() => {
    loadWorkshopSchedules();
    loadClients();
    loadBranches();
    loadRepairReports();
  }, []);

const formatDate = (date?: any) => {
  if (!date) return "";

  let dateObject: Date;

  if (Array.isArray(date)) {
    const [year, month, day] = date;
    dateObject = new Date(year, month - 1, day);
  } else {
    dateObject = new Date(String(date).split("T")[0] + "T00:00:00");
  }

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

  const getClientName = (idClient: number): string => {
    const client = clients.find((c) => c.idUser === idClient);
    return client?.name || `Cliente #${idClient}`;
  };

  const getBranchName = (idBranch: number): string => {
    const branch = branches.find((b) => b.idBranch === idBranch);
    return branch?.name || `Sucursal #${idBranch}`;
  };

  const hasReport = (idAppointment?: number): boolean => {
    if (!idAppointment) return false;

    return repairReports.some(
      (report) => Number(report.idAppointment) === Number(idAppointment)
    );
  };

  const transformedData = workshopSchedules.map((ws) => ({
    ...ws,
    entryDateFormatted: formatDate(ws.entryDate),
    clientName: getClientName(ws.idClient),
    branchName: getBranchName(ws.idBranch),
  }));

  const handleSaveAndClose = async () => {
    await loadWorkshopSchedules();
    await loadRepairReports();
    setWorkshopScheduleToEdit(undefined);
    setShowForm(false);
  };

  const handleClose = () => {
    setWorkshopScheduleToEdit(undefined);
    setShowForm(false);
  };

  const handleCloseRepairReportForm = () => {
    setShowRepairReportForm(false);
    setSelectedAppointmentId(undefined);
  };

  const handleSaveRepairReportAndClose = async () => {
    await loadRepairReports();
    await loadWorkshopSchedules();
    setShowRepairReportForm(false);
    setSelectedAppointmentId(undefined);
  };

  const handleEdit = (workshopSchedule: WorkshopSchedule) => {
    setWorkshopScheduleToEdit(workshopSchedule);
    setShowRepairReportForm(false);
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
    await loadRepairReports();
  };

  const handleCreateReport = (workshopSchedule: WorkshopSchedule) => {
    if (!workshopSchedule.idAppointment || hasReport(workshopSchedule.idAppointment)) return;

    setSelectedAppointmentId(workshopSchedule.idAppointment);
    setShowForm(false);
    setShowRepairReportForm(true);
  };

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
              <h5 className="mb-0 text-center text-md-start" style={{ color: "#EEF1EF" }}>
                Gestión de Agenda del Taller
              </h5>

              <div className="d-flex justify-content-center justify-content-md-end">
                <ButtonIcon
                  label="Nuevo"
                  onClick={() => {
                    setShowRepairReportForm(false);
                    setWorkshopScheduleToEdit(undefined);
                    setShowForm(true);
                  }}
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

            <div className="card-body p-2 p-md-4" style={{ backgroundColor: "#EEF1EF" }}>
              {showRepairReportForm ? (
                <RepairReportForm
                  onClose={handleCloseRepairReportForm}
                  onRefresh={handleSaveRepairReportAndClose}
                  idAppointmentFromWorkshop={selectedAppointmentId}
                />
              ) : !showForm ? (
                <div
                  className="table-responsive"
                  style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    overflowX: "auto",
                    borderRadius: "10px",
                  }}
                >
                  <table
                    className="table table-hover align-middle"
                    style={{
                      minWidth: "750px",
                      backgroundColor: "#EEF1EF",
                      borderCollapse: "separate",
                      borderSpacing: 0,
                    }}
                  >
                    <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
                      <tr>
                        {[
                          "ID",
                          "Referencia",
                          "Placa",
                          "Fecha Ingreso",
                          "Motivo",
                          "Kilometraje",
                          "Cliente",
                          "Sucursal",
                          "Acciones",
                        ].map((header) => (
                          <th
                            key={header}
                            style={{
                              backgroundColor: "#A9B4C2",
                              whiteSpace: "nowrap",
                              fontSize: "clamp(0.8rem, 1vw, 1rem)",
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {transformedData.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="text-center">
                            No hay datos
                          </td>
                        </tr>
                      ) : (
                        transformedData.map((ws, index) => {
                          const reportExists = hasReport(ws.idAppointment);

                          return (
                            <tr key={index}>
                              <td>{ws.idAppointment}</td>
                              <td>{ws.numberReference}</td>
                              <td>{ws.licensePlate}</td>
                              <td>{ws.entryDateFormatted}</td>
                              <td>{ws.reasonService}</td>
                              <td>{ws.receptionMileage}</td>
                              <td>{ws.clientName}</td>
                              <td>{ws.branchName}</td>

                              <td>
                                <div className="d-flex flex-column flex-sm-row gap-2">
                                  <ButtonIcon
                                    label="Informe"
                                    onClick={() => handleCreateReport(ws)}
                                    backgroundColor="transparent"
                                    hoverColor={reportExists ? "#6c757d" : "#17a2b8"}
                                    color={reportExists ? "#6c757d" : "#17a2b8"}
                                    icon={<i className="bi bi-file-earmark-text" />}
                                    className="btn btn-outline-info btn-sm d-flex align-items-center justify-content-center gap-2"
                                    style={{
                                      backgroundColor: "transparent",
                                      border: `1px solid ${
                                        reportExists ? "#6c757d" : "#17a2b8"
                                      }`,
                                      opacity: reportExists ? 0.5 : 1,
                                      cursor: reportExists ? "not-allowed" : "pointer",
                                      pointerEvents: reportExists ? "none" : "auto",
                                    }}
                                  />

                                  <ButtonIcon
                                    label="Editar"
                                    onClick={() => handleEdit(ws)}
                                    backgroundColor="transparent"
                                    hoverColor="#ffc107"
                                    color="#ffc107"
                                    icon={<i className="bi bi-pencil-square" />}
                                    className="btn btn-outline-warning btn-sm d-flex align-items-center justify-content-center gap-2"
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "1px solid #ffc107",
                                    }}
                                  />

                                  <ButtonIcon
                                    label="Eliminar"
                                    onClick={() => handleDelete(ws)}
                                    backgroundColor="transparent"
                                    hoverColor="#dc3545"
                                    color="#dc3545"
                                    icon={<i className="bi bi-trash3" />}
                                    className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-2"
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "1px solid #dc3545",
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
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