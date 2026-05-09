import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import BranchForm from "../components/BranchForm";
import TableGeneric from "../components/TableGeneric";
import { getAll, deleteBranch } from "../services/BranchService";
import { Branch } from "../models/Branch";




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
    const confirmar = window.confirm(`¿Desea eliminar la Sucursal ${branch.name}?`);
    if (!confirmar) return;
    await deleteBranch(branch.idBranch!);
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
    <div>
      {!showForm ? (
        <>
          <ButtonNew label="Nueva Sucursal" onClick={() => setShowForm(true)} />
          <TableGeneric
            data={branch}
            columns={columns}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      ) : (
        <BranchForm
          onClose={handleClose}
          onRefresh={handleSaveAndClose}
          branchToEdit={branchToEdit}
        />
      )}
    </div>
  );
};

export default BranchPage;