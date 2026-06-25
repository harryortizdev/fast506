import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RepairReport } from "../../models/RepairReport";
import { Mechanic } from "../../models/Mechanic";
import {
  create,
  updateRepairReport,
  getAll as getAllRepairReports,
} from "../../services/RepairReportService";
import { getAll as getAllMechanics } from "../../services/MechanicService";
import { getAll as getAllWorkshopSchedules } from "../../services/WorkshopScheduleService";
import AlertSuccess from "../atoms/AlertSuccess";
import AlertWarning from "../atoms/AlertWarning";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

interface RepairReportFormProps {
  onClose: () => void;
  onRefresh: () => void;
  repairReportToEdit?: RepairReport;
  idAppointmentFromWorkshop?: number | null;
}

const RepairReportForm = ({
  onClose,
  onRefresh,
  repairReportToEdit,
  idAppointmentFromWorkshop,
}: RepairReportFormProps) => {
  const [form, setForm] = useState<Partial<RepairReport>>(
    repairReportToEdit || { isActive: true }
  );

  const [errors, setErrors] =
    useState<Partial<Record<keyof RepairReport, string>>>({});

  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [workshopSchedules, setWorkshopSchedules] = useState<any[]>([]);
  const [repairReports, setRepairReports] = useState<RepairReport[]>([]);
  const [filteredWorkshopSchedules, setFilteredWorkshopSchedules] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const mechanicsData = await getAllMechanics();
        setMechanics(Array.isArray(mechanicsData) ? mechanicsData : []);
      } catch (error) {
        console.error("Error cargando mecánicos:", error);
        setMechanics([]);
      }

      try {
        const workshopsData = await getAllWorkshopSchedules();
        setWorkshopSchedules(Array.isArray(workshopsData) ? workshopsData : []);
      } catch (error) {
        console.error("Error cargando citas:", error);
        setWorkshopSchedules([]);
      }

      try {
        const reportsData = await getAllRepairReports();
        setRepairReports(Array.isArray(reportsData) ? reportsData : []);
      } catch (error) {
        console.error("Error cargando reportes:", error);
        setRepairReports([]);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (idAppointmentFromWorkshop != null) {
      const workshop = workshopSchedules.find(
        (w) => Number(w.idAppointment) === Number(idAppointmentFromWorkshop)
      );

      if (workshop) {
        setFilteredWorkshopSchedules([workshop]);

        setForm((prev) => ({
          ...prev,
          idAppointment: Number(idAppointmentFromWorkshop),
        }));
      }

      return;
    }

    const appointmentsWithReports = new Set(
      repairReports
        .filter((r) => r.idReparation !== repairReportToEdit?.idReparation)
        .map((r) => Number(r.idAppointment))
    );

    const filtered = workshopSchedules.filter(
      (ws) =>
        !appointmentsWithReports.has(Number(ws.idAppointment)) ||
        Number(ws.idAppointment) === Number(repairReportToEdit?.idAppointment)
    );

    setFilteredWorkshopSchedules(filtered);
  }, [
    workshopSchedules,
    repairReports,
    idAppointmentFromWorkshop,
    repairReportToEdit,
  ]);

  const parseDateValue = (value?: string | Date | number[] | null) => {
    if (!value) return null;

    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : value;
    }

    if (Array.isArray(value)) {
      const [year, month, day] = value.map(Number);
      return new Date(year, month - 1, day);
    }

    const rawValue = String(value).trim();
    const normalizedValue = rawValue.includes("T") ? rawValue.split("T")[0] : rawValue;
    const [year, month, day] = normalizedValue.split(/[-/]/).map(Number);

    if (year && month && day) {
      return new Date(year, month - 1, day);
    }

    const parsed = new Date(rawValue);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  const formatDateValue = (date: Date | null) => {
    if (!date) return undefined;

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
       [name]:
        name === "cost" ||
        name === "taxes" ||
        name === "totalPayment" ||
        name === "idMechanic" ||
        name === "idAppointment"
          ? Number(value)
          : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

const generateRepairReference = (): number => {
  const selectedDate = form.completionDate
    ? new Date(form.completionDate + "T00:00:00")
    : new Date();

  const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
  const day = String(selectedDate.getDate()).padStart(2, "0");

  const mechanicPart = String(form.idMechanic || 0).padStart(2, "0").slice(-2);
  const appointmentPart = String(form.idAppointment || 0)
    .padStart(3, "0")
    .slice(-3);

  return Number(`${month}${day}${mechanicPart}${appointmentPart}`);
};

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RepairReport, string>> = {};

    if (form.technicalDiagnosis && form.technicalDiagnosis.length > 500) {
      newErrors.technicalDiagnosis =
        "El diagnóstico no puede superar los 500 caracteres.";
    }

    if (form.spareParts && form.spareParts.length > 500) {
      newErrors.spareParts =
        "Los repuestos no pueden superar los 500 caracteres.";
    }

    if (form.observations && form.observations.length > 500) {
      newErrors.observations =
        "Las observaciones no pueden superar los 500 caracteres.";
    }

    if (form.cost === undefined || form.cost < 0) {
      newErrors.cost = "El costo no puede ser negativo.";
    }

    if (form.taxes === undefined || form.taxes < 0) {
      newErrors.taxes = "Los impuestos no pueden ser negativos.";
    }

    if (form.totalPayment === undefined || form.totalPayment < 0) {
      newErrors.totalPayment = "El pago total no puede ser negativo.";
    }

    if (!form.completionDate) {
      newErrors.completionDate = "La fecha de finalización es requerida.";
    }

    if (!form.idMechanic || form.idMechanic <= 0) {
      newErrors.idMechanic = "Debe ingresar un mecánico válido.";
    }

    if (!form.idAppointment || form.idAppointment <= 0) {
      newErrors.idAppointment = "Debe seleccionar una cita del taller.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const dataToSend: any = {
        idReparation: form.idReparation,
        numberReference: repairReportToEdit
          ? Number(form.numberReference)
          : generateRepairReference(),
        technicalDiagnosis: form.technicalDiagnosis,
        spareParts: form.spareParts,
        observations: form.observations,
        cost: Number(form.cost),
        taxes: Number(form.taxes),
        totalPayment: Number(form.totalPayment),
        completionDate: form.completionDate,
        idMechanic: Number(form.idMechanic),
        idAppointment: Number(form.idAppointment),
        active: form.isActive,
      };

      if (repairReportToEdit) {
        await updateRepairReport(dataToSend as RepairReport);
        AlertSuccess("Reporte de reparación actualizado correctamente.");
      } else {
        await create(dataToSend as RepairReport);
        AlertSuccess("Reporte de reparación creado correctamente.");
      }

      onRefresh();
      onClose();
    } catch (error) {
      AlertWarning("Error al guardar el reporte de reparación.");
      console.error("Error al guardar reporte:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h3 className="text-center mb-4">
          {repairReportToEdit
            ? "Editar Reporte de Reparación"
            : "Nuevo Reporte de Reparación"}
        </h3>

        {repairReportToEdit && (
          <div className="mb-3">
            <label className="form-label">Número de Referencia:</label>
            <input
              className="form-control"
              value={form.numberReference?.toString() || ""}
              disabled
            />
          </div>
        )}

        <FormField
          label="Diagnóstico Técnico:"
          name="technicalDiagnosis"
          value={form.technicalDiagnosis || ""}
          onChange={handleChange}
        />
        {errors.technicalDiagnosis && (
          <div className="invalid-feedback d-block">
            {errors.technicalDiagnosis}
          </div>
        )}

        <FormField
          label="Repuestos:"
          name="spareParts"
          value={form.spareParts || ""}
          onChange={handleChange}
        />
        {errors.spareParts && (
          <div className="invalid-feedback d-block">{errors.spareParts}</div>
        )}

        <FormField
          label="Observaciones:"
          name="observations"
          value={form.observations || ""}
          onChange={handleChange}
        />
        {errors.observations && (
          <div className="invalid-feedback d-block">{errors.observations}</div>
        )}

        <FormField
          label="Costo:"
          name="cost"
          value={form.cost?.toString() || ""}
          onChange={handleChange}
          type="number"
        />
        {errors.cost && (
          <div className="invalid-feedback d-block">{errors.cost}</div>
        )}

        <FormField
          label="Impuestos:"
          name="taxes"
          value={form.taxes?.toString() || ""}
          onChange={handleChange}
          type="number"
        />
        {errors.taxes && (
          <div className="invalid-feedback d-block">{errors.taxes}</div>
        )}

        <FormField
          label="Pago Total:"
          name="totalPayment"
          value={form.totalPayment?.toString() || ""}
          onChange={handleChange}
          type="number"
        />
        {errors.totalPayment && (
          <div className="invalid-feedback d-block">
            {errors.totalPayment}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Fecha de Finalización:</label>
          <DatePicker
            wrapperClassName="w-100"
            className={`form-control w-100 ${errors.completionDate ? "is-invalid" : ""}`}
            placeholderText="Seleccione una fecha"
            dateFormat="dd/MM/yyyy"
            selected={parseDateValue(form.completionDate)}
            onChange={(date: Date | null) => {
              setForm({
                ...form,
                completionDate: formatDateValue(date),
              });
              setErrors({
                ...errors,
                completionDate: "",
              });
            }}
          />
          {errors.completionDate && (
            <div className="invalid-feedback d-block">
              {errors.completionDate}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Cita del Taller:</label>
          <select
            name="idAppointment"
            value={form.idAppointment?.toString() || ""}
            onChange={handleChange}
            disabled={idAppointmentFromWorkshop != null}
            className={`form-control ${
              errors.idAppointment ? "is-invalid" : ""
            }`}
          >
            <option value="">Selecciona una cita</option>
            {filteredWorkshopSchedules.map((schedule) => (
              <option
                key={schedule.idAppointment}
                value={schedule.idAppointment}
              >
                #{schedule.numberReference} - {schedule.licensePlate}
              </option>
            ))}
          </select>
          {errors.idAppointment && (
            <div className="invalid-feedback d-block">
              {errors.idAppointment}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Mecánico:</label>
          <select
            name="idMechanic"
            value={form.idMechanic?.toString() || ""}
            onChange={handleChange}
            className={`form-control ${
              errors.idMechanic ? "is-invalid" : ""
            }`}
          >
            <option value="">Selecciona un mecánico</option>
            {mechanics.map((mechanic) => (
              <option key={mechanic.idUser} value={mechanic.idUser}>
                {mechanic.name}
              </option>
            ))}
          </select>
          {errors.idMechanic && (
            <div className="invalid-feedback d-block">
              {errors.idMechanic}
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <Button
            label="Guardar"
            onClick={handleSubmit}
            backgroundColor="#198754"
            hoverColor="#145c32"
            color="#fff"
            className="btn btn-success me-2"
          />

          <Button
            label="Cancelar"
            onClick={onClose}
            backgroundColor="#6c757d"
            hoverColor="#495057"
            color="#fff"
            className="btn btn-secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default RepairReportForm;