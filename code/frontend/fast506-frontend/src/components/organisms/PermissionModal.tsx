import { useEffect, useState } from "react";
import { Module, Permission } from "../../models/Permission";
import {
  getModules,
  getPermissionsByRole,
  savePermissions,
} from "../../services/PermissionService";
import { Role } from "../../models/Role";
import AlertSuccess from "../atoms/AlertSuccess";
import AlertWarning from "../atoms/AlertWarning";
import ButtonIcon from "../molecules/ButtonIcon";

interface PermissionModalProps {
  role: Role;
  onClose: () => void;
}

type PermissionsMap = Record<
  string,
  { createPermission: boolean; readPermission: boolean; updatePermission: boolean; deletePermission: boolean }
>;

const PermissionModal = ({ role, onClose }: PermissionModalProps) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [permissionsMap, setPermissionsMap] = useState<PermissionsMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [mods, perms] = await Promise.all([
          getModules(),
          getPermissionsByRole(role.idRole),
        ]);
        setModules(mods);

        const map: PermissionsMap = {};
        mods.forEach((m) => {
          map[m.id] = {
            createPermission: false,
            readPermission: false,
            updatePermission: false,
            deletePermission: false,
          };
        });
        perms.forEach((p) => {
          if (map[p.idModule] !== undefined) {
            map[p.idModule] = {
              createPermission: p.createPermission,
              readPermission: p.readPermission,
              updatePermission: p.updatePermission,
              deletePermission: p.deletePermission,
            };
          }
        });
        setPermissionsMap(map);
      } catch {
        AlertWarning("Error al cargar permisos.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [role.idRole]);

  const handleToggle = (
    moduleId: string,
    field: keyof PermissionsMap[string],
  ) => {
    setPermissionsMap((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [field]: !prev[moduleId][field],
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const permissions: Permission[] = modules.map((m) => ({
        idModule: m.id,
        createPermission: permissionsMap[m.id]?.createPermission ?? false,
        readPermission: permissionsMap[m.id]?.readPermission ?? false,
        updatePermission: permissionsMap[m.id]?.updatePermission ?? false,
        deletePermission: permissionsMap[m.id]?.deletePermission ?? false,
      }));
      await savePermissions(role.idRole, permissions);
      AlertSuccess("Permisos guardados exitosamente.");
      onClose();
    } catch {
      AlertWarning("Error al guardar los permisos.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#EEF1EF",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "700px",
          margin: "1rem",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        }}
      >
        <div
          className="d-flex justify-content-between align-items-center px-4 py-3"
          style={{
            backgroundColor: "#2C3E50",
            color: "#EEF1EF",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <h5 className="mb-0">
            Permisos: <span style={{ color: "#A9B4C2" }}>{role.name}</span>
          </h5>
          <button
            className="btn btn-sm"
            onClick={onClose}
            style={{ color: "#EEF1EF", fontSize: "1.2rem", lineHeight: 1 }}
          >
            &times;
          </button>
        </div>

        <div className="px-4 py-3" style={{ overflowY: "auto", flex: 1 }}>
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border" style={{ color: "#2C3E50" }} />
            </div>
          ) : (
            <div className="table-responsive">
              <table
                className="table table-hover align-middle"
                style={{ backgroundColor: "#EEF1EF" }}
              >
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "#A9B4C2", minWidth: "160px" }}>
                      Módulo
                    </th>
                    <th
                      className="text-center"
                      style={{ backgroundColor: "#A9B4C2" }}
                    >
                      C
                    </th>
                    <th
                      className="text-center"
                      style={{ backgroundColor: "#A9B4C2" }}
                    >
                      R
                    </th>
                    <th
                      className="text-center"
                      style={{ backgroundColor: "#A9B4C2" }}
                    >
                      U
                    </th>
                    <th
                      className="text-center"
                      style={{ backgroundColor: "#A9B4C2" }}
                    >
                      D
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((module) => {
                    const perm = permissionsMap[module.id];
                    return (
                      <tr key={module.id}>
                        <td>{module.name}</td>
                        {(
                          [
                            "createPermission",
                            "readPermission",
                            "updatePermission",
                            "deletePermission",
                          ] as const
                        ).map((field) => (
                          <td key={field} className="text-center">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={perm?.[field] ?? false}
                              onChange={() => handleToggle(module.id, field)}
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div
          className="d-flex justify-content-end gap-2 px-4 py-3"
          style={{
            borderTop: "1px solid #A9B4C2",
            borderRadius: "0 0 8px 8px",
          }}
        >
          <ButtonIcon
            label="Guardar"
            onClick={handleSave}
            icon={<i className="bi bi-floppy" />}
            className="btn btn-success d-flex align-items-center gap-2"
            backgroundColor="#198754"
            hoverColor="#145c32"
            color="#fff"
            style={{ opacity: saving ? 0.7 : 1, pointerEvents: saving ? "none" : "auto" }}
          />
          <ButtonIcon
            label="Cancelar"
            onClick={onClose}
            icon={<i className="bi bi-x-circle" />}
            className="btn btn-secondary d-flex align-items-center gap-2"
            backgroundColor="#6c757d"
            hoverColor="#495057"
            color="#fff"
          />
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;
