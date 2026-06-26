import React from "react";
import ButtonIcon from "../molecules/ButtonIcon";

interface ExtraAction<T> {
  label: string;
  icon: React.ReactNode;
  onClick: (item: T) => void;
  backgroundColor?: string;
  hoverColor?: string;
  color?: string;
  buttonClass?: string;
  disabled?: boolean | ((item: T) => boolean);
}

interface TableGenericProps<T> {
  data?: T[];
  columns: { key: keyof T; label: string }[];
  onDelete?: (item: T) => void;
  onEdit?: (item: T) => void;
  disabledActions?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  extraActions?: ExtraAction<T>[];
}

const stickyRight = (
  bg = "#EEF1EF"
): React.CSSProperties => ({
  position: "sticky",
  right: 0,
  backgroundColor: bg,
  whiteSpace: "nowrap",
  borderLeft: "2px solid #A9B4C2",
});

const TableGeneric = <T extends object>({
  data = [],
  columns,
  onDelete,
  onEdit,
  disabledActions = false,
  canEdit = true,
  canDelete = true,
  extraActions = [],
}: TableGenericProps<T>) => {
  const editDisabled = disabledActions || !canEdit;
  const deleteDisabled = disabledActions || !canDelete;

  return (

    <div
      className="table-responsive"
      style={{
        maxHeight: "400px",
        overflowY: "auto",
        overflowX: "auto",
        borderRadius: "10px",
      }}
    >

      <table
        id="myTable"
        className="table table-hover align-middle"
        style={{
          minWidth: "750px",
          backgroundColor: "#EEF1EF",
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
      >

        <thead
          style={{
            position: "sticky",
            top: 0,
            zIndex: 2
          }}
        >

          <tr>

            {columns.map((col) => (

              <th
                key={String(col.key)}
                style={{
                  backgroundColor: "#A9B4C2",
                  whiteSpace: "nowrap",
                  fontSize: "clamp(0.8rem, 1vw, 1rem)",
                }}
              >
                {col.label}
              </th>

            ))}

            <th
              style={{
                ...stickyRight("#A9B4C2"),
                zIndex: 3,
                width: "1%",
                fontSize: "clamp(0.8rem, 1vw, 1rem)",
              }}
            >
              Acciones
            </th>

          </tr>

        </thead>

        <tbody>

          {!Array.isArray(data) || data.length === 0 ? (

            <tr>

              <td
                colSpan={columns.length + 1}
                className="text-center"
              >
                No hay datos
              </td>

            </tr>

          ) : (

            data.map((item, index) => (

              <tr key={index}>

                {columns.map((col) => (

                  <td
                    key={String(col.key)}
                    style={{
                      whiteSpace: "nowrap",
                      fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                    }}
                  >
                    {col.key === "index"
                      ? index + 1 
                      : typeof item[col.key] === "boolean"
                        ? item[col.key]
                          ? "Sí"
                          : "No"
                        : String(item[col.key] ?? "")}
                  </td>

                ))}

                <td
                  style={{
                    ...stickyRight(),
                    width: "1%"
                  }}
                >

                  <div className="d-flex flex-column flex-sm-row gap-2">

                    {extraActions.map((action, i) => {
                      const isDisabled = typeof action.disabled === "function"
                        ? action.disabled(item)
                        : Boolean(action.disabled);

                      return (
                        <ButtonIcon
                          key={i}
                          label={action.label}
                          onClick={() => !isDisabled && action.onClick(item)}
                          icon={action.icon}
                          className={action.buttonClass ?? "btn btn-sm d-flex align-items-center justify-content-center gap-2"}
                          backgroundColor={action.backgroundColor ?? "transparent"}
                          hoverColor={action.hoverColor ?? "#2C3E50"}
                          color={action.color ?? "#EEF1EF"}
                          disabled={isDisabled}
                          style={isDisabled ? { opacity: 0.6, cursor: "not-allowed" } : undefined}
                        />
                      );
                    })}

                    {!editDisabled && (
                      <ButtonIcon
                        label="Editar"
                        onClick={() => onEdit?.(item)}
                        backgroundColor="transparent"
                        hoverColor="#ffc107"
                        color="#ffc107"
                        icon={<i className="bi bi-pencil-square" />}
                        className="btn btn-outline-warning btn-sm d-flex align-items-center justify-content-center gap-2"
                        style={{
                          backgroundColor: "transparent",
                          border: "1px solid #ffc107",
                        }}
                      />
                    )}

                    {!deleteDisabled && (
                      <ButtonIcon
                        label="Eliminar"
                        onClick={() => onDelete?.(item)}
                        backgroundColor="transparent"
                        hoverColor="#dc3545"
                        color="#dc3545"
                        icon={<i className="bi bi-trash3" />}
                        className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-2"
                        style={{
                          backgroundColor: "transparent",
                          border: "1px solid #dc3545",
                        }}
                      />
                    )}
                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default TableGeneric;