import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import UnitForm from "../components/UnitForm";
import TableGeneric from "../components/TableGeneric";
import { getAll, deleteUnit } from "../services/UnitService";
import { Unit } from "../models/Unit";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AlertConfirm from "../components/AlertConfirm";

const UnitPage = () => {
  const [units, setUnits] = useState<Unit[]>([]);//guardo la lista
  const [showForm, setShowForm] = useState(false);//controlo el formulario
  const [unitToEdit, setUnitToEdit] = useState<Unit | undefined>(undefined);//guarda la unidad que desea editar

  const loadUnits = async () => {
    const data = await getAll();//pide al backend la lista
     console.log(data);
    setUnits(data);//las guarda
  };

  useEffect(() => {//cuando la pagina carga por primera vez
    loadUnits();//carga la lista
  }, []);//solo se ejecuta una vez

  const handleSaveAndClose = async () => {
    await loadUnits();//recargo la lista actualizada
    setUnitToEdit(undefined);//limpio la unidad que se estaba editando
    setShowForm(false);//limpio el formulario
  };

  const handleClose = () => {//cancelar editar formulario
    setUnitToEdit(undefined);//limpio la unidad que se estaba editando
    setShowForm(false);//cierro el formulario
  };

  const handleEdit = (unit: Unit) => {//cuando presiono el boton editar
    setUnitToEdit(unit);//guardo la unidad que quiero editar
    setShowForm(true);//abro el formulario
  };

  const handleDelete = async (unit: Unit) => {// cuando presiono el boton eliminar
    if (!unit.idCar) return;//  si no tiene id no haga nada
    const confirmar = await AlertConfirm(`¿Desea eliminar el vehículo ${unit.idCar}?`);//confirmación del usuario
    if (!confirmar) return;//si cancela no hago nada
    await deleteUnit(unit.idCar!);//envia la señal al backend de eliminar
    await loadUnits();//recargo la lista 
  };

  const columns: { key: keyof Unit; label: string }[] = [//defino las columnas a mostrar en la tabla
    { key: "idCar", label: "ID" },
    { key: "VIN", label: "VIN" },
    { key: "carBrand", label: "Marca" },
    { key: "carName", label: "Nombre" },
    { key: "yearManufacture", label: "Año" },
    { key: "color", label: "Color" },
    { key: "fuelType", label: "Combustible" },
    { key: "stockStatus", label: "En Stock" },
    { key: "engineNumber", label: "N° Motor" },
    { key: "legalBrandName", label: "Nombre legal" },
    { key: "transmission", label: "Tranmisión" },
    { key: "traction", label: "Tracción" },
    { key: "bodyWork", label: "Carrocería" },
    { key: "engineSize", label: "Cilindraje" },
    { key: "idSupplier", label: "Proovedor" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#EEF1EF" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container mt-4">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#2C3E50" }}>
              <h5 className="mb-0" style={{ color: "#EEF1EF" }}>Gestión de Vehículos</h5>
              <ButtonNew label="Nuevo" onClick={() => setShowForm(true)} />
            </div>
            <div className="card-body" style={{ backgroundColor: "#EEF1EF" }}>
              {!showForm ? (
                <TableGeneric
                  data={units}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ) : (
                <UnitForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
                  unitToEdit={unitToEdit}
                  units={units}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UnitPage;