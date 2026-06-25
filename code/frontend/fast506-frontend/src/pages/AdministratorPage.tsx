import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import AdministratorForm from "../components/organisms/AdministratorForm";
import TableGeneric from "../components/organisms/TableGeneric";
import { getAll, deleteAdministrator } from "../services/AdministratorService";
import { Administrator } from "../models/Administrator";
import { Role } from "../models/Role";
import * as RoleService from "../services/RoleService";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import ButtonIcon from "../components/molecules/ButtonIcon";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

type AdminTable = Administrator & {
  dateFormatted: string;
  roleName: string;
};
const AdministratorPage = () => {
  const [administrators, setAdministrators] = useState<Administrator[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [administratorToEdit, setAdministratorToEdit] = useState<
    Administrator | undefined
  >(undefined);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadAdministrators = async () => {
    const data = await getAll();
    console.log("Administrators data:", data);
    setAdministrators(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadAdministrators();
    RoleService.getAll().then(setRoles);
  }, []);

  const handleSaveAndClose = async () => {
    await loadAdministrators();
    setAdministratorToEdit(undefined);
    setShowForm(false);
    setRefreshKey((prev) => prev + 1);
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
    const confirmar = await AlertConfirm(
      `¿Desea eliminar el administrador ${administrator.name}?`,
    );
    if (!confirmar) return;
    await deleteAdministrator(administrator.idUser);
    await loadAdministrators();
    setRefreshKey((prev) => prev + 1);
  };

  const formatDate = (date?: any) => {
    if (!date) return "";

    let dateObject: Date;

    //    Si la fecha viene como un arreglo de número[2026, 6, 23]
    if (Array.isArray(date)) {
      const [year, month, day] = date;

      dateObject = new Date(year, month - 1, day);
    } else {
      dateObject = new Date(String(date).split("T")[0] + "T00:00:00");
    }

    // corrupto o algo que no se pudo parsear bien getTime() devolve NaN es así, devolvemos el string original
    if (isNaN(dateObject.getTime())) {
      return String(date);
    }

    const formatted = dateObject.toLocaleDateString("es-CR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const getRoleName = (idRole?: number) => {
    const role = roles.find((r) => Number(r.idRole) === Number(idRole));
    return role?.name || `Sin rol`;
  };

  const transformedAdmins: AdminTable[] = administrators.map((a) => ({
    ...a,
    dateFormatted: formatDate(a.dateBirth),
    roleName: getRoleName(a.role?.idRole),
  }));

  useEffect(() => {
    if (showForm || administrators.length === 0) return;

    const tableElement = document.querySelector("#AdministratorTable table");
    if (!tableElement) return;

    const hasRows =
      (tableElement as HTMLTableElement).querySelector("tbody tr") !== null;
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
  }, [showForm, administrators.length, refreshKey]);

  const columns: { key: keyof AdminTable; label: string }[] = [
    { key: "index" as keyof Administrator, label: "#" },
    { key: "name", label: "Nombre" },
    { key: "id", label: "Cédula" },
    { key: "email", label: "Correo Electrónico" },
    { key: "phoneNumber", label: "Número de Teléfono" },
    { key: "dateFormatted", label: "Fecha de Nacimiento" },
    { key: "profileImage", label: "Foto de Perfil" },
    { key: "employeeId", label: "ID de Empleado" },
    { key: "corporateEmail", label: "Correo Corporativo" },
    { key: "roleName", label: "Rol" },
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
                Gestión de Administradores
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
                    border: "none",
                  }}
                />
              </div>
            </div>

            <div
              className="card-body p-2 p-md-4"
              style={{ backgroundColor: "#EEF1EF" }}
            >
              {!showForm ? (
                <div id="AdministratorTable" key={refreshKey}>
                  <TableGeneric
                    data={transformedAdmins}
                    columns={columns}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
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
};

export default AdministratorPage;
