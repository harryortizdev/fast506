import { useState, useEffect } from "react";
import { Unit } from "../models/Unit";
import { Supplier } from "../models/Supplier";
import { create, updateUnit } from "../services/UnitService";
import { getAll } from "../services/SupplierService";
import AlertSuccess from "./AlertSuccess";
import AlertWarning from "./AlertWarning";

interface UnitFormProps { //define que props recibe el componente
  onClose: () => void;//vienen del padre del unitPage, cierra el form
  onRefresh: () => void;//vienen del padre del unitPage, refresca la tabla
  unitToEdit?: Unit; //define el prop, que puede no venir
  units: Unit[];//define el prop, obligatoria
}

const UnitForm = ({ onClose, onRefresh, unitToEdit, units }: UnitFormProps) => {
  const currentYear = new Date().getFullYear();//agarra el año actual
  const [form, setForm] = useState<Partial<Unit>>( //form guarda los datos del formulario en unit
    unitToEdit || { yearManufacture: currentYear } //si viene unitToEdit precarga los datos de unit
  );
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);//guarda la lista de proveedores
  const [errors, setErrors] = useState<Partial<Record<keyof Unit, string>>>({});//guardar los errores para mostrarlos

  useEffect(() => {
    getAll().then(setSuppliers);//cuando carga llama al API de supplier y guarda el resultado
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {//cada vez que se selecciona algo,
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "idSupplier" ? Number(value) : value //actualiza el campo que cambió y convierte idSupplier a número
    });
  };

  const validate = (): boolean => {//revisa cada campo antes de guardar, si algo falla devuelve un alert con un mensaje
    const newErrors: Partial<Record<keyof Unit, string>> = {};
    const vinRegex = /^[A-HJ-NPR-Za-hj-npr-z0-9]{17}$/;//17 caracteres alfanuméricos excepto I,O,Q
    const engineRegex = /^[A-Za-z0-9\-]{1,17}$/;//alfanumérico con guiones, entre 1 y 17 caracteres
    const lettersOnly = /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]+$/;//solo letras mayúsculas y minúsculas con tildes

    if (!unitToEdit) {//solo valida VIN si es creación
      if (!form.VIN || !vinRegex.test(form.VIN)) {//que no esté vacío y cumpla con vinRegex
        newErrors.VIN = "VIN inválido: debe tener 17 caracteres alfanuméricos sin las letras I, O o Q.";
      }
    }
    if (!form.engineNumber || !engineRegex.test(form.engineNumber)) {//que no esté vacío y cumpla con engineRegex
      newErrors.engineNumber = "Número de motor inválido: máximo 17 caracteres.";
    }
    if (!form.carBrand || !lettersOnly.test(form.carBrand) || form.carBrand.length > 100) {//que no esté vacío, sea menor de 100 caracteres y cumpla lettersOnly
      newErrors.carBrand = "Marca inválida: solo letras y espacios, máximo 100 caracteres.";
    }
    if (!form.carName || !lettersOnly.test(form.carName) || form.carName.length > 100) {//que no esté vacío, sea menor de 100 caracteres y cumpla lettersOnly
      newErrors.carName = "Nombre inválido: solo letras y espacios, máximo 100 caracteres.";
    }
    if (!form.legalBrandName || form.legalBrandName.trim().length === 0 || form.legalBrandName.length > 100) {//que no esté vacío y sea menor de 100 caracteres
      newErrors.legalBrandName = "Nombre legal inválido: no puede estar vacío, máximo 100 caracteres.";
    }
    if (!form.color || !lettersOnly.test(form.color) || form.color.length > 50) {//que no esté vacío, sea menor de 50 caracteres y cumpla lettersOnly
      newErrors.color = "Color inválido: solo letras y espacios, máximo 50 caracteres.";
    }
    if (!form.bodyWork || form.bodyWork.length > 100) {//que no esté vacío, sea menor de 100 caracteres
      newErrors.bodyWork = "Carrocería inválida: no puede estar vacía, máximo 100 caracteres.";
    }
    if (!form.engineSize || form.engineSize.length > 20) {//que no esté vacío, sea menor de 20 caracteres
      newErrors.engineSize = "Cilindraje inválido: no puede estar vacío, máximo 20 caracteres.";
    }
    if (!form.transmission) {//que el select no esté vacío
      newErrors.transmission = "Debe seleccionar una transmisión.";
    }
    if (!form.traction) {//que el select no esté vacío
      newErrors.traction = "Debe seleccionar una tracción.";
    }
    if (!form.fuelType) {//que el select no esté vacío
      newErrors.fuelType = "Debe seleccionar un tipo de combustible.";
    }
    if (!form.idSupplier) {//que el select no esté vacío
      newErrors.idSupplier = "Debe seleccionar un proveedor.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {//al presionar el botón guardar
    if (!validate()) return;//valida que esté bien y completa la info
    if (!unitToEdit) {//solo entra si es creación no edición
      const vinExiste = units.some((u: Unit) => u.VIN === form.VIN);//recorre la lista y por cada vin compara con el que se va a registrar
      if (vinExiste) {//si encuentra alguna unidad igual
        AlertWarning("El VIN ya está registrado.");//ya existe
        return;//cancela guardar
      }
    }

    try {
      if (unitToEdit) {//si viene una unidad a editar modo edición
        await updateUnit(form as Unit);//espera que el API actualice
        AlertSuccess("Los cambios fueron guardados.");
      } else {
        const unitToSave = {//crea una nueva unidad con los datos del form
          ...form,
          stockStatus: true, //se setea stock status true
          yearManufacture: currentYear, //se setea el año actual
        };
        await create(unitToSave);//espera que el API cree la unidad
        AlertSuccess("Unidad creada correctamente.");//muestra el mensaje
      }
      onRefresh();//refresca la tabla
      onClose();//cierra el formulario
    } catch (error) {
      AlertWarning("Error al guardar");// si algo da error
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
        <h3>{unitToEdit ? "Editar Unidad" : "Nueva Unidad"}</h3>

        <div className="mb-2">
          <label>VIN</label>
          <input
            className={`form-control ${errors.VIN ? "is-invalid" : ""}`}
            name="VIN"
            placeholder="VIN"
            value={form.VIN || ""}
            onChange={handleChange}
            disabled={!!unitToEdit}
          />
          {errors.VIN && <div className="invalid-feedback">{errors.VIN}</div>}
        </div>

        <div className="mb-2">
          <label>No. Motor</label>
          <input
            className={`form-control ${errors.engineNumber ? "is-invalid" : ""}`}
            name="engineNumber"
            placeholder="No. Motor"
            value={form.engineNumber || ""}
            onChange={handleChange}
          />
          {errors.engineNumber && <div className="invalid-feedback">{errors.engineNumber}</div>}
        </div>

        <div className="mb-2">
          <label>Marca</label>
          <input
            className={`form-control ${errors.carBrand ? "is-invalid" : ""}`}
            name="carBrand"
            placeholder="Marca"
            value={form.carBrand || ""}
            onChange={handleChange}
          />
          {errors.carBrand && <div className="invalid-feedback">{errors.carBrand}</div>}
        </div>

        <div className="mb-2">
          <label>Nombre</label>
          <input
            className={`form-control ${errors.carName ? "is-invalid" : ""}`}
            name="carName"
            placeholder="Nombre"
            value={form.carName || ""}
            onChange={handleChange}
          />
          {errors.carName && <div className="invalid-feedback">{errors.carName}</div>}
        </div>

        <div className="mb-2">
          <label>Nombre Legal</label>
          <input
            className={`form-control ${errors.legalBrandName ? "is-invalid" : ""}`}
            name="legalBrandName"
            placeholder="Nombre Legal"
            value={form.legalBrandName || ""}
            onChange={handleChange}
          />
          {errors.legalBrandName && <div className="invalid-feedback">{errors.legalBrandName}</div>}
        </div>

        <div className="mb-2">
          <label>Color</label>
          <input
            className={`form-control ${errors.color ? "is-invalid" : ""}`}
            name="color"
            placeholder="Color"
            value={form.color || ""}
            onChange={handleChange}
          />
          {errors.color && <div className="invalid-feedback">{errors.color}</div>}
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
          <label>Carrocería</label>
          <input
            className={`form-control ${errors.bodyWork ? "is-invalid" : ""}`}
            name="bodyWork"
            placeholder="Carrocería"
            value={form.bodyWork || ""}
            onChange={handleChange}
          />
          {errors.bodyWork && <div className="invalid-feedback">{errors.bodyWork}</div>}
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
          <label>Cilindraje</label>
          <input
            className={`form-control ${errors.engineSize ? "is-invalid" : ""}`}
            name="engineSize"
            placeholder="Cilindraje"
            value={form.engineSize || ""}
            onChange={handleChange}
          />
          {errors.engineSize && <div className="invalid-feedback">{errors.engineSize}</div>}
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
              <option value="true">Disponible</option>
              <option value="false">No disponible</option>
            </select>
          </div>
        )}

        <div className="mt-3">
          <button className="btn btn-success me-2" onClick={handleSubmit}>Guardar</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default UnitForm;