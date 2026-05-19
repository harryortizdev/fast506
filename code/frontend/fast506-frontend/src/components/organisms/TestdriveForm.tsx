import { useEffect, useState } from "react";
import { Branch } from "../../models/Branch";
import { Client } from "../../models/Client";
import { Testdrive } from "../../models/Testdrive";
import { Unit } from "../../models/Unit";
import { create, getOccupiedHoursByDate } from "../../services/TestdriveService"; 
import { getAll as getAllClients } from "../../services/ClientService"; 
import { getAll as getAllUnits } from "../../services/UnitService";
import { getAll as getAllBranches } from "../../services/BranchService";
import AlertSuccess from "../atoms/AlertSuccess";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import { updateTestdrive } from "../../services/TestdriveService";

interface TestdriveFormProps {
    onClose: () => void;
    onRefresh: () => void;
    testdriveToEdit?: Testdrive;
}

const TestdriveForm = ({ onClose, onRefresh, testdriveToEdit }: TestdriveFormProps) => {

    const [form, setForm] = useState<Partial<Testdrive>>(testdriveToEdit || {});
    const [clients, setClients] = useState<Client[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);
    const [branches, setBranch] = useState<Branch[]>([]);
    const [occupiedHours, setOccupiedHours] = useState<string[]>([]); // Estado para almacenar horas ocupadas del día
    const [errors, setErrors] = useState<Partial<Record<keyof Testdrive, string>>>({});


    const RANGO_HORAS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fechaMinima = `${anio}-${mes}-${dia}`;

    const proximoMes = new Date();
    proximoMes.setMonth(hoy.getMonth() + 1);
    const anioMax = proximoMes.getFullYear();
    const mesMax = String(proximoMes.getMonth() + 1).padStart(2, '0');
    const diaMax = String(proximoMes.getDate()).padStart(2, '0');

    const fechaMaxima = `${anioMax}-${mesMax}-${diaMax}`;

    const horaActual = `${String(hoy.getHours()).padStart(2, '0')}:${String(hoy.getMinutes()).padStart(2, '0')}`;

    // Carga inicial de catálogos
    useEffect(() => {
        getAllClients().then(setClients).catch(() => console.error("Error cargando clientes"));
        getAllUnits().then(setUnits).catch(() => console.error("Error cargando vehículos"));
        getAllBranches().then(setBranch).catch(() => console.error("Error cargando sucursales"));
    }, []);

    // Escucha cambios en la fecha para traer las horas ocupadas desde el backend
    useEffect(() => {
        if (form.scheduledDate) {
            // Llamada al backend pasando la fecha elegida (ej: "2026-05-20")
            getOccupiedHoursByDate(form.scheduledDate)
                .then((horas) => {
                    setOccupiedHours(horas); // El backend retorna un array tipo: ["12:00", "14:00"]
                })
                .catch(() => setOccupiedHours([]));
        } else {
            setOccupiedHours([]);
        }
    }, [form.scheduledDate]);

    // Manejador de cambios en los inputs y selects
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let updatedForm = {...form,[name]: name === "idUser" || name === "idCar" || name === "idBranch" ? Number(value) : value
        };

        // Lógica de automatización de la hora de finalización
        if (name === "initiationTime") {
            if (value) {
                const [horas, minutos] = value.split(":").map(Number);
                const horaFinCalculada = `${String(horas + 1).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;

                updatedForm = {...updatedForm, finalizationTime: horaFinCalculada};
            } else {
                updatedForm = {...updatedForm, finalizationTime: ""
                };
            }
        }

        setForm(updatedForm);
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof Testdrive, string>> = {};

        if (!form.scheduledDate) {
            newErrors.scheduledDate = "Debe seleccionar la fecha de la cita.";
        }
        if (!form.initiationTime) {
            newErrors.initiationTime = "Debe seleccionar una hora de inicio.";
        }
        if (!form.idUser) {
            newErrors.idUser = "Debe seleccionar un cliente.";
        }
        if (!form.idCar) {
            newErrors.idCar = "Debe seleccionar un vehículo.";
        }
        if (!form.idBranch) {
            newErrors.idBranch = "Debe seleccionar una sucursal.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            if (testdriveToEdit) {
                await updateTestdrive({ ...form } as Testdrive);
                AlertSuccess("Los cambios fueron guardados.");
            } else {
                const newTestdrive = {
                    ...form,
                    creationDate: fechaMinima,
                    statusAppointment: "Agendada",
                    isActive: 1 
                } as Testdrive;

                await create(newTestdrive);
                AlertSuccess("Testdrive creada correctamente.");
            }
            onRefresh();
            onClose();
        } catch (error) {
            alert("Error al guardar el Test Drive");
        }
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
                <h3 className="mb-4">{testdriveToEdit ? "Editar Testdrive" : "Nuevo Testdrive"}</h3>

                <div className="mb-2">
                    <label className="form-label">Fecha de la cita</label>
                    <input
                        type="date"
                        className={`form-control ${errors.scheduledDate ? "is-invalid" : ""}`}
                        name="scheduledDate"
                        value={form.scheduledDate || ""}
                        onChange={handleChange}
                        min={fechaMinima}
                        max={fechaMaxima}
                    />
                    {errors.scheduledDate && <div className="invalid-feedback d-block">{errors.scheduledDate}</div>}
                </div>

                <div className="mb-2">
                    <label className="form-label">Hora de Inicio</label>
                    <select
                        className={`form-select ${errors.initiationTime ? "is-invalid" : ""}`}
                        name="initiationTime"
                        value={form.initiationTime || ""}
                        onChange={handleChange}
                        disabled={!form.scheduledDate}
                    >
                        <option value="">
                            {!form.scheduledDate ? "Primero seleccione una fecha" : "Seleccione una hora"}
                        </option>
                        {RANGO_HORAS
                            .filter(hora => {
                                //  Filtro del backend: Si la hora ya está ocupada en la base de datos, se descarta
                                if (occupiedHours.includes(hora)) return false;
                                //  Filtro de tiempo real: Si la fecha elegida es HOY, ocultamos las horas menores o iguales a la actual
                                if (form.scheduledDate === fechaMinima) {
                                    return hora > horaActual;
                                }
                                // Si es para otro día pasa la validación 
                                return true;
                            })
                            .map((hora) => (
                                <option key={hora} value={hora}>
                                    {hora}
                                </option>
                            ))
                        }
                    </select>
                    {errors.initiationTime && <div className="invalid-feedback d-block">{errors.initiationTime}</div>}
                </div>

                <div className="mb-2">
                    <FormField
                        label="Hora de Finalización (1 hora de duración)"
                        name="finalizationTime"
                        value={form.finalizationTime || ""}
                        onChange={() => { }}
                        type="time"
                        disabled={true} 
                    />
                </div>

                <div className="mb-2">
                    <label className="form-label">Cliente</label>
                    <select
                        className={`form-select ${errors.idUser ? "is-invalid" : ""}`}
                        name="idUser"
                        value={form.idUser ?? ""}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione un cliente</option>
                        {clients.map((c) => (
                            <option key={c.idUser} value={c.idUser}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    {errors.idUser && <div className="invalid-feedback d-block">{errors.idUser}</div>}
                </div>

                <div className="mb-2">
                    <label className="form-label">Vehículo</label>
                    <select
                        className={`form-select ${errors.idCar ? "is-invalid" : ""}`}
                        name="idCar"
                        value={form.idCar ?? ""}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione un vehículo</option>
                        {units.map((u) => (
                            <option key={u.idCar} value={u.idCar}>
                                {u.carName}
                            </option>
                        ))}
                    </select>
                    {errors.idCar && <div className="invalid-feedback d-block">{errors.idCar}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Sucursal</label>
                    <select
                        className={`form-select ${errors.idBranch ? "is-invalid" : ""}`}
                        name="idBranch"
                        value={form.idBranch ?? ""}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione una Sucursal</option>
                        {branches.map((b) => (
                            <option key={b.idBranch} value={b.idBranch}>
                                {b.name}
                            </option>
                        ))}
                    </select>
                    {errors.idBranch && <div className="invalid-feedback d-block">{errors.idBranch}</div>}
                </div>

                {/* ACCIONES */}
                <div className="mt-3">
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

export default TestdriveForm;