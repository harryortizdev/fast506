import { useState } from "react";

interface TableGeneric<T> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
  }[];
}

const TableGeneric = <T extends object>({
  data,
  columns,
}: TableGeneric<T>) => {

  return (
    <div style={{ padding: "1rem" }}>
      <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
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
                    {String(item[col.key])}
                  </td>
                ))}
                <td>
                  <button onClick={() => {}}>Editar</button>
                  <button onClick={() => {}} style={{ marginLeft: "0.5rem", color: "red" }}>Eliminar</button>
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