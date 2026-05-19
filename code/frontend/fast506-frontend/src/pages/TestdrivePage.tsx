import { useEffect, useState } from "react";
import { Testdrive } from "../models/Testdrive";
import AlertConfirm from "../components/atoms/AlertConfirm";
import AlertWarning from "../components/atoms/AlertWarning";
import ButtonIcon from "../components/molecules/ButtonIcon";
import BranchForm from "../components/organisms/BranchForm";
import Footer from "../components/organisms/Footer";
import Navbar from "../components/organisms/Navbar";
import TableGeneric from "../components/organisms/TableGeneric";
import { deleteTestdrive } from "../services/TestdriveService";
import { getAll } from "../services/UnitService";
import TestdriveForm from "../components/organisms/TestdriveForm";

const TestdrivePage = () => {
    const [testdrive, setTestDrive] = useState<Testdrive[]>([]); //guarda la lista de Testdrives
    const [showForm, setShowForm] = useState(false); //formulario off
    const [testdriveToEdit, setTestdriveToEdit] = useState<Testdrive | undefined>(undefined); //resguarda la sucursal a ediaatr


    const loadTestdrive = async () => {
        const data = await getAll();//pide lista testdrive
        setTestDrive(data);//las setea
    };

    useEffect(() => { //Carga la lista una sola vez al iniciar el programa
        loadTestdrive();
    }, []);


    const handleSaveAndClose = async () => {
        await loadTestdrive(); //lista de testdrives
        setTestdriveToEdit(undefined); //limpia el testdrive de editar
        setShowForm(false); //limpia formulario
    };

    const handleClose = () => { //cancelar 
        setTestdriveToEdit(undefined); //limpia los datos de testdrive
        setShowForm(false);//esconde el formulario
    };

    const handleEdit = (testdrive: Testdrive) => { //editar
        setTestdriveToEdit(testdrive);//pone los datos del testdrive en sus respectivas casillas
        setShowForm(true);//abre el formulario
    };

    const handleDelete = async (testdrive: Testdrive) => {//eliminar
        if (!testdrive.idTestdrive) return;// sin id no trabaja
        const confirmar = await AlertConfirm(`¿Desea eliminar el Testdrive ${testdrive.numberReference}?`); //alerta de confirmacion
        if (!confirmar) return;//si no selecciona confirmar cancela 
        await deleteTestdrive(testdrive.idTestdrive!); //señal de eliminar
        AlertWarning("Testdrive eliminada correctamente."); //alert de eliminado correctamente
        await loadTestdrive();//recargar la lista
    };


    const columns: { key: keyof Testdrive; label: string }[] = [ //columnas
        { key: "idTestdrive", label: "ID" },
        { key: "numberReference", label: "Num.Referencia" },
        { key: "creationDate", label: "Fecha de creación" },
        { key: "scheduledDate", label: "Fecha cita agendada" },
        { key: "initiationTime", label: "Hora de Inicio" },
        { key: "finalizationTime", label: "Fecha de finalización" },
        { key: "statusAppointment", label: "Estado" },
        { key: "idUser", label: "Usuario" },
        { key: "idCar", label: "Vehiculo" },
        { key: "idBranch", label: "Sucursal" },

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
                Gestión de Testdrive
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
                  data={testdrive}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ) : (
                <TestdriveForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
                  testdriveToEdit={testdriveToEdit}
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

export default TestdrivePage;