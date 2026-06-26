import { useState, useEffect } from "react";
import { Unit } from "../../models/Unit";
import { Supplier } from "../../models/Supplier";
import { create, updateUnit } from "../../services/UnitService";
import { getAll } from "../../services/SupplierService";
import AlertSuccess from "../atoms/AlertSuccess";
import AlertWarning from "../atoms/AlertWarning";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";


interface UnitFormProps {
  onClose: () => void;
  onRefresh: () => void;
  unitToEdit?: Unit;
  units: Unit[];
}

const UnitForm = ({ onClose, onRefresh, unitToEdit, units }: UnitFormProps) => {
  const currentYear = new Date().getFullYear();
  const [form, setForm] = useState<Partial<Unit>>(
    unitToEdit || { yearManufacture: currentYear }
  );
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof Unit, string>>>({});
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    getAll().then(setSuppliers);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "idSupplier" ? Number(value) : value
    });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Unit, string>> = {};
    const vinRegex = /^[A-HJ-NPR-Za-hj-npr-z0-9]{17}$/;
    const engineRegex = /^[A-Za-z0-9\-]{1,17}$/;
    const lettersOnly = /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]+$/;

    if (!unitToEdit) {
      if (!form.VIN || !vinRegex.test(form.VIN)) {
        newErrors.VIN = "VIN inválido: debe tener 17 caracteres alfanuméricos sin las letras I, O o Q.";
      }
    }
    if (!form.engineNumber || !engineRegex.test(form.engineNumber)) {
      newErrors.engineNumber = "Número de motor inválido: máximo 17 caracteres.";
    }
    if (!form.carBrand || !lettersOnly.test(form.carBrand) || form.carBrand.length > 100) {
      newErrors.carBrand = "Marca inválida: solo letras y espacios, máximo 100 caracteres.";
    }
    if (!form.carName || !lettersOnly.test(form.carName) || form.carName.length > 100) {
      newErrors.carName = "Nombre inválido: solo letras y espacios, máximo 100 caracteres.";
    }
    if (!form.legalBrandName || form.legalBrandName.trim().length === 0 || form.legalBrandName.length > 100) {
      newErrors.legalBrandName = "Nombre legal inválido: no puede estar vacío, máximo 100 caracteres.";
    }
    if (!form.color || !lettersOnly.test(form.color) || form.color.length > 50) {
      newErrors.color = "Color inválido: solo letras y espacios, máximo 50 caracteres.";
    }
    if (!form.bodyWork || form.bodyWork.length > 100) {
      newErrors.bodyWork = "Carrocería inválida: no puede estar vacía, máximo 100 caracteres.";
    }
    if (!form.engineSize || form.engineSize.length > 20) {
      newErrors.engineSize = "Cilindraje inválido: no puede estar vacío, máximo 20 caracteres.";
    }
    if (!form.transmission) {
      newErrors.transmission = "Debe seleccionar una transmisión.";
    }
    if (!form.traction) {
      newErrors.traction = "Debe seleccionar una tracción.";
    }
    if (!form.fuelType) {
      newErrors.fuelType = "Debe seleccionar un tipo de combustible.";
    }
    if (!form.idSupplier) {
      newErrors.idSupplier = "Debe seleccionar un proveedor.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    if (!unitToEdit) {
      const vinExiste = units.some((u: Unit) => u.VIN === form.VIN);
      if (vinExiste) {
        AlertWarning("El VIN ya está registrado.");
        return;
      }
    }

    try {
      if (unitToEdit) {
        await updateUnit(form as Unit);
        AlertSuccess("Los cambios fueron guardados.");
      } else {
        const unitToSave = {
          ...form,
          stockStatus: true,
          yearManufacture: currentYear,
        };
        await create(unitToSave);
        AlertSuccess("Unidad creada correctamente.");
      }
      onRefresh();
      onClose();
    } catch (error) {
      AlertWarning("Error al guardar");
      setSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
        <h3>{unitToEdit ? "Editar Unidad" : "Nueva Unidad"}</h3>

        <div className="mb-2">
          <FormField
            label="VIN"
            name="VIN"
            placeholder="VIN"
            value={form.VIN || ""}
            onChange={handleChange}
            disabled={!!unitToEdit}
          />
          {errors.VIN && <div className="invalid-feedback d-block">{errors.VIN}</div>}
        </div>

        <div className="mb-2">
          <FormField
            label="No. Motor"
            name="engineNumber"
            placeholder="No. Motor"
            value={form.engineNumber || ""}
            onChange={handleChange}
          />
          {errors.engineNumber && <div className="invalid-feedback d-block">{errors.engineNumber}</div>}
        </div>

        <div className="mb-2">
          <FormField
            label="Marca"
            name="carBrand"
            placeholder="Marca"
            value={form.carBrand || ""}
            onChange={handleChange}
          />
          {errors.carBrand && <div className="invalid-feedback d-block">{errors.carBrand}</div>}
        </div>

        <div className="mb-2">
          <FormField
            label="Nombre"
            name="carName"
            placeholder="Nombre"
            value={form.carName || ""}
            onChange={handleChange}
          />
          {errors.carName && <div className="invalid-feedback d-block">{errors.carName}</div>}
        </div>

        <div className="mb-2">
          <FormField
            label="Nombre Legal"
            name="legalBrandName"
            placeholder="Nombre Legal"
            value={form.legalBrandName || ""}
            onChange={handleChange}
          />
          {errors.legalBrandName && <div className="invalid-feedback d-block">{errors.legalBrandName}</div>}
        </div>

        <div className="mb-2">
          <FormField
            label="Color"
            name="color"
            placeholder="Color"
            value={form.color || ""}
            onChange={handleChange}
          />
          {errors.color && <div className="invalid-feedback d-block">{errors.color}</div>}
        </div>

        <div className="mb-2">
          <label>Transmisión</label>
          <select
            className={`form-select ${errors.transmission ? "is-invalid" : ""}`}
            name="transmission"
            value={form.transmission || ""}
            onChange={handleChange}
          >
            <option value="">Seleccione transmisión</option>
            <option value="Manual">Manual</option>
            <option value="Automático">Automático</option>
            <option value="CVT">CVT</option>
            <option value="Semi-automático">Semi-automático</option>
            <option value="Doble embrague">Doble embrague (DCT)</option>
          </select>
          {errors.transmission && <div className="invalid-feedback">{errors.transmission}</div>}
        </div>

        <div className="mb-2">
          <label>Tracción</label>
          <select
            className={`form-select ${errors.traction ? "is-invalid" : ""}`}
            name="traction"
            value={form.traction || ""}
            onChange={handleChange}
          >
            <option value="">Seleccione tracción</option>
            <option value="FWD">FWD - Delantera</option>
            <option value="RWD">RWD - Trasera</option>
            <option value="AWD">AWD - Total permanente</option>
            <option value="4WD">4WD - Cuatro ruedas</option>
          </select>
          {errors.traction && <div className="invalid-feedback">{errors.traction}</div>}
        </div>

        <div className="mb-2">
          <FormField
            label="Carrocería"
            name="bodyWork"
            placeholder="Carrocería"
            value={form.bodyWork || ""}
            onChange={handleChange}
          />
          {errors.bodyWork && <div className="invalid-feedback d-block">{errors.bodyWork}</div>}
        </div>

        <div className="mb-2">
          <label>Combustible</label>
          <select
            className={`form-select ${errors.fuelType ? "is-invalid" : ""}`}
            name="fuelType"
            value={form.fuelType || ""}
            onChange={handleChange}
          >
            <option value="">Seleccione combustible</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diesel">Diesel</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Eléctrico">Eléctrico</option>
            <option value="Gas">Gas (GLP)</option>
            <option value="Híbrido enchufable">Híbrido enchufable (PHEV)</option>
          </select>
          {errors.fuelType && <div className="invalid-feedback">{errors.fuelType}</div>}
        </div>

        <div className="mb-2">
          <FormField
            label="Cilindraje"
            name="engineSize"
            placeholder="Cilindraje"
            value={form.engineSize || ""}
            onChange={handleChange}
          />
          {errors.engineSize && <div className="invalid-feedback d-block">{errors.engineSize}</div>}
        </div>

        <div className="mb-2">
          <label>Proveedor</label>
          <select
            className={`form-select ${errors.idSupplier ? "is-invalid" : ""}`}
            name="idSupplier"
            value={form.idSupplier ?? ""}
            onChange={handleChange}
          >
            <option value="">Seleccione un proveedor</option>
            {suppliers.map((s) => (
              <option key={s.idSupplier} value={s.idSupplier}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.idSupplier && <div className="invalid-feedback">{errors.idSupplier}</div>}
        </div>

        {unitToEdit && (
          <div className="mb-2">
            <label>En Stock</label>
            <select className="form-select" name="stockStatus"
              value={form.stockStatus ? "true" : "false"}
              onChange={(e) => setForm({ ...form, stockStatus: e.target.value === "true" })}>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
        )}

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

export default UnitForm;