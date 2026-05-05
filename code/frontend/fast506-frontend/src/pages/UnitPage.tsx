import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import UnitForm from "../components/UnitForm";
import TableGeneric from "../components/TableGeneric";
import { getAll } from "../services/UnitService";
import { Unit } from "../models/Unit";

const UnitPage = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    getAll().then(setUnits).catch(console.error);
  }, []);

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
          <TableGeneric data={units} columns={columns} />
        </>
      ) : (
        <UnitForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default UnitPage;