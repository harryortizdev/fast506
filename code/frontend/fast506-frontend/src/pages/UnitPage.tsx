import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import UnitForm from "../components/UnitForm";
import TableGeneric from "../components/TableGeneric";
import { getAll, deleteUnit } from "../services/UnitService";
import { Unit } from "../models/Unit";

const UnitPage = () => {
  const [units, setUnits] = useState<Unit[]>([]); //crea un estado que empieza como lista vacia
  const [showForm, setShowForm] = useState(false);//se crea un estado   que controla la vista del formulario o tabla

  useEffect(() => {
    loadUnits(); //ejecuta llenar la tabla con los datos nuevos
  }, []);//no se vuelve a ejecutar a menos que se desmonte y se vuelva a montar

  const loadUnits = async () => {
    const data = await getAll(); //llama al servicio getAll
    setUnits(data); //setea en la tabla los datos actualizados
  };

  const handleSaveAndClose = async () => {//esto es una funcioón que carga y despues cierra
    await loadUnits();      //cargar los datos antes de cerrar el form
    setShowForm(false);     //cerrar el form
  };

  const handleDelete = async (unit: Unit) => {//funcion que elimina y carga y recibe unidad como parametro
    if (!unit.idCar) return; //evita que la unidar no tenga id

    const confirmar = window.confirm(`¿Desea eliminar el vehiculo ${unit.idCar}?`); //muestra una confirmación
    if(!confirmar) return;//si se presiona cancelar, la función para y no elimina nada

    await deleteUnit(unit.idCar);//llama al servicio 
    await loadUnits();//recarga la lista
  }

  const columns: { key: keyof Unit; label: string }[] = [ //define lo que va en la tabla generica  
    { key: "idCar", label: "ID" },
    { key: "VIN", label: "VIN" },
    { key: "carBrand", label: "Marca" },
    { key: "carName", label: "Nombre" },
    { key: "yearManufacture", label: "Año" },
    { key: "color", label: "Color" },
    { key: "fuelType", label: "Combustible" },
    { key: "stockStatus", label: "En Stock" },
  ];

  return (
    <div>
      {!showForm ? ( //si showForm es falso muestra la tabla y el boton
        <>
          <ButtonNew label="Nueva Unidad" onClick={() => setShowForm(true)} />
          <TableGeneric data={units} columns={columns} onDelete={handleDelete} />
        </>
      ) : (
        <UnitForm
          onClose={() => setShowForm(false)}
          onRefresh={handleSaveAndClose} />
      )}
    </div>
  );
};

export default UnitPage;