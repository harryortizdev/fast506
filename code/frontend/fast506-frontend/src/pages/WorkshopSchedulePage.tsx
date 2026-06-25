import { useEffect, useState } from "react";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import WorkshopScheduleForm from "../components/organisms/WorkshopScheduleForm";
import RepairReportForm from "../components/organisms/RepairReportForm";
import TableGeneric from "../components/organisms/TableGeneric";
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
import AlertSuccess from "../components/atoms/AlertSuccess";
import ButtonIcon from "../components/molecules/ButtonIcon";

const WorkshopSchedulePage = () => {
  const [workshopSchedules, setWorkshopSchedules] = useState<WorkshopSchedule[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [repairReports, setRepairReports] = useState<any[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [showRepairReportForm, setShowRepairReportForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

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

  const tableData = transformedData.map((ws, index) => ({
    ...ws,
    rowNumber: index + 1,
  }));

  const handleSaveAndClose = async () => {
    await loadWorkshopSchedules();
    await loadRepairReports();
    setRefreshKey((prev) => prev + 1);
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
    setRefreshKey((prev) => prev + 1);
    setShowRepairReportForm(false);
    setSelectedAppointmentId(undefined);
  };

  const handleEdit = async (workshopSchedule: WorkshopSchedule) => {
    const confirmar = await AlertConfirm(
      `¿Desea editar la cita con referencia ${workshopSchedule.numberReference}?`
    );

    if (!confirmar) return;

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
    AlertSuccess("Cita eliminada correctamente.");
    await loadWorkshopSchedules();
    await loadRepairReports();
    setRefreshKey((prev) => prev + 1);
  };

  const handleCreateReport = (workshopSchedule: WorkshopSchedule) => {
    if (!workshopSchedule.idAppointment || hasReport(workshopSchedule.idAppointment)) return;

    setSelectedAppointmentId(workshopSchedule.idAppointment);
    setShowForm(false);
    setShowRepairReportForm(true);
  };

  useEffect(() => {
    if (showForm || showRepairReportForm || tableData.length === 0) return;

    const tableElement = document.querySelector("#workshopScheduleTable table");
    if (!tableElement) return;

    const hasRows = (tableElement as HTMLTableElement).querySelector("tbody tr") !== null;
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
  }, [showForm, showRepairReportForm, tableData.length, refreshKey]);

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
                <div id="workshopScheduleTable" key={refreshKey}>
                  <TableGeneric
                    data={tableData}
                    columns={[
                      { key: "rowNumber", label: "#" },
                      { key: "numberReference", label: "Referencia" },
                      { key: "licensePlate", label: "Placa" },
                      { key: "entryDateFormatted", label: "Fecha Ingreso" },
                      { key: "reasonService", label: "Motivo" },
                      { key: "receptionMileage", label: "Kilometraje" },
                      { key: "clientName", label: "Cliente" },
                      { key: "branchName", label: "Sucursal" },
                    ]}
                    onEdit={(item) => handleEdit(item as WorkshopSchedule)}
                    onDelete={(item) => handleDelete(item as WorkshopSchedule)}
                    extraActions={[
                      {
                        label: "Informe",
                        icon: <i className="bi bi-file-earmark-text" />,
                        onClick: (item) => handleCreateReport(item as WorkshopSchedule),
                        backgroundColor: "transparent",
                        hoverColor: "#17a2b8",
                        color: "#17a2b8",
                        buttonClass: "btn btn-outline-info btn-sm d-flex align-items-center justify-content-center gap-2",
                        disabled: (item) => hasReport((item as WorkshopSchedule).idAppointment),
                      },
                    ]}
                  />
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