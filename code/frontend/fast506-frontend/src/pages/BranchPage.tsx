import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import BranchForm from "../components/BranchForm";
import TableGeneric from "../components/TableGeneric";
import { getAll, deleteBranch } from "../services/BranchService";
import { Branch } from "../models/Branch";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AlertConfirm from "../components/AlertConfirm";
import AlertWarning from "../components/AlertWarning";




const BranchPage = () => {
  const [branch, setBranch] = useState<Branch[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [branchToEdit, setBranchToEdit] = useState<Branch | undefined>(undefined);


  const loadBranch = async () => {
    const data = await getAll();
    setBranch(data);
  };

  useEffect(() => {
    loadBranch();
  }, []);

  const handleSaveAndClose = async () => {
    await loadBranch();
    setBranchToEdit(undefined);
    setShowForm(false);
  };

  const handleClose = () => {
    setBranchToEdit(undefined);
    setShowForm(false);
  };

  const handleEdit = (branch: Branch) => {
    setBranchToEdit(branch);
    setShowForm(true);
  };

  const handleDelete = async (branch: Branch) => {
    if (!branch.idBranch) return;
    const confirmar = await AlertConfirm(`¿Desea eliminar la sucursal ${branch.name}?`);
    if (!confirmar) return;
    await deleteBranch(branch.idBranch!);
    AlertWarning("Sucursal eliminada correctamente.");
    await loadBranch();
  };

  const columns: { key: keyof Branch; label: string }[] = [
    { key: "idBranch", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "ubication", label: "Ubicacion" },
    { key: "direction", label: "Direccion" },
    { key: "branchPhoneNumber", label: "Numero de telefono" },
    { key: "operationSchedule", label: "Horario" },
    { key: "idUser", label: "Creador" },

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
              <h5
                className="mb-0 text-center text-md-start"
                style={{ color: "#EEF1EF" }}
              >
                Gestión de Sucursales
              </h5>

              <div className="d-flex justify-content-center justify-content-md-end">
                <ButtonNew
                  label="Nuevo"
                  onClick={() => setShowForm(true)}
                />
              </div>
            </div>

            <div
              className="card-body p-2 p-md-4"
              style={{ backgroundColor: "#EEF1EF" }}
            >
              {!showForm ? (
                <TableGeneric
                  data={branch}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ) : (
                <BranchForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
                  branchToEdit={branchToEdit}
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

export default BranchPage;