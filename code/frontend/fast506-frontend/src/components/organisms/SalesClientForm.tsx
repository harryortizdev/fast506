import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sales } from "../../models/Sales";
import { Catalog } from "../../models/Catalog";
import { Unit } from "../../models/Unit";
import { login as clientLogin } from "../../services/ClientService";
import { getAll as getAllCatalog } from "../../services/CatalogService";
import {
    create,
    getUnitsByCatalog,
    getUnitsByColor,
} from "../../services/SalesService";

import AlertSuccess from "../atoms/AlertSuccess";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import Table from "../atoms/Table";
import Icon from "../atoms/Icon";

const SalesClientForm = ({ onClose, onRefresh, idCatalogFromUrl }: any) => {

    const navigate = useNavigate();

    const [loginStep, setLoginStep] = useState(true);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loadingLogin, setLoadingLogin] = useState(false);

    const [clientInfo, setClientInfo] = useState<{ name: string; id: number } | null>(null);

    const [form, setForm] = useState<Partial<Sales>>({});
    const [errors, setErrors] = useState<any>({});

    const [catalog, setCatalog] = useState<Catalog[]>([]);
    const [filteredUnit, setFilteredUnit] = useState<Unit[]>([]);
    const [colorUnits, setColorUnits] = useState<Unit[]>([]);

    const [selectedTraction, setSelectedTraction] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const [catalogIdInput, setCatalogIdInput] = useState("");
    const [selectedCatalogInfo, setSelectedCatalogInfo] = useState<Catalog | null>(null);

    const today = new Date();
    const dateToday =
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const uniqueTractions = [...new Set(filteredUnit.map(u => u.traction))];
    const availableColors = [...new Set(colorUnits.map(u => u.color))];


    useEffect(() => {
        getAllCatalog().then(data => {
            const list = Array.isArray(data) ? data : [];
            setCatalog(list);

            if (idCatalogFromUrl) {
                const found = list.find((c: Catalog) => c.idCatalog === Number(idCatalogFromUrl));
                if (found) {
                    setSelectedCatalogInfo(found);
                    setCatalogIdInput(String(found.idCatalog));
                    setForm(prev => ({ ...prev, idCatalog: found.idCatalog, idCar: undefined }));
                    getUnitsByCatalog(Number(found.idCatalog)).then(units =>
                        setFilteredUnit(Array.isArray(units) ? units : [])
                    );
                }
            }
        });
    }, []);

    const handleLogin = async () => {
        if (!loginEmail || !loginPassword) {
            setLoginError("Ingrese correo y contraseña");
            return;
        }
        setLoadingLogin(true);
        setLoginError("");
        try {
            const client = await clientLogin(loginEmail, loginPassword);
            setClientInfo({ name: client.name, id: client.id });
            setForm(prev => ({
                ...prev,
                idClient: client.idUser,
                idAdmin: undefined
            }));
            setLoginStep(false);
        } catch {
            setLoginError("Correo o contraseña incorrectos");
        } finally {
            setLoadingLogin(false);
        }
    };

    const validate = () => {
        const newErrors: any = {};
        if (!form.idClient) newErrors.idClient = "Cliente requerido";
        if (!form.idCatalog) newErrors.idCatalog = "Seleccione un vehículo";
        if (!form.idCar) newErrors.idCar = "Seleccione un color";
        if (!form.paymentMethod) newErrors.paymentMethod = "Seleccione método de pago";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === "traction") {
            setSelectedTraction(value);
            setSelectedColor("");
            setForm(prev => ({ ...prev, idCar: undefined }));
            const colors = await getUnitsByColor(Number(form.idCatalog), value);
            setColorUnits(Array.isArray(colors) ? colors : []);
            return;
        }

        if (name === "color") {
            setSelectedColor(value);
            const unit = colorUnits.find(
                u =>
                    u.traction?.trim().toLowerCase() === selectedTraction?.trim().toLowerCase() &&
                    u.color?.trim().toLowerCase() === value?.trim().toLowerCase()
            );
            setForm(prev => ({ ...prev, idCar: unit?.idCar }));
            return;
        }

        setForm(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (!form.idCatalog || !form.idCar) return;

        const selCatalog = catalog.find(c => c.idCatalog === Number(form.idCatalog));
        const selUnit = [...filteredUnit, ...colorUnits].find(u => u.idCar === Number(form.idCar));

        if (!selCatalog || !selUnit) return;

        const basePrice = selCatalog.basePrice || 0;
        const traction = (selUnit.traction || "").toUpperCase();
        const extrasPercentage =
            traction.includes("AWD") ? 0.24 :
                traction.includes("4WD") || traction.includes("4X4") ? 0.16 :
                    traction.includes("RWD") ? 0.08 : 0;

        const extras = basePrice * extrasPercentage;
        const salesTax = basePrice * 0.13;
        const transferCost = basePrice * 0.05;

        setForm(prev => ({
            ...prev,
            basePrice,
            extras,
            salesTax,
            transferCost,
            totalPayment: basePrice + extras + salesTax + transferCost
        }));
    }, [form.idCatalog, form.idCar, catalog, filteredUnit, colorUnits]);

    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            const payload = { ...form, transactionDate: dateToday, isActive: true };
            await create(payload);
            AlertSuccess("Venta creada correctamente");
            onRefresh();
            onClose();
             navigate("/");
        } catch {
            alert("Error al guardar la venta");
        }
    };

    if (loginStep) {
        return (
            <div className="container d-flex justify-content-center">
                <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
                    <h4 className="mb-3">
                        <Icon icon={<i className="bi bi-person-circle" />} /> Iniciar Sesión
                    </h4>

                    {loginError && <div className="alert alert-danger py-2">{loginError}</div>}

                    <FormField
                        label="Correo"
                        name="email"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        type="email"
                        disabled={loadingLogin}
                    />
                    <FormField
                        label="Contraseña"
                        name="password"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        type="password"
                        disabled={loadingLogin}
                    />

                    <div className="d-flex gap-2 mt-3">
                        <Button
                            label={loadingLogin ? "Verificando..." : "Ingresar"}
                            onClick={handleLogin}
                            backgroundColor="#198754"
                            hoverColor="#145c32"
                            color="#EEF1EF "
                            className="btn btn-success"
                        />
                        <Button
                            label="Cancelar"
                            onClick={onClose}
                            backgroundColor="#6c757d"
                            hoverColor="#495057"
                            color="#EEF1EF "
                            className="btn btn-secondary"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container d-flex justify-content-center py-3">
            <div className="card p-4" style={{ maxWidth: "560px", width: "100%" }}>

                <div className="border rounded p-3 mb-3">
                    <h6 className="text-muted mb-3 d-flex align-items-center gap-2">
                        <Icon icon={<i className="bi bi-person-badge" />} /> Datos Personales
                    </h6>
                    <div className="alert alert-info py-2 mb-0">
                        <div><Icon icon={<i className="bi bi-person" />} /><strong> Nombre:</strong> {clientInfo?.name}</div>
                        <div><Icon icon={<i className="bi bi-card-text" />} /><strong> Cédula:</strong> {clientInfo?.id}</div>
                    </div>
                </div>

                <div className="border rounded p-3 mb-3">
                    <h6 className="text-muted mb-3 d-flex align-items-center gap-2">
                        <Icon icon={<i className="bi bi-credit-card" />} /> Tipo de Pago
                    </h6>

                    {errors.paymentMethod && (
                        <div className="alert alert-danger py-1 px-2 small mb-2">{errors.paymentMethod}</div>
                    )}

                    <div className="d-flex flex-wrap gap-2">
                        <label
                            className={`d-flex align-items-center gap-2 border rounded px-3 py-2 ${form.paymentMethod === "Efectivo" ? "border-success bg-success bg-opacity-10" : ""}`}
                            style={{ cursor: "pointer", flex: "1 0 120px" }}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Efectivo"
                                checked={form.paymentMethod === "Efectivo"}
                                onChange={handleChange}
                                className="form-check-input mt-0"
                            />
                            <Icon icon={<i className="bi bi-cash-coin" />} />
                            <span>Efectivo</span>
                        </label>

                        <label
                            className={`d-flex align-items-center gap-2 border rounded px-3 py-2 ${form.paymentMethod === "Transferencia" ? "border-primary bg-primary bg-opacity-10" : ""}`}
                            style={{ cursor: "pointer", flex: "1 0 120px" }}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Transferencia"
                                checked={form.paymentMethod === "Transferencia"}
                                onChange={handleChange}
                                className="form-check-input mt-0"
                            />
                            <Icon icon={<i className="bi bi-bank" />} />
                            <span>Transferencia</span>
                        </label>

                        <label
                            className={`d-flex align-items-center gap-2 border rounded px-3 py-2 ${form.paymentMethod === "Tarjeta" ? "border-warning bg-warning bg-opacity-10" : ""}`}
                            style={{ cursor: "pointer", flex: "1 0 120px" }}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Tarjeta"
                                checked={form.paymentMethod === "Tarjeta"}
                                onChange={handleChange}
                                className="form-check-input mt-0"
                            />
                            <Icon icon={<i className="bi bi-credit-card-2-front" />} />
                            <span>Tarjeta</span>
                        </label>
                    </div>
                </div>

                <div className="border rounded p-3 mb-3">
                    <h6 className="text-muted mb-3 d-flex align-items-center gap-2">
                        <Icon icon={<i className="bi bi-car-front" />} /> Producto
                    </h6>

                    {selectedCatalogInfo && (
                        <div className="alert alert-secondary py-2 px-3 mb-2">
                            <div className="d-flex flex-wrap gap-3">
                                <span><strong>Marca:</strong> {selectedCatalogInfo.brandName}</span>
                                <span><strong>Modelo:</strong> {selectedCatalogInfo.carName}</span>
                                <span><strong>Precio base:</strong> ₡{selectedCatalogInfo.basePrice?.toLocaleString()}</span>
                            </div>
                        </div>
                    )}

                    {filteredUnit.length > 0 && (
                        <div className="mb-2">
                            <label className="form-label">Tracción</label>
                            <select
                                className="form-select"
                                name="traction"
                                value={selectedTraction}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione una tracción</option>
                                {uniqueTractions.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {availableColors.length > 0 && (
                        <div className="mb-2">
                            <label className="form-label">Color</label>
                            <select
                                className={`form-select ${errors.idCar ? "is-invalid" : ""}`}
                                name="color"
                                value={selectedColor}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione un color</option>
                                {availableColors.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            {errors.idCar && (
                                <div className="invalid-feedback">{errors.idCar}</div>
                            )}
                        </div>
                    )}

                    {form.basePrice !== undefined && (
                        <div className="mt-3 border-top pt-3">
                            <h6 className="text-muted mb-2 d-flex align-items-center gap-1">
                                <Icon icon={<i className="bi bi-calculator" />} /> Resumen de Pago
                            </h6>
                            <Table
                                rows={[
                                    { concepto: "Precio base", monto: `₡${Number(form.basePrice).toLocaleString()}` },
                                    { concepto: "Extras", monto: `₡${Number(form.extras).toLocaleString()}` },
                                    { concepto: "IVA (13%)", monto: `₡${Number(form.salesTax).toLocaleString()}` },
                                    { concepto: "Traspaso (5%)", monto: `₡${Number(form.transferCost).toLocaleString()}` },
                                    { concepto: "Total", monto: `₡${Number(form.totalPayment).toLocaleString()}` },
                                ]}
                            />
                        </div>
                    )}
                </div>

                <div className="alert alert-warning d-flex gap-2 align-items-start mb-3" role="alert">
                    <Icon icon={<i className="bi bi-info-circle-fill" />} />
                    <div>
                        <strong>Nota importante:</strong> Una vez confirmada la compra, recibirá un correo electrónico con su número de factura. Dicho documento deberá ser presentado en la sucursal más cercana para completar formalmente el proceso de adquisición del vehículo.
                    </div>
                </div>

                <div className="d-flex gap-2 mt-2">
                    <Button
                        label="Comprar"
                        onClick={handleSubmit}
                        backgroundColor="#198754"
                        hoverColor="#145c32"
                        color="#EEF1EF "
                        className="btn btn-success flex-grow-1"
                    />
                    <Button
                        label="Cancelar"
                        onClick={onClose}
                        backgroundColor="#6c757d"
                        hoverColor="#495057"
                        color="#EEF1EF "
                        className="btn btn-secondary"
                    />
                </div>

            </div>
        </div>
    );
};

export default SalesClientForm;