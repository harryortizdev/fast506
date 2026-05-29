import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RepairReportForm from "../components/organisms/RepairReportForm";
import TableGeneric from "../components/organisms/TableGeneric";
import { getAll, deleteRepairReport } from "../services/RepairReportService";
import { getAll as getAllMechanics } from "../services/MechanicService";
import { getAllForReports as getAllWorkshopSchedules } from "../services/WorkshopScheduleService";
import { RepairReport } from "../models/RepairReport";
import { Mechanic } from "../models/Mechanic";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import ButtonIcon from "../components/molecules/ButtonIcon";

type RepairReportTable = RepairReport & {
  completionDateFormatted: string;
  mechanicName: string;
  appointmentLabel: string;
};

type WorkshopScheduleTable = {
  idAppointment: number;
  numberReference: number;
  licensePlate: string;
  entryDate: string;
  reasonService: string;
  receptionMileage: number;
};

const RepairReportPage = () => {
  const location = useLocation();

  const [repairReports, setRepairReports] = useState<RepairReport[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [workshopSchedules, setWorkshopSchedules] = useState<any[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [repairReportToEdit, setRepairReportToEdit] =
    useState<RepairReport | undefined>(undefined);

  const [idAppointmentFromState, setIdAppointmentFromState] =
    useState<number | null>(null);

  useEffect(() => {
    const state = location.state as { idAppointment?: number } | null;

    if (state?.idAppointment) {
      setIdAppointmentFromState(state.idAppointment);
      setShowForm(true);
    }
  }, [location.state]);

  const loadRepairReports = async () => {
    try {
      const data = await getAll();
      setRepairReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando reportes de reparación:", error);
      setRepairReports([]);
    }
  };

  const loadMechanics = async () => {
    try {
      const data = await getAllMechanics();
      setMechanics(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando mecánicos:", error);
      setMechanics([]);
    }
  };

  const loadWorkshopSchedules = async () => {
    try {
      const data = await getAllWorkshopSchedules();
      setWorkshopSchedules(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando citas del taller:", error);
      setWorkshopSchedules([]);
    }
  };

  useEffect(() => {
    loadRepairReports();
    loadMechanics();
    loadWorkshopSchedules();
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

  const getMechanicName = (idMechanic?: number) => {
    const mechanic = mechanics.find(
      (m) => Number(m.idUser) === Number(idMechanic)
    );

    return mechanic?.name || `Mecánico #${idMechanic}`;
  };

  const getAppointmentLabel = (idAppointment?: number) => {
    const appointment = workshopSchedules.find(
      (w) => Number(w.idAppointment) === Number(idAppointment)
    );

    if (!appointment) {
      return "⚠ Cita no encontrada";
    }

    if (appointment.isActive === false || appointment.active === false) {
      return `#${appointment.numberReference} - ${appointment.licensePlate} (Cita eliminada)`;
    }

    return `#${appointment.numberReference} - ${appointment.licensePlate}`;
  };

  const transformedReports: RepairReportTable[] = repairReports.map((report) => ({
    ...report,
    completionDateFormatted: formatDate(report.completionDate),
    mechanicName: getMechanicName(report.idMechanic),
    appointmentLabel: getAppointmentLabel(report.idAppointment),
  }));

  const appointmentsWithReport = new Set(
    repairReports.map((report) => Number(report.idAppointment))
  );

  const workshopSchedulesWithoutReport = workshopSchedules
  .filter((ws) => !appointmentsWithReport.has(Number(ws.idAppointment)))
  .map((ws) => ({
    idAppointment: ws.idAppointment,
    numberReference: ws.numberReference,
    licensePlate: ws.licensePlate,
    entryDate: formatDate(ws.entryDate),
    reasonService: ws.reasonService,
    receptionMileage: ws.receptionMileage,
    disabled: true,
  }));

  const handleSaveAndClose = async () => {
    await loadRepairReports();
    await loadMechanics();
    await loadWorkshopSchedules();

    setRepairReportToEdit(undefined);
    setShowForm(false);
    setIdAppointmentFromState(null);
  };

  const handleClose = () => {
    setRepairReportToEdit(undefined);
    setShowForm(false);
    setIdAppointmentFromState(null);
  };

  const handleEdit = (repairReport: RepairReportTable) => {
    setRepairReportToEdit(repairReport);
    setShowForm(true);
  };

  const handleDelete = async (repairReport: RepairReportTable) => {
    if (!repairReport.idReparation) return;

    const confirmar = await AlertConfirm(
      `¿Desea eliminar el reporte con referencia ${repairReport.numberReference}?`
    );

    if (!confirmar) return;

    await deleteRepairReport(repairReport.idReparation);
    await loadRepairReports();
    await loadWorkshopSchedules();
  };



  const reportColumns: { key: keyof RepairReportTable; label: string }[] = [
    { key: "idReparation", label: "ID" },
    { key: "numberReference", label: "Referencia" },
    { key: "technicalDiagnosis", label: "Diagnóstico" },
    { key: "spareParts", label: "Repuestos" },
    { key: "observations", label: "Observaciones" },
    { key: "cost", label: "Costo" },
    { key: "taxes", label: "Impuestos" },
    { key: "totalPayment", label: "Total" },
    { key: "completionDateFormatted", label: "Finalización" },
    { key: "mechanicName", label: "Mecánico" },
    { key: "appointmentLabel", label: "Cita Taller" },
  ];

  const appointmentColumns: { key: keyof WorkshopScheduleTable; label: string }[] = [
    { key: "idAppointment", label: "ID Cita" },
    { key: "numberReference", label: "Referencia" },
    { key: "licensePlate", label: "Placa" },
    { key: "entryDate", label: "Fecha Ingreso" },
    { key: "reasonService", label: "Motivo" },
    { key: "receptionMileage", label: "Kilometraje" },
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
                Gestión de Reportes de Reparación
              </h5>

              <div className="d-flex justify-content-center justify-content-md-end">
                <ButtonIcon
                  label="Nuevo"
                  onClick={() => {
                    setRepairReportToEdit(undefined);
                    setIdAppointmentFromState(null);
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

            <div
              className="card-body p-2 p-md-4"
              style={{ backgroundColor: "#EEF1EF" }}
            >
              {!showForm ? (
                <>
                  <h5 className="mb-3">Citas sin reporte asignado</h5>

                  <TableGeneric
                    data={workshopSchedulesWithoutReport}
                    columns={appointmentColumns}
                    disabledActions={true}
                  />

                  <hr className="my-4" />

                  <h5 className="mb-3">Reportes de reparación</h5>

                  <TableGeneric
                    data={transformedReports}
                    columns={reportColumns}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </>
              ) : (
                <RepairReportForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
                  idAppointmentFromWorkshop={idAppointmentFromState}
                  repairReportToEdit={repairReportToEdit}
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

export default RepairReportPage;