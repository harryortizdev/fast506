import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import RoleForm from "../components/organisms/RoleForm";
import TableGeneric from "../components/organisms/TableGeneric";
import PermissionModal from "../components/organisms/PermissionModal";
import { getAll, deleteRole } from "../services/RoleService";
import { Role } from "../models/Role";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import ButtonIcon from "../components/molecules/ButtonIcon";

const RolePage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<Role | undefined>(undefined);
  const [roleForPermissions, setRoleForPermissions] = useState<Role | undefined>(undefined);

  const loadRoles = async () => {
    const data = await getAll();
    setRoles(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleSaveAndClose = async () => {
    await loadRoles();
    setRoleToEdit(undefined);
    setShowForm(false);
  };

  const handleClose = () => {
    setRoleToEdit(undefined);
    setShowForm(false);
  };

  const handleEdit = (role: Role) => {
    setRoleToEdit(role);
    setShowForm(true);
  };

  const handleDelete = async (role: Role) => {
    if (!role.idRole) return;
    const confirmar = await AlertConfirm(
      `¿Desea eliminar el rol ${role.name}?`,
    );
    if (!confirmar) return;
    await deleteRole(role.idRole);
    await loadRoles();
  };

  const columns: { key: keyof Role; label: string }[] = [
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
    { key: "createDate", label: "Fecha de Creación" },
    { key: "levelHierarchy", label: "Nivel de Jerarquía" },
    { key: "isWorker", label: "Es Trabajador" },
    { key: "haveEmail", label: "Tiene Email" },
    { key: "isActive", label: "Activo" },
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
      {roleForPermissions && (
        <PermissionModal
          role={roleForPermissions}
          onClose={() => setRoleForPermissions(undefined)}
        />
      )}
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
                Gestión de Roles
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
                <TableGeneric
                  data={roles}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  extraActions={[
                    {
                      label: "Permisos",
                      icon: <i className="bi bi-key" />,
                      onClick: (role) => setRoleForPermissions(role),
                      backgroundColor: "transparent",
                      hoverColor: "#0d6efd",
                      color: "#0d6efd",
                      buttonClass:
                        "btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center gap-2",
                    },
                  ]}
                />
              ) : (
                <RoleForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
                  roleToEdit={roleToEdit}
                  roles={roles}
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

export default RolePage;
