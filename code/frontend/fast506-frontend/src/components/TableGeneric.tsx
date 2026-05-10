interface TableGenericProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  onDelete?: (item: T) => void;
  onEdit?: (item: T) => void;
}

const TableGeneric = <T extends object>({
  data,
  columns,
  onDelete,
  onEdit,
}: TableGenericProps<T>) => {
  return (
    <div style={{ padding: "1rem" }}>
      <table className="table table-hover" style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#EEF1EF" }}>
        <thead>
          <tr style={{ backgroundColor: "#A9B4C2" }}>
            {columns.map((col) => (
              <th key={String(col.key)} style={{ backgroundColor: "#A9B4C2" }}>{col.label}</th>
            ))}
            <th style={{ backgroundColor: "#A9B4C2" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
                No hay datos
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {typeof item[col.key] === "boolean"
                      ? item[col.key] ? "Sí" : "No"
                      : String(item[col.key])}
                  </td>
                ))}
                <td>
                  <button className="btn btn-outline-warning"
                    onClick={() => onEdit?.(item)}
                    style={{ marginRight: "0.5rem" }}>
                    <i className="bi bi-pencil-square"></i> Editar
                  </button>
                  <button className="btn btn-outline-danger"
                    onClick={() => onDelete?.(item)}
                  >
                    <i className="bi bi-trash3"></i> Eliminar
                  </button>
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