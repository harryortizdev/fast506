import { useEffect, useState } from "react";
import { Sales } from "../../models/Sales";
import { Client } from "../../models/Client";
import { Catalog } from "../../models/Catalog";
import { Unit } from "../../models/Unit";

import { login as adminLogin } from "../../services/AdministratorService";
import { getAll as getAllClients } from "../../services/ClientService";
import { getAll as getAllCatalog } from "../../services/CatalogService";

import {
  create,
  getUnitsByCatalog,
  getUnitsByColor,
  updateSales,
  sendEmailCreate
} from "../../services/SalesService";

import AlertSuccess from "../atoms/AlertSuccess";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import Icon from "../atoms/Icon";

const SalesForm = ({ onClose, onRefresh, salesToEdit }: any) => {

  const [loginStep, setLoginStep] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [adminInfo, setAdminInfo] = useState<any>(null);

  const [form, setForm] = useState<Partial<Sales>>({});
  const [errors, setErrors] = useState<any>({});

  const [clients, setClients] = useState<Client[]>([]);
  const [catalog, setCatalog] = useState<Catalog[]>([]);
  const [filteredUnit, setFilteredUnit] = useState<Unit[]>([]);
  const [colorUnits, setColorUnits] = useState<Unit[]>([]);

  const [selectedTraction, setSelectedTraction] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const today = new Date();

  const dateToday =
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const isCompleted = salesToEdit?.salesStatus === "Completada";

  const uniqueTractions = [...new Set(filteredUnit.map(u => u.traction))];
  const availableColors = [...new Set(colorUnits.map(u => u.color))];

  // Carga clientes y catálogo al montar
  useEffect(() => {
    getAllClients().then(data =>
      setClients(Array.isArray(data) ? data : [])
    );
    getAllCatalog().then(data =>
      setCatalog(Array.isArray(data) ? data : [])
    );
  }, []);

useEffect(() => {
  if (!salesToEdit) return;
  if (catalog.length === 0) return;

  setForm({
    idClient: Number(salesToEdit.idClient),
    idCatalog: Number(salesToEdit.idCatalog),
    idCar: Number(salesToEdit.idCar),
    paymentMethod: salesToEdit.paymentMethod,
    idAdmin: salesToEdit.idAdmin,
    basePrice: salesToEdit.basePrice,
    extras: salesToEdit.extras,
    salesTax: salesToEdit.salesTax,
    transferCost: salesToEdit.transferCost,
    totalPayment: salesToEdit.totalPayment,
  });

  if (salesToEdit.idCatalog) {
    getUnitsByCatalog(Number(salesToEdit.idCatalog)).then(units => {
      const list = Array.isArray(units) ? units : [];
      setFilteredUnit(list);

      const unitActual = list.find((u: Unit) => u.idCar === Number(salesToEdit.idCar));

      if (unitActual) {
        setSelectedTraction(unitActual.traction ?? "");

        getUnitsByColor(Number(salesToEdit.idCatalog), unitActual.traction).then(colors => {
          const colorList = Array.isArray(colors) ? colors : [];
          setColorUnits(colorList);

          const colorActual = colorList.find((u: Unit) => u.idCar === Number(salesToEdit.idCar));
          if (colorActual) {
            setSelectedColor(colorActual.color ?? "");
          }
        });
      }
    });
  }

}, [salesToEdit, catalog]);

useEffect(() => {
  if (!salesToEdit) return;
  console.log("idCatalog del form:", form.idCatalog, typeof form.idCatalog);
  console.log("catalog options:", catalog.map(c => ({ id: c.idCatalog, tipo: typeof c.idCatalog })));
}, [form.idCatalog, catalog]);

  const handleLogin = async () => {

    if (!loginEmail || !loginPassword) {
      setLoginError("Ingrese correo y contraseña");
      return;
    }

    setLoadingLogin(true);
    setLoginError("");

    try {

      const admin = await adminLogin(loginEmail, loginPassword);

      setAdminInfo({
        idAdmin: admin.idUser,
        name: admin.name,
        email: admin.email
      });

      setForm(prev => ({
        ...prev,
        idAdmin: admin.idUser
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

    if (!form.idClient) newErrors.idClient = "Seleccione un cliente";
    if (!form.idCatalog) newErrors.idCatalog = "Seleccione un vehículo";
    if (!form.idCar) newErrors.idCar = "Seleccione un color";
    if (!form.paymentMethod) newErrors.paymentMethod = "Seleccione método de pago";
    if (!form.idAdmin) newErrors.idAdmin = "Administrador requerido";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;

    if (name === "idCatalog") {

      setSelectedTraction("");
      setSelectedColor("");
      setFilteredUnit([]);
      setColorUnits([]);

      setForm(prev => ({
        ...prev,
        idCatalog: value ? Number(value) : undefined,
        idCar: undefined
      }));

      if (value) {
        const units = await getUnitsByCatalog(Number(value));
        setFilteredUnit(Array.isArray(units) ? units : []);
      }

      return;
    }

    if (name === "traction") {

      setSelectedTraction(value);
      setSelectedColor("");

      setForm(prev => ({
        ...prev,
        idCar: undefined
      }));

      const colors = await getUnitsByColor(
        Number(form.idCatalog),
        value
      );

      setColorUnits(Array.isArray(colors) ? colors : []);

      return;
    }

    if (name === "color") {

      setSelectedColor(value);

      const unit = colorUnits.find(
        u =>
          u.traction?.trim().toLowerCase() === selectedTraction?.trim().toLowerCase()
          &&
          u.color?.trim().toLowerCase() === value?.trim().toLowerCase()
      );

      setForm(prev => ({
        ...prev,
        idCar: unit?.idCar
      }));

      return;
    }

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {

    if (!form.idCatalog || !form.idCar) return;

    const selCatalog = catalog.find(
      c => c.idCatalog === Number(form.idCatalog)
    );

    const selUnit = [...filteredUnit, ...colorUnits].find(
      u => u.idCar === Number(form.idCar)
    );

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

    setSubmitting(true);

    try {

      const payload = {
        ...form,
        transactionDate: dateToday,
        isActive: true
      };

      if (salesToEdit) {
        await updateSales({ ...salesToEdit, ...payload });
        AlertSuccess("Venta actualizada correctamente");
      } else {
        await create(payload);
        await sendEmailCreate(payload);
        AlertSuccess("Venta creada correctamente");
      }

      onRefresh();
      onClose();

    } catch {
      alert("Error al guardar la venta");
       setSubmitting(false);
    }
  };

  if (loginStep) {
    return (
      <div className="container d-flex justify-content-center">
        <div className="card p-4" style={{ maxWidth: "400px" }}>

          <h4>Acceso requerido</h4>

          {loginError && (
            <div className="alert alert-danger">{loginError}</div>
          )}

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
              color="#fff"
              className="btn btn-success"
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
  }

  return (
    <div className="container d-flex justify-content-center">

      <div className="card p-4" style={{ maxWidth: "500px" }}>

        <h3>{salesToEdit ? "Editar Venta" : "Nueva Venta"}</h3>

        {adminInfo && (
          <div className="alert alert-success py-2 mb-3">
            <Icon icon={<i className="bi bi-check" />} />
            Admin: <strong>{adminInfo.name}</strong>
          </div>
        )}

        <div className="mb-2">
          <label className="form-label">Cliente</label>
          <select
            className={`form-select ${errors.idClient ? "is-invalid" : ""}`}
            name="idClient"
            value={form.idClient ?? ""}
            onChange={handleChange}
          >
            <option value="">Seleccione un cliente</option>
            {clients.map(c => (
              <option key={c.idUser} value={c.idUser}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.idClient && <div className="invalid-feedback d-block">{errors.idClient}</div>}
        </div>

        <div className="mb-2">
          <label className="form-label">Vehículo</label>
         <select
            className={`form-select ${errors.idCatalog ? "is-invalid" : ""}`}
            name="idCatalog"
            value={form.idCatalog ?? ""}
            onChange={handleChange}
          >
            <option value="">Seleccione un vehículo</option>
            {catalog.map(c => (
              <option key={c.idCatalog} value={Number(c.idCatalog)}>
                {c.brandName} {c.carName}
              </option>
            ))}
          </select>
          {errors.idCatalog && <div className="invalid-feedback d-block">{errors.idCatalog}</div>}
        </div>

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
          {errors.idCar && <div className="invalid-feedback d-block">{errors.idCar}</div>}
        </div>

        <div className="mb-2">
          <label className="form-label">Método de Pago</label>
          <select
            className={`form-select ${errors.paymentMethod ? "is-invalid" : ""}`}
            name="paymentMethod"
            value={form.paymentMethod ?? ""}
            onChange={handleChange}
          >
            <option value="">Seleccione un método</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Tarjeta">Tarjeta</option>
          </select>
          {errors.paymentMethod && <div className="invalid-feedback d-block">{errors.paymentMethod}</div>}
        </div>

        <FormField label="Base" name="basePrice" value={String(form.basePrice ?? "")} onChange={handleChange} type="number" disabled />
        <FormField label="Extras" name="extras" value={String(form.extras ?? "")} onChange={handleChange} type="number" disabled />
        <FormField label="IVA" name="salesTax" value={String(form.salesTax ?? "")} onChange={handleChange} type="number" disabled />
        <FormField label="Traspaso" name="transferCost" value={String(form.transferCost ?? "")} onChange={handleChange} type="number" disabled />
        <FormField label="Total" name="totalPayment" value={String(form.totalPayment ?? "")} onChange={handleChange} type="number" disabled />

        <div className="mt-3">

          <Button
            label="Guardar"
            onClick={handleSubmit}
            backgroundColor="#198754"
            hoverColor="#145c32"
            color="#fff"
            className="btn btn-success me-2"
            disabled={isSubmitting}
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

export default SalesForm;