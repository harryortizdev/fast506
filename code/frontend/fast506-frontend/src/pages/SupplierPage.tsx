
import { useEffect, useState } from "react";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import ButtonNew from "../components/ButtonNew";
import SupplierForm from "../components/organisms/SupplierForm";
import TableGeneric from "../components/organisms/TableGeneric";
import { getAll, deleteSupplier } from "../services/SupplierService";
import { Supplier } from "../models/Supplier";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import ButtonIcon from "../components/molecules/ButtonIcon";

type SupplierTableRow = Supplier & { rowNumber: number };

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [supplierToEdit, setSupplierToEdit] = useState<Supplier | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);

const loadSuppliers = async () => {
  try {
    const data = await getAll();
    console.log("SupplierPage data:", data);

    setSuppliers(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Error cargando suppliers:", error);
    setSuppliers([]);
  }
};

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleSaveAndClose = async () => {
    await loadSuppliers();
    setRefreshKey((prev) => prev + 1);
    setSupplierToEdit(undefined);
    setShowForm(false);
  };

  const handleClose = () => {
    setSupplierToEdit(undefined);
    setShowForm(false);
  };

  const handleEdit = async (supplier: Supplier) => {
    const confirmar = await AlertConfirm(
      `¿Desea editar el proveedor ${supplier.name || supplier.companyName || supplier.idSupplier}?`
    );

    if (!confirmar) return;

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
    setRefreshKey((prev) => prev + 1);
  };

  const activeSuppliers = suppliers.filter((supplier) => supplier.isActive !== false);

  const supplierTableData: SupplierTableRow[] = activeSuppliers.map((supplier, index) => ({
    ...supplier,
    rowNumber: index + 1,
  }));

  useEffect(() => {
    if (showForm || supplierTableData.length === 0) return;

    const tableElement = document.querySelector("#supplierTable table");
    if (!tableElement) return;

    const hasRows = (tableElement as HTMLTableElement).querySelector("tbody tr") !== null;
    if (!hasRows) return;

    const table = new DataTable(tableElement as Element, {
      destroy: true,
      language: {
        search: "Buscar:",
        searchPlaceholder: "Escribe aquí...",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        infoEmpty: "No hay registros",
        zeroRecords: "No se encontraron resultados",
      },
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50],
    });

    return () => {
      table.destroy();
    };
  }, [showForm, supplierTableData.length, refreshKey]);

  const columns: { key: keyof SupplierTableRow; label: string }[] = [
    { key: "rowNumber", label: "#" },
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
                <div id="supplierTable" key={refreshKey}>
                  <TableGeneric
                    data={supplierTableData}
                    columns={columns}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
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