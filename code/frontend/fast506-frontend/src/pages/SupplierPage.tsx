import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import SupplierForm from "../components/SupplierForm";
import TableGeneric from "../components/TableGeneric";
import { getAll, deleteSupplier } from "../services/SupplierService";
import { Supplier } from "../models/Supplier";

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [supplierToEdit, setSupplierToEdit] = useState<Supplier | undefined>(undefined);

  const loadSuppliers = async () => {
    const data = await getAll();
    setSuppliers(data);
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleSaveAndClose = async () => {
    await loadSuppliers();
    setSupplierToEdit(undefined);
    setShowForm(false);
  };

  const handleClose = () => {
    setSupplierToEdit(undefined);
    setShowForm(false);
  };

  const handleEdit = (supplier: Supplier) => {
    setSupplierToEdit(supplier);
    setShowForm(true);
  };

  const handleDelete = async (supplier: Supplier) => {
    if (!supplier.idSupplier) return;
    const confirmar = window.confirm(`¿Desea eliminar el proveedor ${supplier.name}?`);
    if (!confirmar) return;
    await deleteSupplier(supplier.idSupplier!);
    await loadSuppliers();
  };

  const columns: { key: keyof Supplier; label: string }[] = [
    { key: "idSupplier", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "companyName", label: "Compañía" },
    { key: "legalName", label: "Nombre Legal" },
    { key: "supportPhone", label: "Teléfono" },
    { key: "bussinesContactName", label: "Contacto" },
    { key: "email", label: "Correo" },
    { key: "ubicacion", label: "Ubicación" },
  ];

  return (
    <div>
      {!showForm ? (
        <>
          <ButtonNew label="Nuevo Proveedor" onClick={() => setShowForm(true)} />
          <TableGeneric
            data={suppliers}
            columns={columns}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      ) : (
        <SupplierForm
          onClose={handleClose}
          onRefresh={handleSaveAndClose}
          supplierToEdit={supplierToEdit}
        />
      )}
    </div>
  );
};

export default SupplierPage;