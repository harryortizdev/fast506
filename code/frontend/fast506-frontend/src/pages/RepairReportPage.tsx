import { useEffect, useState } from "react";
import RepairReportForm from "../components/organisms/RepairReportForm";
import TableGeneric from "../components/organisms/TableGeneric";
import { getAll, deleteRepairReport } from "../services/RepairReportService";
import { RepairReport } from "../models/RepairReport";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import ButtonIcon from "../components/molecules/ButtonIcon";

const RepairReportPage = () => {
  const [repairReports, setRepairReports] = useState<RepairReport[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [repairReportToEdit, setRepairReportToEdit] =
    useState<RepairReport | undefined>(undefined);

  const loadRepairReports = async () => {
    try {
      const data = await getAll();
      setRepairReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando reportes de reparación:", error);
      setRepairReports([]);
    }
  };

  useEffect(() => {
    loadRepairReports();
  }, []);

  const handleSaveAndClose = async () => {
    await loadRepairReports();
    setRepairReportToEdit(undefined);
    setShowForm(false);
  };

  const handleClose = () => {
    setRepairReportToEdit(undefined);
    setShowForm(false);
  };

  const handleEdit = (repairReport: RepairReport) => {
    setRepairReportToEdit(repairReport);
    setShowForm(true);
  };

  const handleDelete = async (repairReport: RepairReport) => {
    if (!repairReport.idReparation) return;

    const confirmar = await AlertConfirm(
      `¿Desea eliminar el reporte con referencia ${repairReport.numberReference}?`
    );

    if (!confirmar) return;

    await deleteRepairReport(repairReport.idReparation);
    await loadRepairReports();
  };

  const columns: { key: keyof RepairReport; label: string }[] = [
    { key: "idReparation", label: "ID" },
    { key: "numberReference", label: "Referencia" },
    { key: "technicalDiagnosis", label: "Diagnóstico" },
    { key: "spareParts", label: "Repuestos" },
    { key: "observations", label: "Observaciones" },
    { key: "cost", label: "Costo" },
    { key: "taxes", label: "Impuestos" },
    { key: "totalPayment", label: "Total" },
    { key: "completionDate", label: "Finalización" },
    { key: "idMechanic", label: "Mecánico" },
  ];

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
                Gestión de Reportes de Reparación
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
                  data={repairReports}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ) : (
                <RepairReportForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
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