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
      <table className="table table-striped-columns" border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
            <th>Acciones</th>
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
                  <button
                    onClick={() => onEdit?.(item)}
                    style={{ marginRight: "0.5rem" }}>
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete?.(item)}
                    style={{ color: "red" }}>
                    Eliminar
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