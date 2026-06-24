import { useEffect, useState } from "react";
import { Branch } from "../../models/Branch";
import { Client } from "../../models/Client";
import { Testdrive } from "../../models/Testdrive";
import { Unit } from "../../models/Unit";
import { create, getOccupiedHoursByDate, sendEmailCreate, sendEmailUpdate } from "../../services/TestdriveService";
import { getAll as getAllClients } from "../../services/ClientService";
import { getAllCarAvailable as getAllUnits } from "../../services/TestdriveService";
import { getAll as getAllBranches } from "../../services/BranchService";
import AlertSuccess from "../atoms/AlertSuccess";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import { updateTestdrive } from "../../services/TestdriveService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

    // 1. Obtener la fecha de HOY REAL (para comparar abajo en el select de horas)
    const hoyReal = new Date();
    const anioHoy = hoyReal.getFullYear();
    const mesHoy = String(hoyReal.getMonth() + 1).padStart(2, '0');
    const diaHoy = String(hoyReal.getDate()).padStart(2, '0');
    const fechaHoyReal = `${anioHoy}-${mesHoy}-${diaHoy}`;

    // 2. Obtener la hora actual para el filtro de horas
    const horaActual = `${String(hoyReal.getHours()).padStart(2, '0')}:${String(hoyReal.getMinutes()).padStart(2, '0')}`;

    // 3. Lógica para mover el CALENDARIO (fechaMinima) si ya pasaron las 3:00 PM
    const hoy = new Date();
    if (hoyReal.getHours() >= 15) {
        hoy.setDate(hoy.getDate() + 1);
    }

    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fechaMinima = `${anio}-${mes}-${dia}`;

    // 4. Lógica para la fechaMaxima del calendario
    const proximoMes = new Date(hoy);
    proximoMes.setMonth(proximoMes.getMonth() + 1);
    const anioMax = proximoMes.getFullYear();
    const mesMax = String(proximoMes.getMonth() + 1).padStart(2, '0');
    const diaMax = String(proximoMes.getDate()).padStart(2, '0');
    const fechaMaxima = `${anioMax}-${mesMax}-${diaMax}`;

    // Carga inicial de catálogos
    useEffect(() => {
        getAllClients().then(setClients).catch(() => console.error("Error cargando clientes"));
        getAllUnits().then(setUnits).catch(() => console.error("Error cargando vehículos"));
        getAllBranches().then(setBranch).catch(() => console.error("Error cargando sucursales"));
    }, []);

    // Escucha cambios en la fecha para traer las horas ocupadas desde el backend
    useEffect(() => {
        if (form.scheduledDate && form.idBranch) {
            getOccupiedHoursByDate(form.scheduledDate, form.idBranch)
                .then((horas) => {
                    setOccupiedHours(horas); // El backend retorna un array tipo: ["12:00", "14:00"]
                })
                .catch(() => setOccupiedHours([]));
        } else {
            setOccupiedHours([]);
        }
    }, [form.scheduledDate, form.idBranch]);

    // Manejador de cambios en los inputs y selects
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let updatedForm = {
            ...form,
            [name]: name === "idUser" || name === "idCar" || name === "idBranch" ? Number(value) : value
        };

        // NUEVO: Si cambian la sucursal, reseteamos las horas acumuladas para obligar a re-elegir
        if (name === "idBranch") {
            updatedForm = {
                ...updatedForm,
                initiationTime: undefined,
                finalizationTime: undefined
            };
        }

        if (name === "initiationTime") {
            if (value) {
                const [horas, minutos] = value.split(":").map(Number);
                const horaFinCalculada = `${String(horas + 1).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
                updatedForm = { ...updatedForm, finalizationTime: horaFinCalculada };
            } else {
                updatedForm = { ...updatedForm, finalizationTime: "" };
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
                const updatedTestdrive = {
                    ...testdriveToEdit,
                    ...form
                } as Testdrive;

                await updateTestdrive(updatedTestdrive);
                sendEmailUpdate(updatedTestdrive);
                AlertSuccess("Los cambios fueron guardados.");
            } else {
                const newTestdrive = {
                    ...form,
                    creationDate: fechaHoyReal,
                    statusAppointment: "Agendada",
                    isActive: 1
                } as Testdrive;

                await create(newTestdrive);
                sendEmailCreate(newTestdrive);
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
                    <DatePicker
                        wrapperClassName="w-100"
                        className={`form-control w-100 ${errors.scheduledDate ? "is-invalid" : ""}`}
                        placeholderText="Seleccione una fecha"
                        dateFormat="dd/MM/yyyy"

                        // 1. Renderiza la fecha actual del formulario usando la hora local fija
                        selected={form.scheduledDate ? new Date(form.scheduledDate + "T00:00:00") : null}

                        // 2. Mapea tus variables string a objetos Date locales para bloquear el calendario
                        minDate={new Date(fechaMinima + "T00:00:00")}
                        maxDate={new Date(fechaMaxima + "T00:00:00")}

                        // 3. Al seleccionar, parsea de forma local para no romper el filtro de horas (form.scheduledDate === fechaMinima)
                        onChange={(date: Date | null) => {
                            if (date) {
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const day = String(date.getDate()).padStart(2, '0');

                                setForm({
                                    ...form,
                                    scheduledDate: `${year}-${month}-${day}`,
                                    initiationTime: undefined, 
                                    finalizationTime: undefined 
                                });
                            } else {
                                setForm({
                                    ...form,
                                    scheduledDate: undefined,
                                    initiationTime: undefined,
                                    finalizationTime: undefined
                                });
                            }
                        }}
                    />
                    {errors.scheduledDate && <div className="invalid-feedback d-block">{errors.scheduledDate}</div>}
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
                                {u.carName + " "+ u.transmission + " " + u.fuelType}
                            </option>
                        ))}
                    </select>
                    {errors.idCar && <div className="invalid-feedback d-block">{errors.idCar}</div>}
                </div>

                <div className="mb-2">
                    <label className="form-label">Hora de Inicio</label>
                    <select
                        className={`form-select ${errors.initiationTime ? "is-invalid" : ""}`}
                        name="initiationTime"
                        value={form.initiationTime || ""}
                        onChange={handleChange}
                        disabled={!form.scheduledDate || !form.idBranch}
                    >
                        <option value="">
                            {form.scheduledDate && form.idBranch ? "Seleccione una hora" : "Primero seleccione una fecha y una sucursal"}
                        </option>
                        {RANGO_HORAS
                            .filter(hora => {
                                // Filtro del backend: Si la hora ya está ocupada, se descarta
                                if (occupiedHours.includes(hora)) return false;

                                // Comparamos contra la fecha real de hoy, no contra la del calendario
                                if (form.scheduledDate === fechaHoyReal) {
                                    return hora > horaActual;
                                }

                                // Si es para otro día (como mañana), muestra todo el rango de horas libre
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




                {/* ESTADO DE LA CITA - SOLO APARECE AL EDITAR */}
                {testdriveToEdit && (
                    <div className="mb-3">
                        <label className="form-label">Estado de la Cita</label>
                        <select
                            className="form-select"
                            name="statusAppointment"
                            value={form.statusAppointment || "Agendada"}
                            onChange={handleChange}
                        >
                            <option value="Agendada">Agendada</option>
                            <option value="Finalizada">Finalizada</option>
                            <option value="Cancelada">Cancelada</option>
                        </select>
                    </div>
                )}

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