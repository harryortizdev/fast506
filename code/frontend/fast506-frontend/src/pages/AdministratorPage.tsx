import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import AdministratorForm from "../components/AdministratorForm";
import TableGeneric from "../components/TableGeneric";
import { getAll, deleteAdministrator } from "../services/AdministratorService";
import { Administrator } from "../models/Administrator";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AlertConfirm from "../components/AlertConfirm";


const AdministratorPage = () => {

    const [administrators, setAdministrators] = useState<Administrator[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [administratorToEdit, setAdministratorToEdit] = useState<Administrator | undefined>(undefined);

    const loadAdministrators = async () => {

        const data = await getAll();
        console.log("Administrators data:", data);
        setAdministrators(Array.isArray(data) ? data : []);

    };

    useEffect(() => {

        loadAdministrators();

    }, []);

    const handleSaveAndClose = async () => {
        await loadAdministrators();
        setAdministratorToEdit(undefined);
        setShowForm(false);
    };

    const handleClose = () => {
        setAdministratorToEdit(undefined);
        setShowForm(false);
    };

    const handleEdit = (administrator: Administrator) => {
        setAdministratorToEdit(administrator);
        setShowForm(true);
    };

    const handleDelete = async (administrator: Administrator) => {
        if (!administrator.idUser) return;
        const confirmar = window.confirm(`¿Desea eliminar el administrador ${administrator.name}?`);
        if (!confirmar) return;
        await deleteAdministrator(administrator.idUser);
        await loadAdministrators();
    };

    const columns: { key: keyof Administrator; label: string }[] = [
        { key: "name", label: "Nombre" },
        { key: "email", label: "Email" },
        { key: "phoneNumber", label: "Telefono" },
        { key: "dateBirth", label: "Fecha de Nacimiento" },
        { key: "profileImage", label: "Imagen de Perfil" },
        { key: "employeeId", label: "ID de Empleado" },
        { key: "corporateEmail", label: "Email Corporativo" },
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
              <h5 className="mb-0 text-center text-md-start" style={{ color: "#EEF1EF" }}>
                Gestión de Administradores
              </h5>

              <div className="d-flex justify-content-center justify-content-md-end">
                <ButtonNew label="Nuevo" onClick={() => setShowForm(true)} />
              </div>
            </div>

            <div
              className="card-body p-2 p-md-4"
              style={{ backgroundColor: "#EEF1EF" }}
            >
              {!showForm ? (
                <TableGeneric
                  data={administrators}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ) : (
                <AdministratorForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
                  administratorToEdit={administratorToEdit}
                  administrators={administrators}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>

    );

}

export default AdministratorPage;