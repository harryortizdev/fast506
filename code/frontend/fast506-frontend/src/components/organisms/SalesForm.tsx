import { useEffect, useState } from "react";
import { Sales } from "../../models/Sales";
import { Client } from "../../models/Client";
import { Catalog } from "../../models/Catalog";
import { Unit } from "../../models/Unit";

import { getAll as getAllClients } from "../../services/ClientService";
import { getAll as getAllCatalog } from "../../services/CatalogService";

import {
  create,
  getUnitsByCatalog,
  updateSales
} from "../../services/SalesService";

import AlertSuccess from "../atoms/AlertSuccess";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";

interface SalesFormProps {
  onClose: () => void;
  onRefresh: () => void;
  salesToEdit?: Sales | null;
}

const SalesForm = ({
  onClose,
  onRefresh,
  salesToEdit
}: SalesFormProps) => {

  const [form, setForm] = useState<Partial<Sales>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof Sales, string>>>({});
  const [clients, setClients] = useState<Client[]>([]);
  const [catalog, setCatalog] = useState<Catalog[]>([]);
  const [filteredUnit, setUnit] = useState<Unit[]>([]);

  const today = new Date();

  const dateToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    getAllClients().then(setClients);
    getAllCatalog().then(setCatalog);
  }, []);

  useEffect(() => {

    if (!salesToEdit) return;

    setForm(salesToEdit);

    if (salesToEdit.idCatalog) {
      getUnitsByCatalog(Number(salesToEdit.idCatalog))
        .then(setUnit)
        .catch(console.error);
    }

  }, [salesToEdit]);

  useEffect(() => {

    if (!form.idCatalog || !form.idCar) {

      setForm(prev => ({
        ...prev,
        basePrice: undefined,
        extras: undefined,
        salesTax: undefined,
        transferCost: undefined,
        totalPayment: undefined
      }));

      return;
    }

    const selectedCatalog = catalog.find(c => c.idCatalog === Number(form.idCatalog));

    const selectedUnit = filteredUnit.find(u => u.idCar === Number(form.idCar));

    if (!selectedCatalog || !selectedUnit) return;

    const basePrice = selectedCatalog.basePrice || 0;

    const traction = (selectedUnit.traction || "").toUpperCase();

    const extrasPercentage =
      traction.includes("AWD") ? 0.24 :
        traction.includes("4WD") || traction.includes("4X4") ? 0.16 :
          traction.includes("RWD") ? 0.08 :
            0;

    const extras = basePrice * extrasPercentage;
    const salesTax = basePrice * 0.13;
    const transferCost = basePrice * 0.05;

    setForm(prev => ({
      ...prev,
      basePrice: Number(basePrice.toFixed(2)),
      extras: Number(extras.toFixed(2)),
      salesTax: Number(salesTax.toFixed(2)),
      transferCost: Number(transferCost.toFixed(2)),
      totalPayment: Number((basePrice + extras + salesTax + transferCost).toFixed(2))
    }));

  }, [form.idCatalog, form.idCar, catalog, filteredUnit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;

    const updatedForm: any = {
      ...form,
      [name]:
        ["idClient", "idAdmin", "idCatalog", "idCar"].includes(name)
          ? value === ""
            ? undefined
            : Number(value)
          : value
    };

    if (name === "idCatalog") {

      updatedForm.idCar = undefined;

      value !== ""
        ? getUnitsByCatalog(Number(value))
          .then(setUnit)
          .catch(console.error)
        : setUnit([]);
    }

    setForm(updatedForm);
  };

  const validate = () => {

    const newErrors: Partial<Record<keyof Sales, string>> = {};

    if (!form.idClient) newErrors.idClient = "Seleccione un cliente";

    if (!form.idAdmin) newErrors.idAdmin = "Ingrese un administrador";

    if (!form.idCatalog) newErrors.idCatalog = "Seleccione un catálogo";

    if (!form.idCar) newErrors.idCar = "Seleccione una tracción";

    if (!form.paymentMethod) newErrors.paymentMethod = "Seleccione un método";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {

    if (!validate()) return;

    try {

      const payload: any = {//se utiliza el any porque no detecta si es string o number
        idClient: Number(form.idClient),
        idAdmin: Number(form.idAdmin),
        idCatalog: Number(form.idCatalog),
        idCar: Number(form.idCar),
        paymentMethod: form.paymentMethod,
        basePrice: Number(form.basePrice),
        extras: Number(form.extras),
        salesTax: Number(form.salesTax),
        transferCost: Number(form.transferCost),
        totalPayment: Number(form.totalPayment),
        transactionDate: dateToday,
        invoiceNumber: 0,
        isActive: true
      };

      console.log("JSON enviado:", payload);

      if (salesToEdit) {
        await updateSales({ ...salesToEdit, ...payload });
        AlertSuccess("Venta actualizada correctamente");
      } else {
        await create(payload);
        AlertSuccess("Venta creada correctamente");
      }

      onRefresh();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Error al guardar la venta");
    }
  };

  return (

    <div className="container d-flex justify-content-center">

      <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>

        <h3 className="mb-4">
          {salesToEdit ? "Editar Venta" : "Nueva Venta"}
        </h3>

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

        </div>

        <div className="mb-2">

          <FormField
            label="ID Administrador"
            name="idAdmin"
            value={form.idAdmin?.toString() ?? ""}
            onChange={handleChange}
            type="number"
          />

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
              <option key={c.idCatalog} value={c.idCatalog}>
                {c.brandName} {c.carName} {c.yearManufacture}
              </option>
            ))}

          </select>

        </div>

        <div className="mb-2">

          <label className="form-label">Tracción</label>

          <select
            className={`form-select ${errors.idCar ? "is-invalid" : ""}`}
            name="idCar"
            value={form.idCar ?? ""}
            onChange={handleChange}
            disabled={!form.idCatalog}
          >

            <option value="">Seleccione una tracción</option>

            {filteredUnit.map(u => (
              <option key={u.idCar} value={u.idCar}>
                {u.traction}
              </option>
            ))}

          </select>

        </div>

        <div className="mb-2">
          <FormField label="Precio Base"
            name="basePrice"
            value={form.basePrice?.toString() ?? ""}
            onChange={handleChange}
            type="number" disabled />
        </div>

        <div className="mb-2">
          <FormField label="Extras"
            name="extras"
            value={form.extras?.toString() ?? ""}
            onChange={handleChange}
            type="number" disabled />
        </div>

        <div className="mb-2">
          <FormField label="IVA"
            name="salesTax"
            value={form.salesTax?.toString() ?? ""}
            onChange={handleChange}
            type="number" disabled />
        </div>

        <div className="mb-2">
          <FormField label="Traspaso"
            name="transferCost"
            value={form.transferCost?.toString() ?? ""}
            onChange={handleChange}
            type="number" disabled />
        </div>

        <div className="mb-2">
          <FormField label="Total"
            name="totalPayment"
            value={form.totalPayment?.toString() ?? ""}
            onChange={handleChange}
            type="number" disabled />
        </div>

        <div className="mt-3">

          <Button label="Guardar"
            onClick={handleSubmit}
            backgroundColor="#198754"
            hoverColor="#145c32" color="#fff"
            className="btn btn-success me-2" />

          <Button label="Cancelar"
            onClick={onClose}
            backgroundColor="#6c757d"
            hoverColor="#495057"
            color="#fff"
            className="btn btn-secondary" />

        </div>

      </div>

    </div>
  );
};

export default SalesForm;