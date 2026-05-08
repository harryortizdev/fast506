import { useState, useEffect } from "react";
import { Unit } from "../models/Unit";
import { Supplier } from "../models/Supplier";
import { create, updateUnit } from "../services/UnitService";
import { getAll } from "../services/SupplierService";

interface UnitFormProps { //define que props recibe el componente
  onClose: () => void;//vienen del padre del unitPage, cierra el form
  onRefresh: () => void;//vienen del padre del unitPage, refresca la tabla
  unitToEdit?: Unit; //define el prop, que puede no venir
  units: Unit[];//define el prop, obligatoria
}

const UnitForm = ({ onClose, onRefresh, unitToEdit, units}: UnitFormProps) => {
  const currentYear = new Date().getFullYear();//agarra el año actual
  const [form, setForm] = useState<Partial<Unit>>( //form guarda los datos del formulario  en unit
    unitToEdit || { yearManufacture: currentYear } //si viene unitToEdit precarga los datos de unit
  );
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);//guarda las lista de proovedores

  useEffect(() => {
    getAll().then(setSuppliers);//cuando carga llama al API de supplier y guarda el resultado
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {//cada vez que se seleciona algo,
    setForm({ ...form, [e.target.name]: e.target.value });                              //actualiza el campo  que cambió
  };

  const validate = (): boolean => {//revisa cada campo antes de guardar si algo falla devuelve un alert con un mensaje
    const vinRegex = /^[A-HJ-NPR-Za-hj-npr-z0-9]{17}$/;//17 caracteres alfanumericos exceto I,O,Q
    const engineRegex = /^[A-Za-z0-9]{1,17}$/;//alfanumerico y textto entre 1 y 17 caracteres
    const lettersOnly = /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]+$/;//no permite tildes ni, simbolos, slo letras mayudculas y minusculas

    if (!form.VIN || !vinRegex.test(form.VIN)) {//que no este vacio y cumpa con vinRegex
      alert("VIN inválido: debe tener 17 caracteres alfanuméricos sin las letras I, O o Q.");
      return false;
    }
    if (!form.engineNumber || !engineRegex.test(form.engineNumber)) {//que no este vacio y ue cumpla con enginRegex
      alert("Número de motor inválido: solo letras y números, máximo 17 caracteres.");
      return false;
    }
    if (!form.carBrand || !lettersOnly.test(form.carBrand) || form.carBrand.length > 100) {//que no este vacio, sea manor de 100 caracteres y cumpla lettersOnly
      alert("Marca inválida: solo letras y espacios, máximo 100 caracteres.");
      return false;
    }
    if (!form.carName || !lettersOnly.test(form.carName) || form.carName.length > 100) {//que no este vacio, sea manor de 100 caracteres y cumpla lettersOnly
      alert("Nombre inválido: solo letras y espacios, máximo 100 caracteres.");
      return false;
    }
    if (!form.legalBrandName || !lettersOnly.test(form.legalBrandName) || form.legalBrandName.length > 100) {//que no este vacio, sea manor de 100 caracteres y cumpla lettersOnly
      alert("Nombre legal inválido: solo letras y espacios, máximo 100 caracteres.");
      return false;
    }
    if (!form.color || !lettersOnly.test(form.color) || form.color.length > 50) {//que no este vacio, sea manor de 50 caracteres y cumpla lettersOnly
      alert("Color inválido: solo letras y espacios, máximo 50 caracteres.");
      return false;
    }
    if (!form.bodyWork || form.bodyWork.length > 100) {//que no este vacio, sea manor de 100 caracteres 
      return false;
    }
    if (!form.engineSize || form.engineSize.length > 20) {//que no este vacio, sea manor de 20 caracteres 
      alert("Cilindraje inválido: no puede estar vacío, máximo 20 caracteres.");
      return false;
    }
    if (!form.transmission) {//que el select no este vacio
      alert("Debe seleccionar una transmisión.");
      return false;
    }
    if (!form.traction) {//que el select no este vacio
      alert("Debe seleccionar una tracción.");
      return false;
    }
    if (!form.fuelType) {//que el select no este vacio
      alert("Debe seleccionar un tipo de combustible.");
      return false;
    }
    if (!form.idSupplier) {//que el select no este vacio
      alert("Debe seleccionar un proveedor.");
      return false;
    }
    return true;//si todo se cumple true
  };

  const handleSubmit = async () => {//al presionar el boton guardar
    if (!validate()) return;//valida que este bien y completa la info
    if (!unitToEdit) {//solo entra si es creacion no edicion
      const vinExiste = units.some((u: Unit) => u.VIN === form.VIN);//recorre la lista y por cada vin compara con el que se va a registrar
      if (vinExiste) {//si encuentra alguna unidad igual
        alert("El VIN ya está registrado.");//ya existe
        return;//cancela guardar
      }
    }

    try {
      if (unitToEdit) {//si viene una unidad a editar modo edición
        await updateUnit(form as Unit);//espera que al API actualice
        alert("Unidad actualizada correctamente");///muestra mensaje
      } else {
        const unitToSave = {//crea una nueva unidad con los datos del form
          ...form,
          stockStatus: true, //se setea stock status true
          yearManufacture: currentYear, //se setea el año actual
        };
        await create(unitToSave);//espera que el API cree la unidad
        alert("Unidad creada correctamente");//muestra el mensaje
      }
      onRefresh();//refresca la tabla
      onClose();//cierra el formulario
    } catch (error) {
      alert("Error al guardar");// si algo da error
    }
  };

  return (
    <div className="card p-3 mb-3">
      <h3>{unitToEdit ? "Editar Unidad" : "Nueva Unidad"}</h3>

      <div className="mb-2">
        <label>VIN</label>
        <input className="form-control" name="VIN" placeholder="VIN"
          value={form.VIN || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>No. Motor</label>
        <input className="form-control" name="engineNumber" placeholder="No. Motor"
          value={form.engineNumber || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Marca</label>
        <input className="form-control" name="carBrand" placeholder="Marca"
          value={form.carBrand || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Nombre</label>
        <input className="form-control" name="carName" placeholder="Nombre"
          value={form.carName || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Nombre Legal</label>
        <input className="form-control" name="legalBrandName" placeholder="Nombre Legal"
          value={form.legalBrandName || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Color</label>
        <input className="form-control" name="color" placeholder="Color"
          value={form.color || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Transmisión</label>
        <select className="form-select" name="transmission"
          value={form.transmission || ""} onChange={handleChange}>
          <option value="">Seleccione transmisión</option>
          <option value="Manual">Manual</option>
          <option value="Automático">Automático</option>
          <option value="CVT">CVT</option>
          <option value="Semi-automático">Semi-automático</option>
          <option value="Doble embrague">Doble embrague (DCT)</option>
        </select>
      </div>

      <div className="mb-2">
        <label>Tracción</label>
        <select className="form-select" name="traction"
          value={form.traction || ""} onChange={handleChange}>
          <option value="">Seleccione tracción</option>
          <option value="FWD">FWD - Delantera</option>
          <option value="RWD">RWD - Trasera</option>
          <option value="AWD">AWD - Total permanente</option>
          <option value="4WD">4WD - Cuatro ruedas</option>
        </select>
      </div>

      <div className="mb-2">
        <label>Carrocería</label>
        <input className="form-control" name="bodyWork" placeholder="Carrocería"
          value={form.bodyWork || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Combustible</label>
        <select className="form-select" name="fuelType"
          value={form.fuelType || ""} onChange={handleChange}>
          <option value="">Seleccione combustible</option>
          <option value="Gasolina">Gasolina</option>
          <option value="Diesel">Diesel</option>
          <option value="Híbrido">Híbrido</option>
          <option value="Eléctrico">Eléctrico</option>
          <option value="Gas">Gas (GLP)</option>
          <option value="Híbrido enchufable">Híbrido enchufable (PHEV)</option>
        </select>
      </div>

      <div className="mb-2">
        <label>Cilindraje</label>
        <input className="form-control" name="engineSize" placeholder="Cilindraje"
          value={form.engineSize || ""} onChange={handleChange} />
      </div>

      <div className="mb-2">
        <label>Proveedor</label>
        <select className="form-select" name="idSupplier"
          value={form.idSupplier || ""} onChange={handleChange}>
          <option value="">Seleccione un proveedor</option>
          {suppliers.map((s) => (
            <option key={s.idSupplier} value={s.idSupplier}>
              {s.name}
            </option>
          ))}
        </select>
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
  );
};

export default UnitForm;