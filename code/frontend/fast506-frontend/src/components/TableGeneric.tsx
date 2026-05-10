interface TableGenericProps<T> {//define los tipos de props que recibe tablegeneric
  data: T[];
  columns: { key: keyof T; label: string }[];
  onDelete?: (item: T) => void;
  onEdit?: (item: T) => void;
}

const stickyRight = (bg = "#EEF1EF"): React.CSSProperties => ({//funcion de css
  position: "sticky",//la columna se queda fija
  right: 0, //la pega al lado derecho
  backgroundColor: bg,//le da color para tapar lo que queda detras
  whiteSpace: "nowrap", //evita que el texto se parta en varias lineas
  borderLeft: "2px solid #A9B4C2", //borde izquierdo para separar la columna
});

const TableGeneric = <T extends object>({ data, columns, onDelete, onEdit }: TableGenericProps<T>) => {
  return (
    <div style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}>
      <table className="table table-hover" style={{ minWidth: "900px", backgroundColor: "#EEF1EF", borderCollapse: "separate", borderSpacing: 0 }}>

        <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} style={{ backgroundColor: "#A9B4C2", whiteSpace: "nowrap" }}>
                {col.label}
              </th>
            ))}
            <th style={{ ...stickyRight("#A9B4C2"), zIndex: 3, width: "1%" }}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>No hay datos</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={String(col.key)} style={{ whiteSpace: "nowrap" }}>
                    {typeof item[col.key] === "boolean" ? (item[col.key] ? "Sí" : "No") : String(item[col.key])}
                  </td>
                ))}
                <td style={{ ...stickyRight(), width: "1%" }}>
                  <button className="btn btn-outline-warning me-2" onClick={() => onEdit?.(item)}>
                    <i className="bi bi-pencil-square"></i> Editar
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => onDelete?.(item)}>
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