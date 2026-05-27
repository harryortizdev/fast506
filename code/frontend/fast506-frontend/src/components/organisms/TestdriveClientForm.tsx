import { useEffect, useState } from "react";
import { Branch } from "../../models/Branch";
import { Testdrive } from "../../models/Testdrive";
import { Unit } from "../../models/Unit";
import { create, getClientById, getOccupiedHoursByDate } from "../../services/TestdriveService";
import { getAllCarAvailable as getAllUnits } from "../../services/TestdriveService";
import { getAll as getAllBranches } from "../../services/BranchService";
import AlertSuccess from "../atoms/AlertSuccess";
import Button from "../atoms/Button";
import { updateTestdrive } from "../../services/TestdriveService";
import AlertWarning from "../atoms/AlertWarning";
import ButtonIcon from "../molecules/ButtonIcon";
import Input from "../atoms/Input";

interface TestdriveFormProps {
    onClose: () => void;
    onRefresh: () => void;
    testdriveToEdit?: Testdrive;
    carName?: string;

}

const ClientTestdriveForm = ({ onClose, onRefresh, testdriveToEdit, carName }: TestdriveFormProps) => {

    const [form, setForm] = useState<Partial<Testdrive>>(testdriveToEdit || {});
    const [units, setUnits] = useState<Unit[]>([]);
    const [branches, setBranch] = useState<Branch[]>([]);
    const [occupiedHours, setOccupiedHours] = useState<string[]>([]);
    const [errors, setErrors] = useState<Partial<Record<keyof Testdrive, string>>>({});

    const [id, setId] = useState("");
    const [isClientVerified, setIsClientVerified] = useState(false);
    const [clientName, setClientName] = useState("");

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

    useEffect(() => {
        getAllUnits().then(setUnits).catch(() => console.error("Error cargando vehículos"));
        getAllBranches().then(setBranch).catch(() => console.error("Error cargando sucursales"));
    }, []);

    useEffect(() => {
        if (carName && units.length > 0) {
            const matchedVehicle = units.find(
                (u) => u.carName.trim().toLowerCase() === carName.trim().toLowerCase()
            );

            if (matchedVehicle) {
                setForm((f) => ({ ...f, idCar: matchedVehicle.idCar }));
            }
        }
    }, [carName, units]); 

    useEffect(() => {
        if (form.scheduledDate && form.idBranch) {
            getOccupiedHoursByDate(form.scheduledDate, form.idBranch)
                .then((horas) => {
                    setOccupiedHours(horas);
                })
                .catch(() => setOccupiedHours([]));
        } else {
            setOccupiedHours([]);
        }
    }, [form.scheduledDate, form.idBranch]);

    const handleVerifyClient = async () => {
        if (!id.trim()) {
            AlertWarning("Por favor, ingrese un número de cédula.");
            return;
        }

        try {
            const client = await getClientById(Number(id));

            if (client) {
                setIsClientVerified(true);
                setClientName(client.name);
                setForm(f => ({ ...f, idUser: client.idUser }));
            } else {
                setIsClientVerified(false);
                setClientName("");
                AlertWarning("Cédula incorrecta o cliente no registrado.");
            }
        } catch (error) {
            alert("Error al conectar con el servidor de clientes.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let updatedForm = {
            ...form,
            [name]: name === "idUser" || name === "idCar" || name === "idBranch" ? Number(value) : value
        };

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

        if (!form.idUser) {
            newErrors.idUser = "Debe registrar un usuario.";
            return false;
        }
        if (!form.scheduledDate) {
            newErrors.scheduledDate = "Debe seleccionar la fecha de la cita.";
        }
        if (!form.initiationTime) {
            newErrors.initiationTime = "Debe seleccionar una hora de inicio.";
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
        <div className="container d-flex justify-content-center p-4">
            <div style={{ maxWidth: '500px', width: '100%' }}>

                <div className="mb-4 p-3 border rounded bg-light">
                    <label className="form-label fw-bold">Verificación de Identidad</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingrese su cédula"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            disabled={isClientVerified}
                        />
                        <ButtonIcon
                            label="Verificar"
                            color="#EEF1EF"
                            backgroundColor="#5E6572"
                            hoverColor="#2C3E50"
                            onClick={handleVerifyClient}
                            icon={<i className="bi bi-check-lg"></i>}
                            className={""}
                        />


                    </div>
                    {isClientVerified && (
                        <div className="text-success small mt-2 fw-bold ">
                            <i className="bi bi-check-circle-fill me-1"></i> Cliente verificado: {clientName}
                        </div>
                    )}
                </div>


                <div className="mb-2">
                    <label className="form-label">Vehículo</label>
                    <select
                        className={`form-select ${errors.idCar ? "is-invalid" : ""}`}
                        name="idCar"
                        value={form.idCar ?? ""}
                        onChange={handleChange}
                        disabled={!isClientVerified}
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
                <div className="row">
                    <div className="col-6">
                        <div className="mb-2">
                            <label className="form-label">Sucursal</label>
                            <select
                                className={`form-select ${errors.idBranch ? "is-invalid" : ""}`}
                                name="idBranch"
                                value={form.idBranch ?? ""}
                                onChange={handleChange}
                                disabled={!isClientVerified} // Desactivado hasta verificar
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
                            <label className="form-label">Fecha de la cita</label>
                            <input
                                type="date"
                                className={`form-control ${errors.scheduledDate ? "is-invalid" : ""}`}
                                name="scheduledDate"
                                value={form.scheduledDate || ""}
                                onChange={handleChange}
                                min={fechaMinima}
                                max={fechaMaxima}
                                disabled={!isClientVerified} // Desactivado hasta verificar
                            />
                            {errors.scheduledDate && <div className="invalid-feedback d-block">{errors.scheduledDate}</div>}
                        </div>
                    </div>

                    <div className="col-6">

                        <div className="mb-2">
                            <label className="form-label">Hora de Inicio</label>
                            <select
                                className={`form-select ${errors.initiationTime ? "is-invalid" : ""}`}
                                name="initiationTime"
                                value={form.initiationTime || ""}
                                onChange={handleChange}
                                disabled={!isClientVerified || !form.scheduledDate || !form.idBranch} // Desactivado hasta verificar e ingresar fecha
                            >
                                <option value="">
                                    {form.scheduledDate && form.idBranch ? "Seleccione una hora" : "Seleccione fecha y sucursal"}
                                </option>
                                {RANGO_HORAS
                                    .filter(hora => {
                                        if (occupiedHours.includes(hora)) return false;
                                        if (form.scheduledDate === fechaMinima) {
                                            return hora > horaActual;
                                        }
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

                            <label className="form-label">Hora de Finalización</label>
                            <Input
                                name="finalizationTime"
                                value={form.finalizationTime || ""}
                                onChange={() => { }}
                                type="time"
                                disabled={true}
                            />

                        </div>
                    </div>
                </div>



                <div className="mt-2 d-flex justify-content-center">
                    <Button
                        label="Guardar"
                        onClick={handleSubmit}
                        backgroundColor="#198754"
                        hoverColor="#145c32"
                        color="#fff"
                        className="btn btn-success me-2"
                        disabled={!isClientVerified}
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

export default ClientTestdriveForm;