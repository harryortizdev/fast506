import { useEffect, useState } from "react";
import { Quotation } from "../../models/Quotation";
import { getAll as getAllClients } from "../../services/ClientService";
import { getAll as getAllCatalog } from "../../services/CatalogService";
import { Client } from "../../models/Client";
import { Catalog } from "../../models/Catalog";
import { Unit } from "../../models/Unit";
import AlertSuccess from "../atoms/AlertSuccess";
import { create, getUnitsByCatalog, updateQuotation } from "../../services/QuotationService";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";

interface QuotationFormProp {
    onClose: () => void;
    onRefresh: () => void;
    quotationToEdit?: Quotation;
}

const QuotationForm = ({ onClose, onRefresh, quotationToEdit }: QuotationFormProp) => {

    const [form, setForm] = useState<Partial<Quotation>>(quotationToEdit || {});
    const [errors, setErrors] = useState<Partial<Record<keyof Quotation, string>>>({});
    const [client, setClient] = useState<Client[]>([]);
    const [catalog, setCatalog] = useState<Catalog[]>([]);
    const [filteredUnit, setUnit] = useState<Unit[]>([]);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateToday = `${year}-${month}-${day}`;

    useEffect(() => {
        getAllClients().then(setClient);
        getAllCatalog().then(setCatalog);
    }, []);

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

        if (!form.idCar) newErrors.idCar = "Debe seleccionar un vehículo de referencia.";


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            if (quotationToEdit) {
                const updatedQuotation = { ...quotationToEdit, ...form } as Quotation;
                await updateQuotation(updatedQuotation);
                AlertSuccess("Los cambios fueron guardados.");
            } else {
                const newQuotation = { ...form, date: dateToday, isActive: 1 } as Quotation;
                await create(newQuotation);
                AlertSuccess("Cotización creada correctamente.");
            }
            onRefresh();
            onClose();
        } catch (error) {
            alert("Error al guardar la cotización");
        }
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
                <h3 className="mb-4">{quotationToEdit ? "Editar Cotización" : "Nueva Cotización"}</h3>

                <div className="mb-2">
                    <label className="form-label">Cliente</label>
                    <select
                        className={`form-select ${errors.idUser ? "is-invalid" : ""}`}
                        name="idUser"
                        value={form.idUser ?? ""}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione un cliente</option>
                        {client.map((c) => (
                            <option key={c.idUser} value={c.idUser}>{c.name}</option>
                        ))}
                    </select>
                    {errors.idUser && <div className="invalid-feedback d-block">{errors.idUser}</div>}
                </div>

                <div className="mb-2">
                    <label className="form-label">Vehículo del catalogo</label>
                    <select
                        className={`form-select ${errors.idCatalog ? "is-invalid" : ""}`}
                        name="idCatalog"
                        value={form.idCatalog ?? ""}
                        onChange={handleChange}
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
                        disabled={!form.idCatalog}
                    >
                        <option value="">Seleccione una tracción</option>
                        {filteredUnit.map((u) => (
                            <option key={u.idCar} value={u.idCar}>{u.traction}</option>
                        ))}
                    </select>
                    {errors.idCar && <div className="invalid-feedback d-block">{errors.idCar}</div>}
                </div>

                <div className="mb-2">
                    <FormField label="($) Precio inicial " name="initialPrice" value={form.initialPrice !== undefined ? form.initialPrice.toString() : ""}
                        onChange={handleChange} type="number" disabled={true} />
                </div>

                <div className="mb-2">
                    <FormField label="($) Porcentaje del I.V.A (13% Ya Incluido)" name="salesTax" value={form.salesTax !== undefined ? form.salesTax.toString() : ""}
                        onChange={handleChange} type="number" disabled={true} />
                </div>

                <div className="mb-2">
                    <FormField label="($) Costo de traspaso (5%)" name="transferCost" value={form.transferCost !== undefined ? form.transferCost.toString() : ""}
                        onChange={handleChange} type="number" disabled={true} />
                </div>

                <div className="mb-2">
                    <FormField label="($) Precio Total a Pagar" name="totalPayment" value={form.totalPayment !== undefined ? form.totalPayment.toString() : ""}
                        onChange={handleChange} type="number" disabled={true} />
                </div>

                <div className="mt-3">
                    <Button label="Guardar" onClick={handleSubmit} backgroundColor="#198754" hoverColor="#145c32" color="#fff" className="btn btn-success me-2" />
                    <Button label="Cancelar" onClick={onClose} backgroundColor="#6c757d" hoverColor="#495057" color="#fff" className="btn btn-secondary" />
                </div>
            </div>
        </div>
    );
};

export default QuotationForm;