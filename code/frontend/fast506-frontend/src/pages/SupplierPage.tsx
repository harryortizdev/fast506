
import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import SupplierForm from "../components/organisms/SupplierForm";
import TableGeneric from "../components/organisms/TableGeneric";
import { getAll, deleteSupplier } from "../services/SupplierService";
import { Supplier } from "../models/Supplier";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import ButtonIcon from "../components/molecules/ButtonIcon";


const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [supplierToEdit, setSupplierToEdit] = useState<Supplier | undefined>(undefined);

  const loadSuppliers = async () => {
    const data = await getAll();
    const mapped = data.map((s: any) => ({ ...s, isActive: s.active }));
    setSuppliers(mapped);
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

    const confirmar = await AlertConfirm(
      `¿Desea eliminar el proveedor ${supplier.name}?`
    );

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#EEF1EF",
      }}
    >
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container-fluid container-md mt-3 mt-md-4 mb-4 px-2 px-md-4">
          <div className="card shadow-sm border-0">
            <div
              className="card-header d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-2"
              style={{ backgroundColor: "#2C3E50" }}
            >
              <h5
                className="mb-0 text-center text-md-start"
                style={{ color: "#EEF1EF" }}
              >
                Gestión de Proveedores
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
                  data={suppliers}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ) : (
                <SupplierForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
                  supplierToEdit={supplierToEdit}
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

export default SupplierPage;