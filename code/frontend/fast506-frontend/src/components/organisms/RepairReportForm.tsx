import { useState } from "react";
import { RepairReport } from "../../models/RepairReport";
import { create, updateRepairReport } from "../../services/RepairReportService";
import AlertSuccess from "../atoms/AlertSuccess";
import AlertWarning from "../atoms/AlertWarning";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

interface RepairReportFormProps {
  onClose: () => void;
  onRefresh: () => void;
  repairReportToEdit?: RepairReport;
}

const RepairReportForm = ({ onClose, onRefresh, repairReportToEdit }: RepairReportFormProps) => {
  const [form, setForm] = useState<Partial<RepairReport>>(
    repairReportToEdit || { isActive: true }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof RepairReport, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "numberReference" ||
        name === "cost" ||
        name === "taxes" ||
        name === "totalPayment" ||
        name === "idMechanic"
          ? Number(value)
          : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RepairReport, string>> = {};

    if (!form.numberReference || form.numberReference <= 0) {
      newErrors.numberReference = "El número de referencia es requerido.";
    }

    if (form.technicalDiagnosis && form.technicalDiagnosis.length > 500) {
      newErrors.technicalDiagnosis = "El diagnóstico no puede superar los 500 caracteres.";
    }

    if (form.spareParts && form.spareParts.length > 500) {
      newErrors.spareParts = "Los repuestos no pueden superar los 500 caracteres.";
    }

    if (form.observations && form.observations.length > 500) {
      newErrors.observations = "Las observaciones no pueden superar los 500 caracteres.";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const dataToSend: any = {
        idReparation: form.idReparation,
        numberReference: Number(form.numberReference),
        technicalDiagnosis: form.technicalDiagnosis,
        spareParts: form.spareParts,
        observations: form.observations,
        cost: Number(form.cost),
        taxes: Number(form.taxes),
        totalPayment: Number(form.totalPayment),
        completionDate: form.completionDate,
        idMechanic: Number(form.idMechanic),
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
      <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4">
          {repairReportToEdit ? "Editar Reporte de Reparación" : "Nuevo Reporte de Reparación"}
        </h3>

        <FormField
          label="Número de Referencia:"
          name="numberReference"
          value={form.numberReference?.toString() || ""}
          onChange={handleChange}
          type="number"
        />
        {errors.numberReference && <div className="invalid-feedback d-block">{errors.numberReference}</div>}

        <FormField
          label="Diagnóstico Técnico:"
          name="technicalDiagnosis"
          value={form.technicalDiagnosis || ""}
          onChange={handleChange}
        />
        {errors.technicalDiagnosis && <div className="invalid-feedback d-block">{errors.technicalDiagnosis}</div>}

        <FormField
          label="Repuestos:"
          name="spareParts"
          value={form.spareParts || ""}
          onChange={handleChange}
        />
        {errors.spareParts && <div className="invalid-feedback d-block">{errors.spareParts}</div>}

        <FormField
          label="Observaciones:"
          name="observations"
          value={form.observations || ""}
          onChange={handleChange}
        />
        {errors.observations && <div className="invalid-feedback d-block">{errors.observations}</div>}

        <FormField
          label="Costo:"
          name="cost"
          value={form.cost?.toString() || ""}
          onChange={handleChange}
          type="number"
        />
        {errors.cost && <div className="invalid-feedback d-block">{errors.cost}</div>}

        <FormField
          label="Impuestos:"
          name="taxes"
          value={form.taxes?.toString() || ""}
          onChange={handleChange}
          type="number"
        />
        {errors.taxes && <div className="invalid-feedback d-block">{errors.taxes}</div>}

        <FormField
          label="Pago Total:"
          name="totalPayment"
          value={form.totalPayment?.toString() || ""}
          onChange={handleChange}
          type="number"
        />
        {errors.totalPayment && <div className="invalid-feedback d-block">{errors.totalPayment}</div>}

        <FormField
          label="Fecha de Finalización:"
          name="completionDate"
          value={form.completionDate || ""}
          onChange={handleChange}
          type="date"
        />
        {errors.completionDate && <div className="invalid-feedback d-block">{errors.completionDate}</div>}

        <FormField
          label="ID Mecánico:"
          name="idMechanic"
          value={form.idMechanic?.toString() || ""}
          onChange={handleChange}
          type="number"
        />
        {errors.idMechanic && <div className="invalid-feedback d-block">{errors.idMechanic}</div>}

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