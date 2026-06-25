import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { WorkshopSchedule } from "../../models/WorkshopSchedule";
import { create, updateWorkshopSchedule } from "../../services/WorkshopScheduleService";
import { getAll as getAllClients } from "../../services/ClientService";
import { getAll as getAllBranches } from "../../services/BranchService";
import { Client } from "../../models/Client";
import { Branch } from "../../models/Branch";
import AlertSuccess from "../atoms/AlertSuccess";
import AlertWarning from "../atoms/AlertWarning";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import { useAuth } from "../../context/AuthContext";

interface WorkshopScheduleFormProps {
  onClose: () => void;
  onRefresh: () => void;
  workshopScheduleToEdit?: WorkshopSchedule;
}

const WorkshopScheduleForm = ({
  onClose,
  onRefresh,
  workshopScheduleToEdit,
}: WorkshopScheduleFormProps) => {
  const { user } = useAuth();

  const normalizedRole = (user?.roleName ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const isClient = normalizedRole.includes("cliente") || normalizedRole.includes("client");

  const [form, setForm] = useState<Partial<WorkshopSchedule>>(
    workshopScheduleToEdit || { isActive: true, idClient: isClient ? user?.userId : undefined }
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof WorkshopSchedule, string>>
  >({});

  const [clients, setClients] = useState<Client[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingBranches, setLoadingBranches] = useState(true);

  useEffect(() => {
    setForm(
      workshopScheduleToEdit || { isActive: true, idClient: isClient ? user?.userId : undefined }
    );
    setErrors({});
  }, [workshopScheduleToEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await getAllClients();
        setClients(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error cargando clientes:", error);
        setClients([]);
      } finally {
        setLoadingClients(false);
      }
    };

    const loadBranches = async () => {
      try {
        const data = await getAllBranches();
        setBranches(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error cargando sucursales:", error);
        setBranches([]);
      } finally {
        setLoadingBranches(false);
      }
    };

    loadClients();
    loadBranches();
  }, []);

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
        name === "receptionMileage" ||
        name === "idClient" ||
        name === "idBranch"
          ? Number(value)
          : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

const generateWorkshopReference = (): number => {
  const selectedDate = form.entryDate
    ? new Date(String(form.entryDate) + "T00:00:00")
    : new Date();

  const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
  const day = String(selectedDate.getDate()).padStart(2, "0");

  const clientPart = String(form.idClient || 0).padStart(2, "0").slice(-2);
  const branchPart = String(form.idBranch || 0).padStart(2, "0").slice(-2);

  const randomPart = String(Math.floor(Math.random() * 90) + 10);

  return Number(`${month}${day}${clientPart}${branchPart}${randomPart}`);
};

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof WorkshopSchedule, string>> = {};
    const plate = String(form.licensePlate ?? "").trim().toUpperCase();
    const reasonService = String(form.reasonService ?? "").trim();
    const parsedEntryDate = parseDateValue(form.entryDate);
    const mileage = Number(form.receptionMileage);

    if (!plate || plate.length > 20 || !/^[A-Z0-9-]{2,20}$/.test(plate)) {
      newErrors.licensePlate =
        "Placa inválida: debe tener un formato válido y máximo 20 caracteres.";
    }

    if (!parsedEntryDate) {
      newErrors.entryDate = "La fecha de ingreso es requerida.";
    }

    if (!reasonService || reasonService.length < 3 || reasonService.length > 500) {
      newErrors.reasonService =
        "Motivo inválido: debe tener entre 3 y 500 caracteres.";
    }

    if (!Number.isFinite(mileage) || mileage < 0) {
      newErrors.receptionMileage = "El kilometraje debe ser un número válido y no puede ser negativo.";
    }

    if (!form.idClient || Number(form.idClient) <= 0) {
      newErrors.idClient = "Debe ingresar un cliente válido.";
    }

    if (!form.idBranch || Number(form.idBranch) <= 0) {
      newErrors.idBranch = "Debe ingresar una sucursal válida.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const dataToSend: any = {
        idAppointment: form.idAppointment,
        numberReference: workshopScheduleToEdit
          ? Number(form.numberReference)
          : generateWorkshopReference(),
        licensePlate: String(form.licensePlate ?? "").trim().toUpperCase(),
        entryDate: form.entryDate,
        reasonService: String(form.reasonService ?? "").trim(),
        receptionMileage: Number(form.receptionMileage),
        idClient: Number(form.idClient),
        idBranch: Number(form.idBranch),
        active: form.isActive,
      };

      if (workshopScheduleToEdit) {
        await updateWorkshopSchedule(dataToSend as WorkshopSchedule);
        AlertSuccess("Cita de taller actualizada correctamente.");
      } else {
        await create(dataToSend as WorkshopSchedule);
        AlertSuccess("Cita de taller creada correctamente.");
      }

      onRefresh();
      onClose();
    } catch (error) {
      AlertWarning("Error al guardar la cita de taller.");
      console.error("Error al guardar cita:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h3 className="text-center mb-4">
          {workshopScheduleToEdit ? "Editar Cita de Taller" : "Nueva Cita de Taller"}
        </h3>

        {workshopScheduleToEdit && (
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
          label="Placa:"
          name="licensePlate"
          value={form.licensePlate || ""}
          onChange={handleChange}
        />
        {errors.licensePlate && (
          <div className="invalid-feedback d-block">{errors.licensePlate}</div>
        )}

        <div className="mb-3">
          <label className="form-label">Fecha de Ingreso:</label>
          <DatePicker
            wrapperClassName="w-100"
            className={`form-control w-100 ${errors.entryDate ? "is-invalid" : ""}`}
            placeholderText="Seleccione una fecha"
            dateFormat="dd/MM/yyyy"
            selected={parseDateValue(form.entryDate)}
            onChange={(date: Date | null) => {
              setForm({
                ...form,
                entryDate: formatDateValue(date),
              });
              setErrors({
                ...errors,
                entryDate: "",
              });
            }}
          />
          {errors.entryDate && (
            <div className="invalid-feedback d-block">{errors.entryDate}</div>
          )}
        </div>

        <FormField
          label="Motivo del Servicio:"
          name="reasonService"
          value={form.reasonService || ""}
          onChange={handleChange}
        />
        {errors.reasonService && (
          <div className="invalid-feedback d-block">{errors.reasonService}</div>
        )}

        <FormField
          label="Kilometraje:"
          name="receptionMileage"
          value={form.receptionMileage?.toString() || ""}
          onChange={handleChange}
          type="number"
        />
        {errors.receptionMileage && (
          <div className="invalid-feedback d-block">
            {errors.receptionMileage}
          </div>
        )}

        {isClient ? (
          <div className="mb-3">
            <label className="form-label">Cliente:</label>
            <input
              className="form-control"
              value={user?.name || `Cliente #${user?.userId}`}
              disabled
            />
          </div>
        ) : (
          <div className="mb-3">
            <label className="form-label">Cliente:</label>
            <select
              name="idClient"
              value={form.idClient?.toString() || ""}
              onChange={handleChange}
              className={`form-control ${errors.idClient ? "is-invalid" : ""}`}
              disabled={loadingClients}
            >
              <option value="">
                {loadingClients ? "Cargando clientes..." : "Seleccionar cliente"}
              </option>

              {clients.map((client) => (
                <option key={client.idUser} value={client.idUser}>
                  {client.name || `Cliente #${client.idUser}`}
                </option>
              ))}
            </select>
            {errors.idClient && (
              <div className="invalid-feedback d-block">{errors.idClient}</div>
            )}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Sucursal:</label>
          <select
            name="idBranch"
            value={form.idBranch?.toString() || ""}
            onChange={handleChange}
            className={`form-control ${errors.idBranch ? "is-invalid" : ""}`}
            disabled={loadingBranches}
          >
            <option value="">
              {loadingBranches ? "Cargando sucursales..." : "Seleccionar sucursal"}
            </option>

            {branches.map((branch) => (
              <option key={branch.idBranch} value={branch.idBranch}>
                {branch.name || `Sucursal #${branch.idBranch}`}
              </option>
            ))}
          </select>
          {errors.idBranch && (
            <div className="invalid-feedback d-block">{errors.idBranch}</div>
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

export default WorkshopScheduleForm;