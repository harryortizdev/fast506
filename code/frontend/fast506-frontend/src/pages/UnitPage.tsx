import { useEffect, useState } from "react";
import UnitForm from "../components/organisms/UnitForm";
import TableGeneric from "../components/organisms/TableGeneric";
import { getAll, deleteUnit } from "../services/UnitService";
import { Unit } from "../models/Unit";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import ButtonIcon from "../components/molecules/ButtonIcon";
import { Supplier } from "../models/Supplier";
import { getAll as getAllSuppliers } from "../services/SupplierService";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

type UnitTable = Unit & {
  supplierName: string;           // Para el nombre del proveedor
};

const UnitPage = () => {
  const [units, setUnits] = useState<Unit[]>([]);//guardo la lista
  const [showForm, setShowForm] = useState(false);//controlo el formulario
  const [unitToEdit, setUnitToEdit] = useState<Unit | undefined>(undefined);//guarda la unidad que desea editar

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);//trae los proveedores

  const loadUnits = async () => { 
    const data = await getAll();//pide al backend la lista
    console.log(data);
    setUnits(data);//las guarda
  };

  const loadDetails = async () => {
      try {
        const suppliersData = await getAllSuppliers();
        setSuppliers(Array.isArray(suppliersData) ? suppliersData : []);
      }catch (error) {
      console.error("Error cargando datos ", error);
      }
  };
  

  useEffect(() => {//cuando la pagina carga por primera vez
    loadUnits();//carga la lista
    loadDetails();//carga los proveedores
  }, []);//solo se ejecuta una vez

// este es un useEffect para el datatables
useEffect(() => {
        let table: any;

        if (units.length > 0) {
            table = new DataTable('#myTable', {
                language: {
                    search: "Buscar:",
                    searchPlaceholder: "Escribe aquí...",
                    lengthMenu: "Mostrar _MENU_ registros",
                    info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                    infoEmpty: "No hay registros",
                    zeroRecords: "No se encontraron resultados",
        
                }
            });
        }
        return () => {
            if (table) {
                table.destroy();
            }
        };
    }, [units]);

  const handleSaveAndClose = async () => {
    await loadUnits();//recargo la lista actualizada
    await loadDetails();//recarga la lista actualizada
    setUnitToEdit(undefined);//limpio la unidad que se estaba editando
    setShowForm(false);//limpio el formulario
  };

  const handleClose = () => {//cancelar editar formulario
    setUnitToEdit(undefined);//limpio la unidad que se estaba editando
    setShowForm(false);//cierro el formulario
  };

  const handleEdit = async (unit: Unit) => {//cuando presiono el boton editar
    const confirmar = await AlertConfirm(`¿Desea editar el vehículo ${unit.VIN}?`);//confirmación del usuario
    if (!confirmar) return;//si cancela no hago nada
    setUnitToEdit(unit);//guardo la unidad que quiero editar
    setShowForm(true);//abro el formulario
  };

  const handleDelete = async (unit: Unit) => {// cuando presiono el boton eliminar
    if (!unit.idCar) return;//  si no tiene id no haga nada
    const confirmar = await AlertConfirm(`¿Desea eliminar el vehículo ${unit.VIN}?`);//confirmación del usuario
    if (!confirmar) return;//si cancela no hago nada
    await deleteUnit(unit.idCar!);//envia la señal al backend de eliminar
    await loadUnits();//recargo la lista 
    await loadDetails();//recarga la lista
  };

   const getSupplierName = (idSupplier?: number) => {
    const s = suppliers.find((s) => Number(s.idSupplier) === Number(idSupplier));
    return s?.companyName|| `Proveedor #${idSupplier}`; // Si no lo encuentra, pone el ID por defecto
  };

  const transformedUnit: UnitTable[] = units.map((q) => ({
    ...q, // Copia la cotización original intacta (¡así no se rompe el Editar!)
    supplierName: getSupplierName(q.idSupplier),
  }));

  const columns: { key: keyof UnitTable; label: string }[] = [//defino las columnas a mostrar en la tabla
    { key: "index" as keyof UnitTable, label: "#" },
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
    { key: "supplierName", label: "Proovedor" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#EEF1EF", }}>

      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container-fluid container-md mt-3 mt-md-4 mb-4 px-2 px-md-4">
          <div className="card shadow-sm border-0">
            <div
              className="card-header d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-2"
              style={{ backgroundColor: "#2C3E50" }}
            >
              <h5 className="mb-0 text-center text-md-start" style={{ color: "#EEF1EF" }}>
                Gestión de Vehículos
              </h5>

              <div className="d-flex justify-content-center justify-content-md-end">
                <ButtonIcon
                  label="Nuevo"
                  onClick={() => setShowForm(true)}
                  icon={<i className="bi bi-plus-circle" />}
                  className="btn mb-3 w-100 w-sm-auto d-flex align-items-center justify-content-center gap-2"
                  backgroundColor="#5E6572"
                  hoverColor="#2C3E50"
                  color="#EEF1EF"
                  style={{
                    backgroundColor: "#5E6572",
                    color: "#EEF1EF",
                    border: "none"
                  }}
                />
              </div>
            </div>

            <div
              className="card-body p-2 p-md-4"
              style={{ backgroundColor: "#EEF1EF" }}
            >
              {!showForm ? (
                <TableGeneric
                  data={transformedUnit}
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