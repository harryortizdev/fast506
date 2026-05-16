import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import BranchForm from "../components/organisms/BranchForm";
import TableGeneric from "../components/organisms/TableGeneric";
import { getAll, deleteBranch } from "../services/BranchService";
import { Branch } from "../models/Branch";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import AlertWarning from "../components/atoms/AlertWarning";
import ButtonIcon from "../components/molecules/ButtonIcon";




const BranchPage = () => {
  const [branch, setBranch] = useState<Branch[]>([]); //guarda la lista de Sucursales
  const [showForm, setShowForm] = useState(false); //formulario off
  const [branchToEdit, setBranchToEdit] = useState<Branch | undefined>(undefined); //resguarda la sucursal a ediaatr


  const loadBranch = async () => {
    const data = await getAll();//pide lista Sucursales
    setBranch(data);//las setea
  };

  useEffect(() => { //Carga la lista una sola vez al iniciar el programa
    loadBranch();
  }, []);

  const handleSaveAndClose = async () => {
    await loadBranch(); //lista de sucursales
    setBranchToEdit(undefined); //limpia la unidad de editar
    setShowForm(false); //limpia formulario
  };

  const handleClose = () => { //cancelar 
    setBranchToEdit(undefined); //limpia los datos de sucursal
    setShowForm(false);//esconde el formulario
  };

  const handleEdit = (branch: Branch) => { //editar
    setBranchToEdit(branch);//pone los datos de la sucursal en sus respectivas casillas
    setShowForm(true);//abre el formulario
  };

  const handleDelete = async (branch: Branch) => {//eliminar
    if (!branch.idBranch) return;// sin id no trabaja
    const confirmar = await AlertConfirm(`¿Desea eliminar la sucursal ${branch.name}?`); //alerta de confirmacion
    if (!confirmar) return;//si no selecciona confirmar cancela 
    await deleteBranch(branch.idBranch!); //señal de eliminar
    AlertWarning("Sucursal eliminada correctamente."); //alert de eliminado correctamente
    await loadBranch();//recargar la lista
  };

  const columns: { key: keyof Branch; label: string }[] = [ //columnas
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