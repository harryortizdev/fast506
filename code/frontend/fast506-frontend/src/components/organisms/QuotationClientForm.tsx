import { useEffect, useState } from "react";
import { Quotation } from "../../models/Quotation";
import { getAll as getAllCatalog } from "../../services/CatalogService";
import { Catalog } from "../../models/Catalog";
import { Unit } from "../../models/Unit";
import AlertSuccess from "../atoms/AlertSuccess";
import { create, getUnitsByCatalog, sendEmailCreate, sendEmailUpdate, updateQuotation } from "../../services/QuotationService";
import { getClientById } from "../../services/TestdriveService";

import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import AlertWarning from "../atoms/AlertWarning";
import ButtonIcon from "../molecules/ButtonIcon";


interface QuotationFormProp {
    onClose: () => void;
    onRefresh: () => void;
    quotationToEdit?: Quotation;
    idCatalog?: number;
}

const QuotationForm = ({ onClose, onRefresh, quotationToEdit, idCatalog }: QuotationFormProp) => {

    const [form, setForm] = useState<Partial<Quotation>>(quotationToEdit || {});
    const [errors, setErrors] = useState<Partial<Record<keyof Quotation, string>>>({});
    const [catalog, setCatalog] = useState<Catalog[]>([]);
    const [filteredUnit, setUnit] = useState<Unit[]>([]);
        const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


    const [id, setId] = useState("");
    const [isClientVerified, setIsClientVerified] = useState(false);
    const [clientName, setClientName] = useState("");

    const selectedVehicle = catalog.find(c => c.idCatalog === form.idCatalog);


    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateToday = `${year}-${month}-${day}`;

    useEffect(() => {
        getAllCatalog().then(setCatalog);
    }, []);

    useEffect(() => {
        if (idCatalog) {
            setForm(f => ({ ...f, idCatalog: idCatalog }));

            getUnitsByCatalog(Number(idCatalog)).then((units) => {
                setUnit(units);
            })

                .catch((err) => {
                    console.error("Error al cargar tracciones automáticas:", err);
                    setUnit([]);
                });
        }
    }, [idCatalog]);

    useEffect(() => {
        if (quotationToEdit?.idCatalog) {
            getUnitsByCatalog(Number(quotationToEdit.idCatalog))
                .then((units) => {
                    setUnit(units);
                })
                .catch((err) => {
                    console.error("Error al precargar tracciones en edición", err);
                    setUnit([]);
                });
        }
    }, [quotationToEdit]);

    useEffect(() => {
        if (form.idCatalog && form.idCar) {
            const selectedCatalog = catalog.find(c => c.idCatalog === form.idCatalog);
            const selectedUnit = filteredUnit.find(u => u.idCar === form.idCar);

            if (selectedCatalog && selectedUnit) {
                const basePrice = selectedCatalog.basePrice || 0;
                let increasePercentage = 0;

                const tractionType = (selectedUnit.traction || "").toUpperCase();

                if (tractionType.includes("TRASERA") || tractionType.includes("RWD")) {
                    increasePercentage = 0.08;
                } else if (tractionType.includes("TOTAL PERMANENTE") || tractionType.includes("AWD")) {
                    increasePercentage = 0.16;
                } else if (tractionType.includes("CUATRO RUEDAS") || tractionType.includes("4WD") || tractionType.includes("4X4")) {
                    increasePercentage = 0.24;
                }

                const calculatedInitialPrice = basePrice * (1 + increasePercentage);
                const calculatedSalesTax = calculatedInitialPrice * 0.13;
                const calculatedTransferCost = calculatedInitialPrice * 0.05;
                const calculatedTotalPayment = calculatedInitialPrice + calculatedTransferCost;

                setForm(prevForm => ({
                    ...prevForm,
                    initialPrice: Number(calculatedInitialPrice.toFixed(2)),
                    salesTax: Number(calculatedSalesTax.toFixed(2)),
                    transferCost: Number(calculatedTransferCost.toFixed(2)),
                    totalPayment: Number(calculatedTotalPayment.toFixed(2))
                }));
            }
        } else {
            setForm(prevForm => ({
                ...prevForm,
                initialPrice: undefined,
                salesTax: undefined,
                transferCost: undefined,
                totalPayment: undefined
            }));
        }
    }, [form.idCatalog, form.idCar]);

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
        const parsedValue = name === "idUser" || name === "idCatalog" || name === "idCar" ? Number(value) : value;

        setForm(prevForm => ({ ...prevForm, [name]: parsedValue }));

        if (name === "idCatalog") {
            if (parsedValue) {
                getUnitsByCatalog(Number(parsedValue)).then(setUnit);
            } else {
                setUnit([]);
            }
            setForm(prevForm => ({ ...prevForm, idCar: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof Quotation, string>> = {};

        if (!form.initialPrice) newErrors.initialPrice = "Debe completarse el precio inicial.";

        if (!form.transferCost) newErrors.transferCost = "Debe completarse el costo de transferencia.";

        if (!form.salesTax) newErrors.salesTax = "Debe completarse el I.V.A.";

        if (!form.totalPayment) newErrors.totalPayment = "Debe Completarse el precio final del pago.";

        if (!form.idUser) newErrors.idUser = "Debe seleccionar un cliente.";

        if (!form.idCatalog) newErrors.idCatalog = "Debe seleccionar una Unidad del catalogo.";

        if (!form.idCar) newErrors.idCar = "Debe seleccionar un vehiculo de referencia.";


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
                setIsSubmitting(true);


        try {
            if (quotationToEdit) {
                const updatedQuotation = { ...quotationToEdit, ...form } as Quotation;
                await updateQuotation(updatedQuotation);
                 sendEmailUpdate(updatedQuotation);
                AlertSuccess("Los cambios fueron guardados.");
            } else {
                const newQuotation = { ...form, date: dateToday, isActive: 1 } as Quotation;
                await create(newQuotation);
                 sendEmailCreate(newQuotation);
                AlertSuccess("Cotización creada correctamente.");
            }
            onRefresh();
            onClose();
        } catch (error) {
           console.error("Error al guardar:", error);
            AlertWarning("Error al guardar la sucursal.");
            setIsSubmitting(false);
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
                        <div className="text-success small mt-2 fw-bold">
                            <i className="bi bi-check-circle-fill me-1"></i> Cliente verificado: {clientName}
                        </div>
                    )}
                </div>

                {Number(form.idCatalog) > 0 && selectedVehicle && (
                    <div className=" d-flex justify-content-center w-100">
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px",
                            marginBottom: "20px",
                            width: "100%",
                            height: "250px",
                            overflow: "hidden",
                            borderRadius: "12px",
                            boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.25)",
                        }}>
                            <img
                                src={`http://localhost:8080/${selectedVehicle.image}`}
                                alt={selectedVehicle.carName}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                }}
                            />
                        </div>
                    </div>
                )}

                <div className="mb-2">
                    <label className="form-label">Vehículo del catalogo</label>
                    <select
                        className={`form-select ${errors.idCatalog ? "is-invalid" : ""}`}
                        name="idCatalog"
                        value={form.idCatalog ?? ""}
                        onChange={handleChange}
                        disabled={!isClientVerified}

                    >
                        <option value="">Seleccione un Vehículo del catalogo</option>
                        {catalog.map((c) => (
                            <option key={c.idCatalog} value={c.idCatalog}>
                                {c.brandName + " " + c.carName + " " + c.transmission + " " + c.fuelType + " " + c.yearManufacture}
                            </option>
                        ))}
                    </select>
                    {errors.idCatalog && <div className="invalid-feedback d-block">{errors.idCatalog}</div>}
                </div>

                <div className="mb-2">
                    <label className="form-label">Tracción del Vehículo</label>
                    <select
                        className={`form-select ${errors.idCar ? "is-invalid" : ""}`}
                        name="idCar"
                        value={form.idCar ?? ""}
                        onChange={handleChange}
                        disabled={!form.idCatalog || !isClientVerified}
                    >
                        <option value="">Seleccione una tracción</option>
                        {filteredUnit.map((u) => (
                            <option key={u.idCar} value={u.idCar}>{u.traction}</option>
                        ))}
                    </select>
                    {errors.idCar && <div className="invalid-feedback d-block">{errors.idCar}</div>}
                </div>

                <div className="row">
                    <div className="col-6">

                        <div className="mb-2">
                            <FormField label="($) Precio inicial (Con I.V.A)" name="initialPrice" value={form.initialPrice !== undefined ? form.initialPrice.toString() : ""}
                                onChange={handleChange} type="number" disabled={true} />
                        </div>

                        <div className="mb-2">
                            <FormField label="($) Porcentaje del I.V.A (13%)" name="salesTax" value={form.salesTax !== undefined ? form.salesTax.toString() : ""}
                                onChange={handleChange} type="number" disabled={true} />
                        </div>
                    </div>
                    <div className="col-6">

                        <div className="mb-2">
                            <FormField label="($) Costo de traspaso (5%)" name="transferCost" value={form.transferCost !== undefined ? form.transferCost.toString() : ""}
                                onChange={handleChange} type="number" disabled={true} />
                        </div>

                        <div className="mb-2">
                            <FormField label="($) Precio Total a Pagar" name="totalPayment" value={form.totalPayment !== undefined ? form.totalPayment.toString() : ""}
                                onChange={handleChange} type="number" disabled={true} />
                        </div>
                    </div>
                </div>

                <div className="mt-2 d-flex justify-content-center">
                    <Button label="Guardar" onClick={handleSubmit} backgroundColor="#198754" hoverColor="#145c32" color="#fff" disabled={!isClientVerified || isSubmitting} className="btn btn-success me-2"
 />
                    <Button label="Cancelar" onClick={onClose} backgroundColor="#6c757d" hoverColor="#495057" color="#fff" className="btn btn-secondary" />
                </div>

            </div>
        </div>
    );
};

export default QuotationForm;