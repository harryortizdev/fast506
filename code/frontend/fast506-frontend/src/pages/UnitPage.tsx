import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import UnitForm from "../components/UnitForm";
import TableGeneric from "../components/TableGeneric";
import { getAll, deleteUnit } from "../services/UnitService";
import { Unit } from "../models/Unit";

const UnitPage = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [unitToEdit, setUnitToEdit] = useState<Unit | undefined>(undefined);

  const loadUnits = async () => {
    const data = await getAll();
    setUnits(data);
  };

  useEffect(() => {
    loadUnits();
  }, []);

  const handleSaveAndClose = async () => {
    await loadUnits();
    setUnitToEdit(undefined);
    setShowForm(false);
  };

  const handleClose = () => {
    setUnitToEdit(undefined);
    setShowForm(false);
  };

  const handleEdit = (unit: Unit) => {
    setUnitToEdit(unit);
    setShowForm(true);
  };

  const handleDelete = async (unit: Unit) => {
    if (!unit.idCar) return;
    const confirmar = window.confirm(`¿Desea eliminar el vehiculo ${unit.VIN}?`);
    if (!confirmar) return;
    await deleteUnit(unit.idCar!);
    await loadUnits();
  };

  const columns: { key: keyof Unit; label: string }[] = [
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
      {!showForm ? (
        <>
          <ButtonNew label="Nueva Unidad" onClick={() => setShowForm(true)} />
          <TableGeneric
            data={units}
            columns={columns}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      ) : (
        <UnitForm
          onClose={handleClose}
          onRefresh={handleSaveAndClose}
          unitToEdit={unitToEdit}
        />
      )}
    </div>
  );
};

export default UnitPage;